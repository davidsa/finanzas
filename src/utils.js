import crocks from 'crocks';

const {tryCatch} = crocks;

export const log = label => x => (console.log(`${label}:`, x), x);

export const safeParse = tryCatch(x => JSON.parse(x));
