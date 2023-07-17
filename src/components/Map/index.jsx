import { useCanvas, useEngine, useScene, useMap } from "../../hooks/useMap";
import { STYLE } from "./config";

function Map({ screenshotUrl }) {
  const canvasRef = useCanvas();
  const engineRef = useEngine(canvasRef);
  const sceneRef = useScene(engineRef);

  useMap(sceneRef, screenshotUrl);

  return <canvas style={STYLE} ref={canvasRef} />;
}

export default Map;
