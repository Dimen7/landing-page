import jumpScareUrl from '$lib/assets/jump-scare.mp4';
import voidAudioUrl from '$lib/assets/void.mp3';

export { jumpScareUrl, voidAudioUrl };

export function initVoid() {
	const TypeIt = (window as any).TypeIt;

	const typeItInstance = new TypeIt('#text', {
		speed: 100,
		waitUntilVisible: true,
		breakLines: true
	})
		.pause(1500)
		.type('Welcome...')
		.pause(2000)
		.delete()
		.pause(50)
		.type('Why did you come here? ')
		.pause(1500)
		.type('Did you get lost?')
		.pause(2000)
		.options({ speed: 50 })
		.delete()
		.pause(50)
		.type("Don't worry...")
		.pause(900)
		.type('nothing will happen')
		.pause(2000)
		.delete()
		.pause(3000)
		.options({ speed: 700 })
		.type('...')
		.pause(750)
		.options({ speed: 100 })
		.delete()
		.pause(50)
		.type('Well, as you can see...')
		.pause(750)
		.options({ speed: 100 })
		.type(' this')
		.options({ speed: 150 })
		.type(' vast')
		.options({ speed: 200 })
		.type(' place')
		.options({ speed: 250 })
		.type(' returns')
		.pause(2000)
		.options({ speed: 0 })
		.delete()
		.options({ speed: 1000 })
		.type('...')
		.pause(2000)
		.options({ speed: 0 })
		.delete()
		.options({ speed: 300 })
		.type('<strong>ETERNAL VOID</strong>')
		.pause(6000)
		.delete()
		.options({ speed: 100 })
		.type('Why are you still here')
		.pause(2000)
		.type('? ')
		.pause(5000)
		.delete()
		.options({ speed: 300 })
		.type('Please ')
		.options({ speed: 100 })
		.pause(1000)
		.type("don't go away");

	const welcomePage = document.getElementById('welcome-page');
	if (!welcomePage) return;

	welcomePage.onclick = () => {
		welcomePage.style.display = 'none';

		const video = document.getElementById('jump-scare') as HTMLVideoElement;
		const text = document.getElementById('text');
		const audio = document.getElementById('audio') as HTMLAudioElement;

		audio.play();

		document.onmouseleave = () => {
			video.hidden = false;
			if (text) text.hidden = true;
			video.play();
			audio.pause();
		};

		document.onmouseenter = () => {
			video.hidden = true;
			if (text) text.hidden = false;
			video.load();
			audio.play();
		};

		typeItInstance.go();
	};
}
