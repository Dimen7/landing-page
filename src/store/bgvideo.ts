import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';

export const videoActive = writable(false);
export const videoPlaying = writable(false);

// Load volume from localStorage or use default from env
function initializeVolume() {
	if (typeof window === 'undefined') return Number(env.PUBLIC_BG_VIDEO_VOLUME) || 50;
	const stored = localStorage.getItem('bgVideoVolume');
	return stored ? Number(stored) : Number(env.PUBLIC_BG_VIDEO_VOLUME) || 50;
}

export const videoVolume = writable(initializeVolume());

// Persist volume to localStorage when changed
videoVolume.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('bgVideoVolume', String(value));
	}
});

// Get list of all video IDs
function getAllVideoIds(): string[] {
	if (!env.PUBLIC_BG_VIDEO_ID) return [];
	return env.PUBLIC_BG_VIDEO_ID.split(',').map((id) => id.trim()).filter(Boolean);
}

// Parse video IDs and pick a random one (never the same as last)
function getRandomVideoId(): string {
	const ids = getAllVideoIds();
	if (ids.length === 0) return '';
	if (ids.length === 1) return ids[0];

	const lastVideoId = typeof window !== 'undefined' ? localStorage.getItem('lastVideoId') || '' : '';

	let nextId: string;
	do {
		nextId = ids[Math.floor(Math.random() * ids.length)];
	} while (nextId === lastVideoId && ids.length > 1);

	if (typeof window !== 'undefined') {
		localStorage.setItem('lastVideoId', nextId);
	}

	return nextId;
}

export const currentVideoId = writable(getRandomVideoId());
export { getRandomVideoId, getAllVideoIds };
