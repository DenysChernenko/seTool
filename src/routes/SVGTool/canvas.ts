import { readable, writable } from "svelte/store";

export let x = writable(1000)
export let y = writable(1000)
export let pad = writable(0.3)

