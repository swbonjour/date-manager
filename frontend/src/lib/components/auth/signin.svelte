<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/user-store';
	import { client } from '$lib/utils';
	import { emailRegexp } from '$lib/utils/helper';
	import Input from '$lib/components/common/input.svelte';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { Settings } from 'luxon';

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

		const authData = await client.auth.authControllerSignIn({
			email: email,
			password: password
		});

		if (authData) {
			$userStore.init(authData.authToken);
			Settings.defaultLocale = 'ru';
			Settings.defaultZone = $userStore.timezone;
			$scheduleStore.init();
			goto('/home/schedule');
		}
	};
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center gap-6">
	<div class="flex w-3/4 flex-col gap-12 md:w-1/2">
		<div>
			<p class="text-neutral mb-2 font-medium">Электронная почта</p>
			<Input
				inputAttributes={{ placeholder: 'example@mail.ru', maxlength: 254 }}
				bind:value={email}
				bind:isErr={isErrEmail}
			/>
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium">Пароль</p>
			<Input
				inputAttributes={{ placeholder: '******', type: 'password' }}
				bind:value={password}
				bind:isErr={isErrPassword}
			/>
		</div>

		<button
			class="bg-neutral text-primary h-12 cursor-pointer rounded-lg text-lg font-medium"
			onclick={signIn}>Войти</button
		>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<p class="text-neutral mb-2 font-medium">Ещё нет аккаунта?</p>
			<button class="text-accent mb-2 cursor-pointer font-medium" onclick={changeToSignup}>
				Зарегистрироваться
			</button>
		</div>
	</div>
</div>
