<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Social from './Social.svelte';
	import {
		faEnvelope,
		faKey,
		faGlobe,
		faLink,
		faPhone,
		faUser,
		faCode,
		faBook,
		faGraduationCap,
		faBriefcase,
		faChessKnight,
		faGamepad,
		faCircleInfo
	} from '@fortawesome/free-solid-svg-icons';
	import {
		faDiscord,
		faGithub,
		faReddit,
		faTelegramPlane,
		faTwitter,
		faYoutube,
		faInstagram,
		faLinkedin,
		faTiktok,
		faTwitch,
		faFacebook,
		faSteam,
		faStackOverflow,
		faWhatsapp,
		faSnapchat,
		faMastodon,
		faPinterest,
		faMedium,
		faGitlab,
		faBitbucket,
		faPaypal,
		faPatreon,
		faSpotify,
		faApple,
		faGoogle,
		faMicrosoft,
		faAmazon,
		faBehance,
		faDribbble,
		faFlickr,
		faFigma,
		faItchIo,
		faXbox,
		faPlaystation
	} from '@fortawesome/free-brands-svg-icons';

	const iconMap: Record<string, any> = {
		// Solid / General
		MAIL: faEnvelope,
		ENVELOPE: faEnvelope,
		KEY: faKey,
		GPG: faKey,
		GLOBE: faGlobe,
		WEBSITE: faGlobe,
		LINK: faLink,
		PHONE: faPhone,
		USER: faUser,
		CODE: faCode,
		BOOK: faBook,
		UNIVERSITY: faGraduationCap,
		EDUCATION: faGraduationCap,
		WORK: faBriefcase,
		CHESS: faChessKnight,
		LICHESS: faChessKnight,
		GAMEPAD: faGamepad,
		OSU: faGamepad,
		INFO: faCircleInfo,

		// Brands
		DISCORD: faDiscord,
		GITHUB: faGithub,
		REDDIT: faReddit,
		TELEGRAM: faTelegramPlane,
		TWITTER: faTwitter,
		X: faTwitter,
		YOUTUBE: faYoutube,
		INSTAGRAM: faInstagram,
		LINKEDIN: faLinkedin,
		TIKTOK: faTiktok,
		TWITCH: faTwitch,
		FACEBOOK: faFacebook,
		STEAM: faSteam,
		STACKOVERFLOW: faStackOverflow,
		WHATSAPP: faWhatsapp,
		SNAPCHAT: faSnapchat,
		MASTODON: faMastodon,
		PINTEREST: faPinterest,
		MEDIUM: faMedium,
		GITLAB: faGitlab,
		BITBUCKET: faBitbucket,
		PAYPAL: faPaypal,
		PATREON: faPatreon,
		SPOTIFY: faSpotify,
		APPLE: faApple,
		GOOGLE: faGoogle,
		MICROSOFT: faMicrosoft,
		AMAZON: faAmazon,
		BEHANCE: faBehance,
		DRIBBBLE: faDribbble,
		FLICKR: faFlickr,
		FIGMA: faFigma,
		ITCHIO: faItchIo,
		XBOX: faXbox,
		PLAYSTATION: faPlaystation
	};

	// Get all keys from the public environment that start with PUBLIC_SOCIAL_
	const socialEntries = Object.entries(env)
		.filter(([key]) => key.startsWith('PUBLIC_SOCIAL_'))
		.map(([key, value]) => {
			if (!value) return null;
			const name = key.replace('PUBLIC_SOCIAL_', '').toUpperCase();
			const faIcon = iconMap[name] || faLink; // Fallback to a generic link icon
			return { faIcon, link: value };
		})
		.filter((s) => s !== null) as { faIcon: any; link: string }[];
</script>

{#each socialEntries as social}
	<Social faIcon={social.faIcon} link={social.link} />
{/each}
