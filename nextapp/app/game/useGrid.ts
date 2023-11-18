import { RefObject, useEffect, useState } from "react";
import { Grid } from "./Grid";

export function useGrid(
    ref: RefObject<HTMLDivElement>,
  ) {
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        console.log(ref.current)
        if (ref.current && !rendered) {
            const grid = new Grid(ref);
            grid.start()
            setRendered(true)
        }
      
    }, [ref, rendered]);
  }