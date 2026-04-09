import { writable } from 'svelte/store';
import { PUBLIC_BG_VIDEO_VOLUME } from '$env/static/public';

export const videoActive = writable(false);
export const videoPlaying = writable(false);
export const videoVolume = writable(Number(PUBLIC_BG_VIDEO_VOLUME) || 50);
