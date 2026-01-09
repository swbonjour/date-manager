<script lang="ts">
	import Signin from '$lib/components/auth/signin.svelte';
	import Signup from '$lib/components/auth/signup.svelte';
	import Logo from '$lib/icon/logo.svg?raw';

	let isSignin = $state(true);
</script>

<div class="bg-secondary flex h-screen w-screen items-center justify-center">
	<div
		class="bg-primary flex h-full w-full flex-col items-center justify-center shadow-xl md:h-3/4 md:w-3/7 md:rounded-2xl xl:w-1/3"
	>
		<div class="flex w-3/4 items-center pt-8 md:w-full md:pl-8">
			<div class="fill-neutral">{@html Logo}</div>
			<p class="text-neutral text-2xl font-bold">Schedly</p>
		</div>
		{#if isSignin}
			<Signin bind:isSignin />
		{:else}
			<Signup bind:isSignin />
		{/if}
	</div>
</div>
