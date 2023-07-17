import * as BABYLON from "babylonjs";
import { useEffect, useRef } from "react";

export function useCanvas() {
  const ref = useRef(null);
  return ref;
}

export function useEngine(canvasRef) {
  const ref = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      ref.current = new BABYLON.Engine(canvasRef.current, true);
    }

    return () => {
      if (ref.current) {
        ref.current.dispose();
      }
    };
  }, [canvasRef]);

  return ref;
}

export function useScene(engineRef) {
  const ref = useRef(null);

  useEffect(() => {
    if (engineRef.current) {
      ref.current = new BABYLON.Scene(engineRef.current);
    }
  }, [engineRef]);

  return ref;
}

export function useMap(sceneRef, screenshotUrl) {
  const boxRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const scene = sceneRef.current;
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0,
        0,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

      new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 0.4, 0),
        scene
      );

      const parent = new BABYLON.TransformNode("parent", scene);

      if (!boxRef.current) {
        boxRef.current = BABYLON.MeshBuilder.CreateBox(
          "cuboid",
          { size: 3 },
          scene
        );
        boxRef.current.parent = parent;

        materialRef.current = new BABYLON.StandardMaterial("material", scene);

        boxRef.current.material = materialRef.current;

        const rotationBehavior = new BABYLON.PointerDragBehavior({
          dragAxis: new BABYLON.Vector3(0, 1, 0),
        });
        parent.addBehavior(rotationBehavior);

        rotationBehavior.onDragObservable.add(function (eventData) {
          parent.rotation.y += eventData.delta.x / 100;
        });
      }

      materialRef.current.diffuseTexture = new BABYLON.Texture(
        screenshotUrl,
        scene
      );

      boxRef.current.position = new BABYLON.Vector3(0, 0, 0);
      boxRef.current.rotation = new BABYLON.Vector3(1, 1, 1);
      boxRef.current.scaling = new BABYLON.Vector3(1, 1, 1);

      scene.getEngine().runRenderLoop(() => {
        scene.render();
      });
    }
  }, [sceneRef, screenshotUrl]);
}
