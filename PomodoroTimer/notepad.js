// Side-task notepad: a quick place to jot down distractions during a focus
// session so they can be handled later. Notes are saved in localStorage.
class Notepad {
  constructor(options) {
    this.storageKey = "focusflow-side-tasks";
    this.panel = document.getElementById(options.panelId);
    this.backdrop = document.getElementById(options.backdropId);
    this.toggleButton = document.getElementById(options.toggleButtonId);
    this.closeButton = document.getElementById(options.closeButtonId);
    this.form = document.getElementById(options.formId);
    this.input = document.getElementById(options.inputId);
    this.list = document.getElementById(options.listId);
    this.countBadge = document.getElementById(options.countId);
    this.clearDoneButton = document.getElementById(options.clearDoneButtonId);

    this.tasks = this.load();

    this.toggleButton.addEventListener("click", () => this.toggle());
    this.closeButton.addEventListener("click", () => this.close());
    this.backdrop.addEventListener("click", () => this.close());
    this.clearDoneButton.addEventListener("click", () => this.clearDone());

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.add(this.input.value);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    this.render();
  }

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey));
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (error) {
      // Storage may be unavailable (private mode); notes still work for this visit.
    }
  }

  isOpen() {
    return this.panel.classList.contains("open");
  }

  open() {
    this.panel.classList.add("open");
    this.backdrop.classList.add("open");
    this.panel.setAttribute("aria-hidden", "false");
    this.toggleButton.setAttribute("aria-expanded", "true");
    // Wait for the slide-in so the panel is visible and the input can take focus.
    setTimeout(() => this.input.focus(), 260);
  }

  close() {
    this.panel.classList.remove("open");
    this.backdrop.classList.remove("open");
    this.panel.setAttribute("aria-hidden", "true");
    this.toggleButton.setAttribute("aria-expanded", "false");
    this.toggleButton.focus();
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  add(text) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const nextId = this.tasks.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    this.tasks.push({ id: nextId, text: trimmed, done: false });
    this.input.value = "";
    this.save();
    this.render();
  }

  toggleDone(id) {
    const task = this.tasks.find((item) => item.id === id);

    if (task) {
      task.done = !task.done;
      this.save();
      this.render();
    }
  }

  remove(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.save();
    this.render();
  }

  clearDone() {
    this.tasks = this.tasks.filter((item) => !item.done);
    this.save();
    this.render();
  }

  render() {
    this.list.innerHTML = "";

    if (this.tasks.length === 0) {
      const empty = document.createElement("li");
      empty.className = "notepad-empty";
      empty.textContent = "Nothing here yet. Jot down side tasks as they come up so you can stay focused.";
      this.list.appendChild(empty);
    }

    this.tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = "notepad-item" + (task.done ? " done" : "");

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => this.toggleDone(task.id));

      const text = document.createElement("span");
      text.textContent = task.text;

      label.append(checkbox, text);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "notepad-delete";
      deleteButton.setAttribute("aria-label", "Delete note: " + task.text);
      deleteButton.textContent = "✕";
      deleteButton.addEventListener("click", () => this.remove(task.id));

      item.append(label, deleteButton);
      this.list.appendChild(item);
    });

    const openCount = this.tasks.filter((item) => !item.done).length;
    this.countBadge.textContent = openCount;
    this.countBadge.hidden = openCount === 0;
    this.clearDoneButton.hidden = !this.tasks.some((item) => item.done);
  }
}
