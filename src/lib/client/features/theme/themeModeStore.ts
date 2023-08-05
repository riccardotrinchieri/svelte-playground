import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialValue;
if (!browser) {
	initialValue = null;
} else {
	const themeMode = localStorage.getItem('nightwind-mode') as 'light' | 'dark' | null;
	initialValue = themeMode || 'light';
}

export const themeModeStore = writable(initialValue);

themeModeStore.subscribe((mode) => browser && mode && localStorage.setItem('nightwind-mode', mode));
