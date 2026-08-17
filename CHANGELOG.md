# Changelog

All notable changes to this project are documented here.
Format follows [Conventional Commits](https://www.conventionalcommits.org/).


## [0.3.2](https://github.com/Dimen7/landing-page/compare/v0.3.1...v0.3.2) (2026-08-17)

### Bug Fixes

* **types:** guard PUBLIC_* env access for CI without .env ([d65eb66](https://github.com/Dimen7/landing-page/commit/d65eb66b2e61a75ee1d546428e3dd876cdf8b1ca))

### Maintenance

* **deps:** bump actions/checkout from 4 to 6 ([#1](https://github.com/Dimen7/landing-page/issues/1)) ([ee4eb42](https://github.com/Dimen7/landing-page/commit/ee4eb42d159fef62a45f46e05ab42394c61c602f))
* **deps:** bump actions/setup-node from 4 to 6 ([#2](https://github.com/Dimen7/landing-page/issues/2)) ([ffb2e20](https://github.com/Dimen7/landing-page/commit/ffb2e20f9f98f8a77adc1f13f63fdc5f62a87f5a))
* **deps:** bump docker/build-push-action from 5 to 7 ([#3](https://github.com/Dimen7/landing-page/issues/3)) ([8685a65](https://github.com/Dimen7/landing-page/commit/8685a658712cd1483010c4a4a5b469532f80e310))
* **deps:** bump docker/login-action from 3 to 4 ([#4](https://github.com/Dimen7/landing-page/issues/4)) ([fc0885f](https://github.com/Dimen7/landing-page/commit/fc0885fcc466ce534648c868b2bae0e0d74d209d))
* **deps:** bump docker/metadata-action from 5 to 6 ([#5](https://github.com/Dimen7/landing-page/issues/5)) ([4e1517c](https://github.com/Dimen7/landing-page/commit/4e1517c97d19c82f82de3bdc3a33320d6893a04f))
* **ci:** add Dependabot config, CI verification workflow and verify script ([3887a57](https://github.com/Dimen7/landing-page/commit/3887a57114ec7de7149f4bb89436a28e44b36fd8))
* **ci:** bump the actions group across 1 directory with 2 updates ([#19](https://github.com/Dimen7/landing-page/issues/19)) ([bcc5aa8](https://github.com/Dimen7/landing-page/commit/bcc5aa818c69c46bf4ce73141fbab42eb56f07a9))
* **deps:** bump @sveltejs/kit from 2.70.1 to 2.70.2 ([#20](https://github.com/Dimen7/landing-page/issues/20)) ([8824ea3](https://github.com/Dimen7/landing-page/commit/8824ea34ce8e5685523e9457bdc3a276a4659630))
* **deps:** bump @types/node from 25.9.2 to 26.2.0 ([#12](https://github.com/Dimen7/landing-page/issues/12)) ([7975e0c](https://github.com/Dimen7/landing-page/commit/7975e0cfda1025e2f1864cad4c9a1cf127a43f4a))
* **deps:** bump brace-expansion from 1.1.13 to 1.1.18 ([#22](https://github.com/Dimen7/landing-page/issues/22)) ([5eebdb2](https://github.com/Dimen7/landing-page/commit/5eebdb23f405021b4acbe2d527ae1f549dc479a2))
* **deps:** bump immutable from 5.1.5 to 5.1.9 ([#16](https://github.com/Dimen7/landing-page/issues/16)) ([41ee22c](https://github.com/Dimen7/landing-page/commit/41ee22cb54d01a91f69b47960cd1755f63c8ab36))
* **deps:** bump the minor-and-patch group across 1 directory with 18 updates ([#17](https://github.com/Dimen7/landing-page/issues/17)) ([0b81218](https://github.com/Dimen7/landing-page/commit/0b8121873f7327e2e49db10d5317dff3d08f3c7c))
* **deps:** bump the minor-and-patch group across 1 directory with 2 updates ([#7](https://github.com/Dimen7/landing-page/issues/7)) ([b535937](https://github.com/Dimen7/landing-page/commit/b5359374ff54d580dcfa188757cceb94c819fc58))
* **deps:** bump the minor-and-patch group across 1 directory with 9 updates ([#10](https://github.com/Dimen7/landing-page/issues/10)) ([2191dad](https://github.com/Dimen7/landing-page/commit/2191dade390fa442710c54e5124b5aa6fa0e2a2e))
* **deps:** bump the minor-and-patch group with 9 updates ([b217b14](https://github.com/Dimen7/landing-page/commit/b217b14cd6d33dbd81a1cf295a499159df52e1b0)), closes [#6](https://github.com/Dimen7/landing-page/issues/6)
* **deps:** bump the minor-and-patch group with 9 updates ([#8](https://github.com/Dimen7/landing-page/issues/8)) ([0d0774b](https://github.com/Dimen7/landing-page/commit/0d0774bfa4dd9d0117505922933b79778ba7162f))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.1](https://github.com/Dimen7/landing-page/compare/v0.3.0...v0.3.1) (2026-05-24)


### Security & Maintenance

* bump @sveltejs/kit, svelte, vite, sass, eslint, prettier-plugin-svelte and related dev dependencies; resolves transitive devalue (high), svelte (4× XSS/ReDoS) and brace-expansion (moderate) advisories
* migrate ESLint to flat config (eslint.config.js) for ESLint v10 compatibility
* add typed declarations for YouTube IFrame and TypeIt globals; install @types/three, @types/youtube, @types/node

## [0.3.0](https://github.com/Dimen7/landing-page/compare/v0.1.0...v0.3.0) (2026-05-06)


### Features

* add background YouTube video with blur, fade-in on first click, scroll to adjust volume ([a9094ea](https://github.com/Dimen7/landing-page/commit/a9094ea6106949433aba4fcbfdc4989b05383a0b))
* add vertical glass video controls bar with play/pause, volume slider and scroll sync ([874403e](https://github.com/Dimen7/landing-page/commit/874403e43e42e8a1f58e3feeb050bcd14de2c756))
* add YouTube link icon to video controls ([3296fc8](https://github.com/Dimen7/landing-page/commit/3296fc8c4fef9d266184fa713741043be58bad0b))
* CD spin animation, no tilt in corner, glass footer while video plays ([9bb51c9](https://github.com/Dimen7/landing-page/commit/9bb51c9e75c5534897827dac9bd05fb65233124e))
* dockerize project, rename to landing-page and update documentation ([f71b539](https://github.com/Dimen7/landing-page/commit/f71b539724487ac2e11aebc18be7151919b4ee93))
* implement youtube iframe api for background video with auto-advance ([739e8cb](https://github.com/Dimen7/landing-page/commit/739e8cbc113cc36b8ebc270c1aa7162f63be5ace))
* make video blur and initial volume configurable via env vars ([5d011d4](https://github.com/Dimen7/landing-page/commit/5d011d4b38e214b3b818af12baaf403f14354450))
* toggle video pause on click, show only profile image in corner when video plays ([077b621](https://github.com/Dimen7/landing-page/commit/077b621191542c98deef92acdef31d721a10c947))


### Bug Fixes

* hide overflow on body to prevent scrollbar when logo is translated off-screen ([428e471](https://github.com/Dimen7/landing-page/commit/428e471068845162d39d31f0f62741fc2da410b3))
* **mobile:** stabilize logo and footer animations ([ac58e97](https://github.com/Dimen7/landing-page/commit/ac58e97898d54188e17a7baf140c44817072cc6a))
* move profile image to top-right corner during video playback ([acbcd40](https://github.com/Dimen7/landing-page/commit/acbcd40dcafe85e034719faad5de88001a567a89))
* resolve YouTube background video playback on iOS and add mobile dev docs ([fb8dc5d](https://github.com/Dimen7/landing-page/commit/fb8dc5da99bc09fb7901b637168b6a494222beb4))
* switch to dynamic environment variables for docker runtime support ([93354a5](https://github.com/Dimen7/landing-page/commit/93354a5350f540384dc732000e925a221868f026))
* update CSP to allow Cloudflare Insights and YouTube ([188f6d2](https://github.com/Dimen7/landing-page/commit/188f6d2752a9dc79a8224485338b1df08dba54e8))

## [0.2.0](https://github.com/Dimen7/landing-page/compare/v0.1.0...v0.2.0) (2026-04-10)


### Features

* add background YouTube video with blur, fade-in on first click, scroll to adjust volume ([a9094ea](https://github.com/Dimen7/landing-page/commit/a9094ea6106949433aba4fcbfdc4989b05383a0b))
* add vertical glass video controls bar with play/pause, volume slider and scroll sync ([874403e](https://github.com/Dimen7/landing-page/commit/874403e43e42e8a1f58e3feeb050bcd14de2c756))
* add YouTube link icon to video controls ([3296fc8](https://github.com/Dimen7/landing-page/commit/3296fc8c4fef9d266184fa713741043be58bad0b))
* CD spin animation, no tilt in corner, glass footer while video plays ([9bb51c9](https://github.com/Dimen7/landing-page/commit/9bb51c9e75c5534897827dac9bd05fb65233124e))
* dockerize project, rename to landing-page and update documentation ([f71b539](https://github.com/Dimen7/landing-page/commit/f71b539724487ac2e11aebc18be7151919b4ee93))
* make video blur and initial volume configurable via env vars ([5d011d4](https://github.com/Dimen7/landing-page/commit/5d011d4b38e214b3b818af12baaf403f14354450))
* toggle video pause on click, show only profile image in corner when video plays ([077b621](https://github.com/Dimen7/landing-page/commit/077b621191542c98deef92acdef31d721a10c947))


### Bug Fixes

* hide overflow on body to prevent scrollbar when logo is translated off-screen ([428e471](https://github.com/Dimen7/landing-page/commit/428e471068845162d39d31f0f62741fc2da410b3))
* **mobile:** stabilize logo and footer animations ([ac58e97](https://github.com/Dimen7/landing-page/commit/ac58e97898d54188e17a7baf140c44817072cc6a))
* move profile image to top-right corner during video playback ([acbcd40](https://github.com/Dimen7/landing-page/commit/acbcd40dcafe85e034719faad5de88001a567a89))

## [0.1.0](https://github.com/Dimen7/landing-page/compare/v0.0.2...v0.1.0) (2026-04-09)


### Features

* make website content and styles fully configurable via environment variables ([ce5b427](https://github.com/Dimen7/landing-page/commit/ce5b427e1f0440d6106193083a71a37ed68f3b14))
* show seconds in clock and update it live every second ([5458556](https://github.com/Dimen7/landing-page/commit/54585561300d266caf4121c20d4691997242006a))


### Bug Fixes

* hide default cursor globally in favour of custom cursor ([c0ffd79](https://github.com/Dimen7/landing-page/commit/c0ffd79aa6fd7dc2ed6fccf07202ddaea7d70a26))
* prevent images, svgs and links from being draggable ([2dbb390](https://github.com/Dimen7/landing-page/commit/2dbb390aeb7875d57a2cadf42cd761648b0b3962))
* use elementFromPoint to detect hover over transformed children and fixed-position image gap ([43a224a](https://github.com/Dimen7/landing-page/commit/43a224ae3e479c1d224a76d9b30dddd6c9d61c6d))
* wrap sveltekit.body in display:contents div as recommended ([11219de](https://github.com/Dimen7/landing-page/commit/11219defa77a8b2beb6b41b0981697a2b7f084dc))

### 0.0.2 (2026-04-09)


### Features

* Add blur and optimize shader ([ca3a8e2](https://github.com/oSumAtrIX/osumatrix.me/commit/ca3a8e2b7f41a24009a614e7d3d8954233451a59))
* Add remaining static files ([b731113](https://github.com/oSumAtrIX/osumatrix.me/commit/b731113773efeed429a81f4647a3b599a1481787))
* init ([b4a04b8](https://github.com/oSumAtrIX/osumatrix.me/commit/b4a04b89c8538ce7b8dad3385a908e8fca8f0ea7))
* justify text alignment for about paragraph ([8f95375](https://github.com/oSumAtrIX/osumatrix.me/commit/8f953752df22294b40df34617fb441060b736a3b))
* New site animation ([5d55a41](https://github.com/oSumAtrIX/osumatrix.me/commit/5d55a41d3aef6da559934beed4a1847e6ecf680c))
* Remove image click redirect ([75815aa](https://github.com/oSumAtrIX/osumatrix.me/commit/75815aa62228e0971e101c4c68addbdf3022e22d))
* Update age, Discord name and dependencies ([003ee55](https://github.com/oSumAtrIX/osumatrix.me/commit/003ee55ecf90237a75d121ff5484a394786bf9c0))
* Update age, links and dependencies ([d5a315a](https://github.com/oSumAtrIX/osumatrix.me/commit/d5a315ab4c7ba115eba4afda0ba62f5a9e936493))


### Bug Fixes

* color title ([3d8ca68](https://github.com/oSumAtrIX/osumatrix.me/commit/3d8ca681bcb5ae21913e03350d218d57804222ec))
* improve mobile experience ([d55d4b6](https://github.com/oSumAtrIX/osumatrix.me/commit/d55d4b6bb49950499182b9d4a136b1517fe8fd0f))
* overflowing for different screen sizes ([e19d049](https://github.com/oSumAtrIX/osumatrix.me/commit/e19d049ac63598da356e32dfcd988344c4a6c092))
* override social text ([308b491](https://github.com/oSumAtrIX/osumatrix.me/commit/308b4916c5bbdc95bc27069f331398435a502e08))
* website embed title ([7c3d94d](https://github.com/oSumAtrIX/osumatrix.me/commit/7c3d94d790298787bd9ec56a0c8ed1866dbeb652))
