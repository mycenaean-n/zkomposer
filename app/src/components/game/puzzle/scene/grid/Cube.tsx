import { useMemo } from 'react';
import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  MeshPhongMaterial,
  Vector3,
} from 'three';

type CubeProps = {
  colour: Color;
  position: Vector3;
};

export function Cube(props: CubeProps) {
  const geometry = useMemo(() => {
    const geo = new BoxGeometry(0.28, 0.28, 0.28);
    const colors = [];
    const baseColor = props.colour;

    const topColor = baseColor.clone().multiplyScalar(1.3);
    const sideColor = baseColor.clone().multiplyScalar(0.8);
    const leftColor = baseColor.clone().multiplyScalar(0.25);
    const bottomColor = baseColor.clone().multiplyScalar(3);

    for (let i = 0; i < 6; i++) {
      let faceColor;
      if (i === 2)
        faceColor = topColor; // top face
      else if (i === 4)
        faceColor = leftColor; // bottom face
      else if (i === 3)
        faceColor = bottomColor; // bottom face
      else faceColor = sideColor; // side faces

      colors.push(faceColor.r, faceColor.g, faceColor.b);
      colors.push(faceColor.r, faceColor.g, faceColor.b);
      colors.push(faceColor.r, faceColor.g, faceColor.b);
      colors.push(faceColor.r, faceColor.g, faceColor.b);
    }

    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return geo;
  }, [props.colour]);

  const edgesGeometry = new EdgesGeometry(geometry, 2);
  const lineSegments = new LineSegments(edgesGeometry);
  lineSegments.computeLineDistances();

  function getCyberpunkColor(baseColor: Color): Color {
    // Increase saturation and brightness for a neon effect
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);
    return new Color().setHSL(
      hsl.h,
      Math.min(1, hsl.s * 1.5), // Increase saturation
      Math.min(1, hsl.l * 1.5) // Increase brightness
    );
  }

  const neonLineMaterial = useMemo(() => {
    const neonColor = getCyberpunkColor(props.colour);
    return new LineBasicMaterial({
      color: neonColor,
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });
  }, [props.colour]);

  const mistMaterial = useMemo(() => {
    const neonColor = getCyberpunkColor(props.colour);
    return new MeshPhongMaterial({
      color: neonColor,
      transparent: true,
      opacity: 0.2,
      emissive: neonColor,
      emissiveIntensity: 0.5,
    });
  }, [props.colour]);

  return (
    <group>
      <mesh position={props.position}>
        <primitive object={geometry} />
        <meshBasicMaterial vertexColors />
        <primitive object={lineSegments} position={[0.001, 0.001, 0.001]}>
          <primitive object={neonLineMaterial} />
        </primitive>
      </mesh>
      <mesh position={props.position} scale={1.05}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <primitive object={mistMaterial} />
      </mesh>
    </group>
  );
}
