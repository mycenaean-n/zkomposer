import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export function ResponsiveCamera() {
  const { size, camera } = useThree();
  // Adjust camera aspect ratio and update projection matrix
  useEffect(() => {
    camera.zoom = isMobile ? size.height / 10 : size.height / 12;
    camera.near = -25;
    if (isMobile) {
      camera.rotation.z = Math.PI / 3.2;
      // camera.rotation.y = Math.PI / 8;
    }
    camera.updateProjectionMatrix();
  }, [size.height, camera]);

  return null;
}
