import { readable } from 'svelte/store';
import { browser } from '$app/environment';

let initialValue;
if (!browser) {
	initialValue = null;
} else {
	initialValue = {
		width: window.innerWidth,
		height: window.innerHeight
	};
}

export const windowSizeStore = readable(initialValue, function start(set) {
	if (!browser) {
		return;
	}

	const resizeObserver = new ResizeObserver((e) => {
		const [observation] = e;
		set({
			width: observation.contentRect.width,
			height: observation.contentRect.height
		});
	});

	resizeObserver.observe(document.body);

	return function stop() {
		resizeObserver.disconnect();
	};
});
