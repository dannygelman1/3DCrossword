import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ReactElement, useRef, useState } from "react";
import { DoubleSide, PointLight } from "three";

export const Boxes = (): ReactElement => {
  const { scene, camera } = useThree();
  const pointLightRef = useRef<PointLight>(null);
  scene.add(camera);
  if (pointLightRef.current) camera.add(pointLightRef.current);
  const [selected, setSelected] = useState<number>(0);
  const [boxes, setBoxes] = useState<number[][]>([[0, 0, 0]]);
  const [neighbors, setNeighbors] = useState<number[][]>([]);

  useEffect(() => {
    setNeighbors(getNeighbors(boxes[selected], boxes));
  }, [selected]);

  return (
    <>
      <pointLight intensity={1} position={[10, 0, 0]} ref={pointLightRef} />
      <group>
        {boxes.map((box, i) => (
          <mesh
            position={[
              box[0] + 0.05 * box[0],
              box[1] + 0.05 * box[1],
              box[2] + 0.05 * box[2],
            ]}
            key={i}
            onPointerDown={(event) => {
              event.stopPropagation();
              setSelected(i);
            }}
          >
            <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
            <meshStandardMaterial
              color="red"
              opacity={selected === i ? 0.5 : 0.3}
              transparent
              side={DoubleSide}
            />
          </mesh>
        ))}
      </group>
      <group>
        {neighbors.map((box, i) => (
          <mesh
            position={[
              box[0] + 0.05 * box[0],
              box[1] + 0.05 * box[1],
              box[2] + 0.05 * box[2],
            ]}
            key={i}
            onPointerDown={(event) => {
              boxes.push(box);
              setBoxes(boxes);
              const fileted = neighbors.filter(
                (n) => n[0] !== box[0] || n[1] !== box[1] || n[2] !== box[2]
              );
              setNeighbors(fileted);
              event.stopPropagation();
            }}
          >
            <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
            <meshStandardMaterial
              color="orange"
              opacity={selected === i ? 0.5 : 0.3}
              transparent
              side={DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};

const getNeighbors = (pos: number[], existing: number[][]) => {
  const neighbors = [
    [pos[0] - 1, pos[1], pos[2]],
    [pos[0] + 1, pos[1], pos[2]],
    [pos[0], pos[1] - 1, pos[2]],
    [pos[0], pos[1] + 1, pos[2]],
    [pos[0], pos[1], pos[2] - 1],
    [pos[0], pos[1], pos[2] + 1],
  ];
  const existingString = existing.map((e) => JSON.stringify(e));
  return neighbors.filter((n) => !existingString.includes(JSON.stringify(n)));
};
