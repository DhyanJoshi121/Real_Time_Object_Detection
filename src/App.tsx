import { useEffect, useRef } from "react";
import tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import drawRect from "./utils";
import "./App.css";

const App = () => {
  const webcamRef: React.RefObject<Webcam> = useRef<Webcam>(null);
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  // load coco
  const cocoLoad = async (): Promise<void> => {
    const model = await cocossd.load();

    // loop detect
    setInterval(() => detect(model), 1);
  };

  const detect = async (model: cocossd.ObjectDetection): Promise<void> => {
    // check webcam
    if (webcamRef !== null && webcamRef.current?.video?.readyState === 4) {
      console.log("fine");
    }

    // get video props
    const video = webcamRef.current?.video;
    const videoWidth = video?.videoWidth;
    const videoHeight = video?.videoHeight;
    if (
      video &&
      canvasRef.current &&
      typeof videoWidth === "number" &&
      typeof videoHeight === "number"
    ) {
      // set video properties
      video.width = videoWidth;
      video.height = videoHeight;

      // set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const det = await model.detect(video);
      console.log(det);

      // draw
      const contex: CanvasRenderingContext2D | null =
        canvasRef.current.getContext("2d");
      drawRect(det, contex);
    }
  };

  useEffect(() => {
    cocoLoad();
  }, []);

  return (
    <>
      <div className="hero">
        <Webcam ref={webcamRef} className="webcam" />
        <canvas ref={canvasRef} className="canvas" />
      </div>
    </>
  );
};

export default App;
