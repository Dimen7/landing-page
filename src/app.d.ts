/// <reference types="@types/youtube" />

interface TypeItInstance {
	pause(ms: number): TypeItInstance;
	type(text: string): TypeItInstance;
	delete(amount?: number): TypeItInstance;
	options(opts: { speed?: number }): TypeItInstance;
	go(): TypeItInstance;
}

interface TypeItOptions {
	speed?: number;
	waitUntilVisible?: boolean;
	breakLines?: boolean;
}

interface TypeItConstructor {
	new (selector: string, options?: TypeItOptions): TypeItInstance;
}

declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
		TypeIt: TypeItConstructor;
	}
}

export {};
