<script lang="ts" context="module">
	import sft, { type Renderable, type ToastOptions } from 'svelte-french-toast';
	import SuccessIcon from './SuccessIcon.svelte';
	import ErrorIcon from './ErrorIcon.svelte';

	export const toast = {
		...sft,
		success: (message: Renderable, options?: ToastOptions) => {
			sft.success(message, { ...options, icon: SuccessIcon });
		},
		error: (message: Renderable, options?: ToastOptions) => {
			sft.error(message, { ...options, icon: ErrorIcon });
		}
	};
</script>
