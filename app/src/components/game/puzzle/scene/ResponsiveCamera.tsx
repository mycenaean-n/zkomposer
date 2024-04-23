import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export function ResponsiveCamera() {
  const { size, camera } = useThree();
  // Adjust camera aspect ratio and update projection matrix
  useEffect(() => {
    camera.zoom = size.height / 10;
    camera.near = -10;
    camera.updateProjectionMatrix();
  }, [size.height, camera]);

  return null;
}
