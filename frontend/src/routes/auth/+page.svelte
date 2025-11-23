<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { client } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/user-store';
	import Logo from '$lib/icon/logo.svg?raw';
	import type { AuthSignInBadRequestResponse } from '$lib/utils/client';
	import type { AxiosError } from 'axios';

	let isSignIn = $state(true);

	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');

	let name = $state('');
	let age = $state('');

	let errEmail = $state(false);
	let errPassword = $state(false);
	let errPasswordConfirm = $state(false);

	let errName = $state(false);
	let errAge = $state(false);

	let isAgreed = $state(false);

	const signup = async () => {
		let isError = false;

		if (!name) {
			errName = true;
			isError = true;
		}

		if (!age) {
			errAge = true;
			isError = true;
		}

		if (!email) {
			errEmail = true;
			isError = true;
		}

		if (!password) {
			errPassword = true;
			isError = true;
		}

		if (!passwordConfirm || passwordConfirm !== password) {
			errPasswordConfirm = true;
			isError = true;
		}

		if (!isAgreed || isError) {
			return;
		}

		await client.auth
			.authControllerSignUp({ email: email, password: password, name: name, age: Number(age) })
			.then((res) => {
				initAndRedirect(res.authToken);
			})
			.catch(() => {});
	};

	const signin = async () => {
		await client.auth
			.authControllerSignIn({ email: email, password: password })
			.then((res) => {
				initAndRedirect(res.authToken);
			})
			.catch((res: AxiosError) => {
				const data: AuthSignInBadRequestResponse = res.response?.data as any;
				if (!data) {
					return;
				}
				if (data?.isEmail) {
					errEmail = true;
				}
				if (data?.isPassword) {
					errPassword = true;
				}
			});
	};

	const changeSignMethod = () => {
		isSignIn = !isSignIn;
	};

	const initAndRedirect = (authToken: string) => {
		localStorage.setItem('auth-token', authToken);
		$userStore.init();
		goto('/home');
	};

	$effect(() => {
		email;
		password;
	});
</script>

<div class="auth-page">
	<div class="auth-page_form">
		<p class="auth-page_form-logo">{@html Logo}Schedly</p>
		<div class={[isSignIn ? 'auth-page_form-inner-signin' : 'auth-page_form-inner-signup']}>
			<div class="auth-page_inputs">
				{#if isSignIn}
					<div class="auth-page_input">
						<p class="auth-page_input-text">Электронная почта</p>
						<Input
							placeholder="Email"
							bind:value={email}
							err={errEmail}
							errText="Введен некорректный email"
							size="m"
							type="email"
							maxTextLength={40}
						/>
					</div>
					<div class="auth-page_input">
						<p class="auth-page_input-text">Пароль</p>
						<Input
							placeholder="Пароль"
							bind:value={password}
							err={errPassword}
							errText="Введен некорректный пароль"
							size="m"
							maxTextLength={40}
						/>
					</div>
				{:else}
					<div class="auth-page_input">
						<p class="auth-page_input-text">Имя</p>
						<Input
							placeholder="Имя"
							bind:value={name}
							err={errName}
							errText="Введено некорректное имя"
							size="s"
						/>
					</div>
					<div class="auth-page_input">
						<p class="auth-page_input-text">Возраст</p>
						<Input
							placeholder="Возраст"
							bind:value={age}
							err={errAge}
							errText="Введен некорректный возраст"
							size="s"
							type="number"
							min={0}
							max={130}
						/>
					</div>
					<div class="auth-page_input">
						<p class="auth-page_input-text">Электронная почта</p>
						<Input
							placeholder="Email"
							bind:value={email}
							err={errEmail}
							errText="Введен некорректный email"
							size="s"
							type="email"
							maxTextLength={40}
						/>
					</div>
					<div class="auth-page_input">
						<p class="auth-page_input-text">Пароль</p>
						<Input
							placeholder="Пароль"
							bind:value={password}
							err={errPassword}
							errText="Введен некорректный пароль"
							size="s"
							maxTextLength={40}
						/>
					</div>
					<div class="auth-page_input">
						<p class="auth-page_input-text">Подтверждение пароля</p>
						<Input
							placeholder="Подтверждение пароля"
							bind:value={passwordConfirm}
							err={errPasswordConfirm}
							errText="Пароли не совпадают"
							size="s"
							maxTextLength={40}
						/>
					</div>
				{/if}
			</div>
			{#if isSignIn}
				<button class="auth-page_button-login" onclick={signin}>Войти</button>
			{:else}
				<div class="auth-page_agreement">
					<input
						class="auth-page_checkbox"
						type="checkbox"
						name="agreement"
						bind:checked={isAgreed}
					/>
					<p>
						Соглашаюсь на обработку моих персональных данных, с правилами пользования сайтом
						ипринимаю Пользовательское соглашение
					</p>
				</div>
				<button class="auth-page_button-login" onclick={signup}>Зарегистрироваться</button>
			{/if}
			<div class="auth-page_entrance">
				<div class="auth-page_entrance-sublabel">
					{#if isSignIn}
						<p class="auth-page_entrance-sublabel-text">Ещё нет аккаунта?</p>
						<p class="auth-page_entrance-sublabel-link" onclick={changeSignMethod}>
							Зарегистрироваться
						</p>
					{:else}
						<p class="auth-page_entrance-sublabel-text">Уже есть аккаунт?</p>
						<p class="auth-page_entrance-sublabel-link" onclick={changeSignMethod}>Войти</p>
					{/if}
				</div>
			</div>
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
		background-color: var(--color-secondary);
		color: var(--color-neutral);

		overflow: hidden;
	}

	.auth-page_form {
		width: 33%;
		height: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		background-color: var(--color-primary);
		border-radius: 24px;
		box-sizing: border-box;
	}

	.auth-page_form-logo {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: 700;
		font-size: 25px;
		margin-top: 1rem;
		margin-left: 2rem;
	}

	.auth-page_form-inner-signup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
		padding-bottom: 8rem;
		padding-top: 2rem;
	}

	.auth-page_form-inner-signin {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
		padding-bottom: 12rem;
	}

	.auth-page_entrance {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 60%;
	}

	.auth-page_entrance-label {
		font-weight: 800;
		font-size: 48px;
	}

	.auth-page_entrance-sublabel {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		font-weight: 300;
		font-size: 18px;
	}

	.auth-page_entrance-sublabel-link {
		color: var(--color-accent);
		cursor: pointer;
	}

	.auth-page_input {
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.auth-page_inputs {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		flex: 2;
		width: 100%;
	}

	.auth-page_input-text {
		font-weight: 500;
		font-size: 15px;
		color: var(--color-neutral);
		padding-bottom: 0.2rem;
		padding-left: 0.6rem;
	}

	.auth-page_button-login {
		width: 60%;
		background-color: var(--color-neutral);
		color: var(--color-primary);
		height: 3rem;
		border-radius: 10px;
		font-size: 20px;
		font-weight: 600;
		border: none;
		cursor: pointer;
	}

	.auth-page_agreement {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-align: start;
		font-weight: 400;
		font-size: 12px;
	}
</style>
