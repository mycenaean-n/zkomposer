import { Vector3 } from 'three';

export function BlackHole({ xPos, yPos }: { xPos: number; yPos: number }) {
  return (
    <group
      position={new Vector3(xPos, yPos, 0)}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around X axis
    >
      {/* Depth layers - creating vortex effect */}
      {[-0.2, -0.3].map((_, i) => (
        <mesh
          key={`vortex-${i}`}
          position={new Vector3(xPos - 0.015, yPos - 0.13, 0)}
          rotation={[0, 0, i * 0.65]} // Increased rotation for more visible spiral
        >
          <ringGeometry args={[0.72, 0.6, 32]} />
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
      <mesh position={new Vector3(xPos - 0.05, yPos - 0.15, 0)}>
        <ringGeometry args={[0.8, 0.68, 32]} />
        <meshBasicMaterial color="#ff3300" transparent={true} side={2} />
      </mesh>
      {/* inner black */}
      <mesh
        position={new Vector3(xPos - 0.04, yPos - 0.15, 0)}
        rotation={[0, 0, 0.75]} // Increased rotation for more visible spiral
      >
        <ringGeometry args={[0, 0.62, 68]} />
        <meshBasicMaterial color="#000000" side={2} />
      </mesh>
    </group>
  );
}
