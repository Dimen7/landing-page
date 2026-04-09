import { writable } from 'svelte/store';

export const videoActive = writable(false);
export const videoPlaying = writable(false);
export const videoVolume = writable(50);
