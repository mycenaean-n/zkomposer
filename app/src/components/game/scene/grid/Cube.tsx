import { BoxGeometry, Color, Float32BufferAttribute, Vector3 } from 'three';

type CubeProps = {
  colour: Color;
  position: Vector3;
};

export function Cube(props: CubeProps) {
  const geo = new BoxGeometry(0.28, 0.28, 0.28);
  const colors = [];
  const baseColor = props.colour;

  const topColor = baseColor.clone().multiplyScalar(1.3);
  const sideColor = baseColor.clone().multiplyScalar(0.8);
  const leftColor = baseColor.clone().multiplyScalar(0.35);
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

  return (
    <mesh position={props.position}>
      <primitive object={geo} />
      <meshBasicMaterial vertexColors />
    </mesh>
  );
}
