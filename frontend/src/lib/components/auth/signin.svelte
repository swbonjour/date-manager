<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/user-store';
	import { client } from '$lib/utils';
	import { emailRegexp } from '$lib/utils/helper';
	import Input from '$lib/components/common/input.svelte';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { Settings } from 'luxon';
	import type { AuthSignInBadRequestResponse } from '$lib/utils/client';
	import type { AxiosError, AxiosResponse } from 'axios';

	let { isSignin = $bindable() } = $props();

	let email = $state('');
	let password = $state('');

	let isErrEmail = $state(false);
	let isErrPassword = $state(false);

	const changeToSignup = () => {
		isSignin = !isSignin;
	};

	const checkSignInData = () => {
		let isError = false;

		if (!email) {
			isError = true;
		}

		if(!password) {
			isErrPassword = true;
		}

		if (!emailRegexp.test(email)) {
			isErrEmail = true;
			isError = true;
		}

		return !isError;
	}

	const signIn = async () => {
		const isSignInDataCorrect = checkSignInData();
		if(!isSignInDataCorrect) {
			return;
		}

		await client.auth.authControllerSignIn({
			email: email,
			password: password
		}).then(async (res) => {
			$userStore.init(res.authToken);
			Settings.defaultLocale = 'ru';
			Settings.defaultZone = $userStore.timezone;
			$scheduleStore.init();
			window.addEventListener('resize', () => {
				const isItemsOpen = window.innerWidth > 768;

				scheduleStore.update((s) => ({
					...s,
					isTasksOpen: isItemsOpen,
					isDashboardOpen: isItemsOpen
				}));
			});
			if ($userStore.id) {
				await $userStore.getProfileImg();
			}
			goto('/home/schedule');
		}).catch((res: AxiosError<AuthSignInBadRequestResponse>) => {
			const resData = res.response?.data;

			if(!resData) {
				return;
			}

			if(resData.isEmail) {
				isErrEmail = true;
				return;
			}

			if(resData.isPassword) {
				isErrPassword = true;
				return;
			}
		});
	};
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center gap-6">
	<div class="flex w-3/4 flex-col gap-12 md:w-2/3">
		<div>
			<p class="text-neutral mb-2 font-medium text-lg">Электронная почта</p>
			<Input
				inputAttributes={{ placeholder: 'example@mail.ru', maxlength: 254 }}
				bind:value={email}
				bind:isErr={isErrEmail}
			/>
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium text-lg">Пароль</p>
			<Input
				inputAttributes={{ placeholder: '******', type: 'password' }}
				bind:value={password}
				bind:isErr={isErrPassword}
			/>
		</div>

		{#if isErrEmail || isErrPassword}
		<p class="text-lg text-neutral text-center">{isErrEmail ? 'Аккаунт не существует' : isErrPassword ? 'Неверный пароль' : ''}</p>
		{:else}
		<button
			class="bg-neutral text-primary hover:bg-accent hover:text-neutral h-12
			cursor-pointer rounded-lg text-lg font-medium transition-all duration-200"
			onclick={signIn}>Войти</button
		>
		{/if}
		<div class="flex flex-wrap items-center justify-center gap-2">
			<p class="text-neutral mb-2 font-medium text-lg">Ещё нет аккаунта?</p>
			<button
				class="text-accent border-primary hover:border-b-accent mb-2 cursor-pointer border-b-2 font-medium transition-all duration-200 hover:border-b-2 text-lg"
				onclick={changeToSignup}
			>
				Зарегистрироваться
			</button>
		</div>
	</div>
</div>
