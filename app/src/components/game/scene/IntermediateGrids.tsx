import {
  CircuitFunctions,
  Colors,
} from 'circuits/types/circuitFunctions.types';
import { isMobile } from 'react-device-detect';
import { Vector3 } from 'three';
import { Grid } from './grid/Grid';

export default function IntermediateGrids({
  grids,
  availableFunctions,
  xPos,
  yPos,
}: {
  grids: Colors[][][];
  availableFunctions: CircuitFunctions[];
  xPos: number;
  yPos: number;
}) {
  const xGap = isMobile
    ? 8 / availableFunctions.length
    : 5 / availableFunctions.length;

  return grids.map((grid, index) => {
    xPos += xGap;

    // Calculate sum of all elements in the grid
    const gridSum = grid
      .flat(2)
      .reduce((sum: number, val: number) => sum + val, 0);

    if (gridSum === 0) {
      return (
        <group
          key={index}
          position={new Vector3(xPos, yPos, 0)}
          rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around X axis
        >
          {/* Depth layers - creating vortex effect */}
          {[-0.2, -0.3].map((yPos, i) => (
            <mesh
              key={`vortex-${i}`}
              position={new Vector3(-0.015, -0.13, 0)}
              rotation={[0, 0, i * 0.65]} // Increased rotation for more visible spiral
            >
              <ringGeometry args={[0.41, 0.51, 32]} />
              <shaderMaterial
                fragmentShader={`
                  varying vec2 vUv;
                  void main() {
                    float dist = length(vUv - 0.5);
                    vec3 color1 = vec3(1.0, 0.4, 0.0);
                    vec3 color2 = vec3(1.0, 0.1, 0.0);
                    vec3 finalColor = mix(color1, color2, dist);
                    float alpha = smoothstep(1.0, 0.2, dist) * ${0.6 - i * 0.1};
                    gl_FragColor = vec4(finalColor, alpha);
                  }
                `}
                vertexShader={`
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `}
                transparent={true}
                side={2}
              />
            </mesh>
          ))}
          {/* Inner bright ring - orange */}
          <mesh position={new Vector3(-0.05, -0.15, 0)}>
            <ringGeometry args={[0.6, 0.48, 32]} />
            <meshBasicMaterial color="#ff3300" transparent={true} side={2} />
          </mesh>
          {/* inner black */}
          <mesh
            position={new Vector3(-0.015, -0.13, 0)}
            rotation={[0, 0, 0.75]} // Increased rotation for more visible spiral
          >
            <ringGeometry args={[0, 0.45, 70]} />
            <meshBasicMaterial color="#000000" side={2} />
          </mesh>
        </group>
      );
    }

    // Return normal grid otherwise
    return (
      <Grid key={index} grid={grid} position={{ x: xPos, y: yPos, z: 0 }} />
    );
  });
}
