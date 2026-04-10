import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';

export const videoActive = writable(false);
export const videoPlaying = writable(false);
export const videoVolume = writable(Number(env.PUBLIC_BG_VIDEO_VOLUME) || 50);
