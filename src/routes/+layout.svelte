<script>
	import './styles.css';
</script>

<div class="h-full w-full bg-gray-50 font-mono text-gray-950 text-center">
	<slot />
</div>

<style lang="postcss">
	:global(html, body) {
		height: theme(height.full);
	}
</style>
