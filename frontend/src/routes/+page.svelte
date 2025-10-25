<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiRequest } from '$lib/assets/api';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';

	let login = $state('');
	let pass = $state('');

	let err = $state(false);

	const signup = async () => {
		await apiRequest('post', 'auth/signup', { login: login, password: pass }).then((res) => {
			localStorage.setItem('auth-token', res);
		});
	};

	const signin = async () => {
		await apiRequest('get', `auth/signin?login=${login}&password=${pass}`, {})
			.then((res) => {
				localStorage.setItem('auth-token', res);
				goto('/chat');
			})
			.catch(() => (err = true));
	};

	$effect(() => {
		login;
		pass;

		err = false;
	});
</script>

<div class="auth-page">
	<div class="auth-page_form">
		<p class="auth-page_logo">Auth</p>
		<div class="auth-page_inputs">
			<Input placeholder="login" bind:value={login} {err} />
			<Input placeholder="password" bind:value={pass} {err} />
		</div>
		<div class="auth-page_buttons">
			<Button label="Login" onclick={signin}></Button>
			<Button label="Register" onclick={signup}></Button>
		</div>
	</div>
</div>

<style>
	.auth-page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: var(--color-white);
	}

	.auth-page_form {
		width: 20%;
		height: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		min-width: 12rem;
		max-width: 16rem;
		min-height: 14rem;
	}

	.auth-page_logo {
		width: 100%;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
	}

	.auth-page_buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.auth-page_inputs {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
	}
</style>
