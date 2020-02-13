import React, {useRef, useEffect} from 'react';
import crocks from 'crocks';

const {tryCatch} = crocks;

export const log = label => x => (console.log(`${label}:`, x), x);

export const safeParse = tryCatch(x => JSON.parse(x));

export const useDidMountEffect = (fun, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      fun();
    } else {
      didMount.current = true;
    }
  }, [deps]);
};
