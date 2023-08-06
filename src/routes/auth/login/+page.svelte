<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import KeyIcon from '$lib/client/assets/icons/KeyIcon.svelte';
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import Input from '$lib/client/components/input/Input.svelte';
	import { toast } from '$lib/client/features/toaster/toast.svelte';
	import clsx from 'clsx';

	export let form;
	$: {
		if (browser && form?.status == 'success') {
			goto('/private/home');
		}
	}

	$: {
		if (browser && form?.status === 'failed' && form.apiError) {
			toast.error('Something went wrong! Try again');
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<form autocomplete="off" method="POST" class="flex flex-col items-center w-full max-w-sm">
	<div class="w-full mb-8">
		<Input
			name="username"
			label={'Username'}
			placeholder={'Enter your username'}
			error={form?.errors?.username}
			value={form?.values?.username}
		>
			<UserIcon slot="startAddon" />
		</Input>

		<Input
			name="password"
			type={'password'}
			label={'Password'}
			placeholder={'Enter your password'}
			error={form?.errors?.password}
			value={form?.values?.password}
		>
			<KeyIcon slot="startAddon" />
		</Input>
	</div>

	<Button class="mb-2">Login</Button>
	<span>
		You don't have an account yet? <a
			href="/auth/signup"
			class={clsx('cursor-pointer', 'text-blue-500 hover:text-blue-700')}>Sign-up.</a
		>
	</span>
</form>
