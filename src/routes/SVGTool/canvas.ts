import { readable, writable, derived } from "svelte/store";

export let x = writable(1000);
export let y = writable(1000);

export let xpad = readable(0.3);
export let ypad = readable(0.1);

export let marginX = derived( [x,xpad], ([$x,xpad]) => xpad*$x );
export let marginY = derived( [y,ypad], ([$y,ypad]) => ypad*$y );
export let midX = derived( x, $x => $x/2 );
export let midY = derived( y, $y => $y/2 );


export let blength = writable(0);