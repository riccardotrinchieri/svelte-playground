import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themeModeStore = writable(
	((browser && localStorage.getItem('nightwind-mode')) ?? 'light') as 'light' | 'dark'
);

themeModeStore.subscribe((mode) => browser && localStorage.setItem('nightwind-mode', mode));
