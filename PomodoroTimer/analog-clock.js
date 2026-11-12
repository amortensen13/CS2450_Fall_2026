class AnalogClock {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
  }

  render(remainingSeconds, totalSeconds, mode) {
    const context = this.context;
    const canvas = this.canvas;
    const center = canvas.width / 2;
    const radius = center - 42;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const colors = {
      focus: "#cdead3",
      shortBreak: "#d0defb",
      longBreak: "#22c55e"
    };

    const accentColor = colors[mode] || "#f69b7a";
    const progress = totalSeconds === 0 ? 0 : remainingSeconds / totalSeconds;

    // Outer shadow
    context.beginPath();
    context.arc(center, center, radius + 10, 0, Math.PI * 2);
    context.fillStyle = "rgba(0, 0, 0, 0.18)";
    context.fill();

    // Clock face
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.fillStyle = "#1f2937";
    context.fill();

    // Background ring
    context.beginPath();
    context.arc(center, center, radius - 18, 0, Math.PI * 2);
    context.strokeStyle = "#374151";
    context.lineWidth = 20;
    context.stroke();

    // Progress ring
    context.beginPath();
    context.arc(
      center,
      center,
      radius - 18,
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI * 2 * progress),
      false
    );
    context.strokeStyle = accentColor;
    context.lineWidth = 20;
    context.lineCap = "round";
    context.stroke();

    // Minute marks
    for (let mark = 0; mark < 60; mark++) {
      const angle = (mark * Math.PI * 2) / 60 - Math.PI / 2;
      const isMajorMark = mark % 5 === 0;

      const outerRadius = radius - 42;
      const innerRadius = outerRadius - (isMajorMark ? 14 : 7);

      const x1 = center + Math.cos(angle) * innerRadius;
      const y1 = center + Math.sin(angle) * innerRadius;
      const x2 = center + Math.cos(angle) * outerRadius;
      const y2 = center + Math.sin(angle) * outerRadius;

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = isMajorMark ? "#d1d5db" : "#6b7280";
      context.lineWidth = isMajorMark ? 5 : 2;
      context.lineCap = "round";
      context.stroke();
    }

    // Timer hand: points to time remaining.
    const handAngle = -Math.PI / 2 + (Math.PI * 2 * progress);
    const handLength = radius - 94;

    const handX = center + Math.cos(handAngle) * handLength;
    const handY = center + Math.sin(handAngle) * handLength;

    context.beginPath();
    context.moveTo(center, center);
    context.lineTo(handX, handY);
    context.strokeStyle = accentColor;
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();

    // Center point
    context.beginPath();
    context.arc(center, center, 16, 0, Math.PI * 2);
    context.fillStyle = "#f9fafb";
    context.fill();

    context.beginPath();
    context.arc(center, center, 8, 0, Math.PI * 2);
    context.fillStyle = accentColor;
    context.fill();

    // Time text in the center
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const timeText =
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");

    context.fillStyle = "#f9fafb";
    context.font = "bold 56px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(timeText, center, center + 82);
  }
}