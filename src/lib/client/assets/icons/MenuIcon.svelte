<script lang="ts">
	export let size: number = 24;
	$: sizePx = `${size}px`;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	style:width={sizePx}
	style:height={sizePx}
	><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill="currentColor" /></svg
>
