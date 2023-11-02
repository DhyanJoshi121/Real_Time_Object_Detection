type Detection = {
  bbox: Array<number>;
  class: string;
  score: number;
};

const drawRect = (
  detections: Array<Detection>,
  contex: CanvasRenderingContext2D | null
) => {
  if (!contex) return;

  detections.forEach((detect: Detection) => {
    // get detection
    const [x, y, w, h] = detect["bbox"];
    const str = detect["class"];

    //style
    // Set the rectangle border color
    contex.strokeStyle = "green";
    // Set the rectangle border width
    contex.lineWidth = 2;
    // Set the text color
    contex.fillStyle = "green";
    // Set the text font size
    contex.font = "20px Arial";

    // Draw Rect and text
    contex.beginPath();
    contex.rect(x, y, w, h);
    contex.stroke();

    contex.fillText(str, x, y);
  });
};

export default drawRect;
