import { RefObject, useEffect } from "react";
import { Grid } from "./Grid";

export function useGrid(
    ref: RefObject<HTMLDivElement>,
  ) {
    
    useEffect(() => {
        console.log(ref.current)
        if (ref.current) {
            const grid = new Grid(ref);
            grid.start()
        }
      
    }, [ref]);
  }