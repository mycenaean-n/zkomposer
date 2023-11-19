import { RefObject, useEffect, useRef, useState } from "react";
import { Grid } from "./Grid";

export function useGrid(
    ref: RefObject<HTMLDivElement>,
    grid: Grid
  ) : Grid {
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        console.log(ref.current)
        if (ref.current && !rendered) {
            grid = new Grid(ref);
            grid.start()
            setRendered(true)
        }
      
    }, [ref, rendered]);

    return grid
  }