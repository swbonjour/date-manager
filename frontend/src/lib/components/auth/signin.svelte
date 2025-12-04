<script lang="ts">
	import { client } from '$lib/utils';
	import { emailRegexp } from '$lib/utils/helper';
	import Input from '../common/input.svelte';

	let { isSignin = $bindable() } = $props();

	let email = $state('');
	let password = $state('');

	let isErrEmail = $state(false);
	let isErrPassword = $state(false);

	const changeToSignup = () => {
		isSignin = !isSignin;
	};

	const signIn = async () => {
		if (!email || !password) {
			return;
		}

		if (!emailRegexp.test(email)) {
			isErrEmail = true;
		}

		if (isErrEmail) {
			return;
		}

		await client.auth.authControllerSignIn({
			email: email,
			password: password
		});
	};
</script>

<div class="w-full flex-1 flex justify-center items-center flex-col gap-6">
	<div class="w-3/4 md:w-1/2 flex flex-col gap-12">
		<div>
			<p class="mb-2 font-medium">Электронная почта</p>
			<Input
				inputAttributes={{ placeholder: 'example@mail.ru', maxlength: 254 }}
				bind:value={email}
				bind:isErr={isErrEmail}
			/>
		</div>
		<div>
			<p class="mb-2 font-medium">Пароль</p>
			<Input
				inputAttributes={{ placeholder: '******', type: 'password' }}
				bind:value={password}
				bind:isErr={isErrPassword}
			/>
		</div>

		<button
			class="h-12 bg-neutral rounded-lg text-primary text-lg font-medium cursor-pointer"
			onclick={signIn}>Войти</button
		>
		<div class="flex justify-center items-center flex-wrap gap-2">
			<p class="mb-2 font-medium">Ещё нет аккаунта?</p>
			<button class="mb-2 text-accent font-medium cursor-pointer" onclick={changeToSignup}>
				Зарегистрироваться
			</button>
		</div>
	</div>
</div>
