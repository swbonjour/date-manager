<script lang="ts">
	import Signin from '$lib/components/auth/signin.svelte';
	import Signup from '$lib/components/auth/signup.svelte';
	import Logo from '$lib/icon/logo.svg?raw';

	let isSignin = $state(true);
</script>

<div class="w-screen h-screen flex justify-center items-center bg-secondary">
	<div
		class="w-full h-full md:w-1/3 md:h-3/4 flex justify-center items-center flex-col bg-primary shadow-xl rounded-2xl"
	>
		<div class="w-full flex items-center pl-8 pt-8">
			<div>{@html Logo}</div>
			<p class="text-2xl font-bold">Schedly</p>
		</div>
		{#if isSignin}
			<Signin bind:isSignin />
		{:else}
			<Signup bind:isSignin />
		{/if}
	</div>
</div>
