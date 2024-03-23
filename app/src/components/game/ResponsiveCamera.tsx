import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export function ResponsiveCamera() {
  const { size, camera } = useThree();
  // Adjust camera aspect ratio and update projection matrix
  useEffect(() => {
    camera.zoom = size.height / 8;
    camera.updateProjectionMatrix();
  }, [size.height, camera]);

  return null
}
