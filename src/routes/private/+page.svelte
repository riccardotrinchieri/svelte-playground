<script lang="ts">
	import Button from '$lib/client/components/button/Button.svelte';

	const logout = () => {
		fetch('api/auth/logout', { method: 'POST', body: '' });
	};
</script>

<h1>APP</h1>
<Button on:click={logout}>Logout</Button>
