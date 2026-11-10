class DigitalClock {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
  }

  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  }

  render(totalSeconds) {
    this.element.textContent = this.formatTime(totalSeconds);
  }
}