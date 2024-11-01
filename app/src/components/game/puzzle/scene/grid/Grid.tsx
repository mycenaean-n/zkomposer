import { Colors } from 'circuits';
import { Color, ColorRepresentation, Vector3 } from 'three';
import { Cube } from './Cube';

type GridProps = {
  grid: Colors[][];
  position: { x: number; y: number; z: number };
};

export enum Colour {
  transparent = 0,
  yellow = 1,
  red = 2,
  blue = 3,
}

function numberToColour(colour: Colour): ColorRepresentation {
  switch (colour) {
    case 0:
      return 'white';
    case 1:
      return 'yellow';
    case 2:
      return 'red';
    case 3:
      return 'blue';
    default:
      throw Error('Not expected colour.');
  }
}

export function Grid(props: GridProps) {
  const cubeElements: JSX.Element[] = [];
  const y = 4.02;
  const z = 4.02;
  let [xOffset, yOffset, zOffset] = [
    props.position.x,
    props.position.y,
    props.position.z,
  ];
  for (const [columnIndex, column] of props.grid.entries()) {
    for (const [cubeIndex, cube] of column.entries()) {
      if (cube != 0) {
        cubeElements.push(
          <Cube
            key={`[${columnIndex}-${cubeIndex}]`}
            colour={new Color(numberToColour(cube))}
            position={new Vector3(xOffset, yOffset, zOffset)}
          />
        );
      }
      yOffset += y / column.length;
    }
    yOffset = props.position.y;
    zOffset += z / column.length;
  }
  return (
    <group
      position={
        new Vector3(props.position.x, props.position.y, props.position.z)
      }
    >
      {cubeElements}
    </group>
  );
}
