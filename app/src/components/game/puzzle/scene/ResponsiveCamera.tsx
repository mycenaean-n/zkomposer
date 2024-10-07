import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export function ResponsiveCamera() {
  const { size, camera } = useThree();
  // Adjust camera aspect ratio and update projection matrix
  useEffect(() => {
    // leave it for now
    camera.zoom = isMobile ? size.height / 9 : size.height / 6;
    camera.near = -25;
    // camera.position.set(1, 1, 1);
    if (isMobile) {
      camera.rotation.z = Math.PI / 80.2;
    }
    camera.updateProjectionMatrix();
  }, [size.height, camera]);

  return null;
}
