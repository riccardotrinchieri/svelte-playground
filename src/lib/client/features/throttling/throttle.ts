export class Throttler {
	timeoutId: number | null;

	constructor() {
		this.timeoutId = null;
	}

	throttle<T extends () => ReturnType<T>>(fn: T, interval: number) {
		if (!this.timeoutId) {
			this.timeoutId = window.setTimeout(() => {
				this.timeoutId = null;
				return fn();
			}, interval);
		}
	}
}
