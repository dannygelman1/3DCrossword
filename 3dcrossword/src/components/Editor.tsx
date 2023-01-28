import { useThree, Canvas } from "@react-three/fiber";
import React, { ReactElement, useEffect, useRef } from "react";
import { PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Boxes } from "./Boxes";

export const Editor = (): ReactElement => {
  return (
    <div className="flex h-full w-full bg-red-400 absolute">
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          position: [8, 0, 8],
          far: 1600,
        }}
        className="bg-gray-100"
      >
        <CameraController />
        <Boxes />
      </Canvas>
    </div>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
