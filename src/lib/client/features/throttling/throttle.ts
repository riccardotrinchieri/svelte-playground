/* eslint-disable no-var */
var timeoutId: number | null = null;

export const throttle = <T extends () => ReturnType<T>>(fn: T, interval: number) => {
	if (!timeoutId) {
		timeoutId = window.setTimeout(() => {
			timeoutId = null;
			return fn();
		}, interval);
	}
};
