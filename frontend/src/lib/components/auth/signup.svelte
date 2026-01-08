<script lang="ts">
	import { DateTime, Settings } from 'luxon';
	import Input from '$lib/components/common/input.svelte';
	import { emailRegexp } from '$lib/utils/helper';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import { goto } from '$app/navigation';
	import { scheduleStore } from '$lib/stores/schedule-store';

	let { isSignin = $bindable() } = $props();

	let name = $state('');
	let age = $state(DateTime.now().minus({ year: 18 }).toFormat('yyyy-dd-M'));
	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');

	let isErrEmail = $state(false);
	let isErrPasswordConfirm = $state(false);

	const changeToSignin = () => {
		isSignin = !isSignin;
	};

	const signUp = async () => {
		if (!name || !age || !email || !password || !passwordConfirm) {
			return;
		}

		if (!emailRegexp.test(email)) {
			isErrEmail = true;
		}

		if (password !== passwordConfirm) {
			isErrPasswordConfirm = true;
		}

		if (isErrEmail || isErrPasswordConfirm) {
			return;
		}

		const authData = await client.auth.authControllerSignUp({
			name: name,
			age: DateTime.fromISO(age).toISODate()!,
			email: email,
			password: password,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		});

		if (authData) {
			$userStore.init(authData.authToken);
			Settings.defaultLocale = 'ru';
			Settings.defaultZone = $userStore.timezone;
			$scheduleStore.init();
			window.addEventListener('resize', () => {
				const isTasksOpen = window.innerWidth > 768;

				scheduleStore.update((s) => ({
					...s,
					isTasksOpen: isTasksOpen
				}));
			});
			goto('/home/schedule');
		}
	};
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center gap-6">
	<div class="flex w-3/4 flex-col gap-8 md:w-1/2">
		<div>
			<p class="text-neutral mb-2 font-medium">Имя</p>
			<Input inputAttributes={{ placeholder: 'Иван', maxlength: 35 }} bind:value={name} />
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium">Возраст</p>
			<Input
				inputAttributes={{
					type: 'date',
					min: DateTime.now().minus({ year: 99 }).toFormat('yyyy-dd-M'),
					max: DateTime.now().minus({ year: 18 }).toFormat('yyyy-dd-M')
				}}
				bind:value={age}
			/>
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium">Электронная почта</p>
			<Input
				inputAttributes={{ placeholder: 'example@mail.ru', type: 'email', maxlength: 254 }}
				bind:value={email}
				bind:isErr={isErrEmail}
			/>
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium">Пароль</p>
			<Input inputAttributes={{ placeholder: '******', type: 'password' }} bind:value={password} />
		</div>
		<div>
			<p class="text-neutral mb-2 font-medium">Подтверждение пароля</p>
			<Input
				inputAttributes={{ placeholder: '******', type: 'password' }}
				bind:value={passwordConfirm}
				bind:isErr={isErrPasswordConfirm}
			/>
		</div>

		<button
			class="bg-neutral text-primary h-12 cursor-pointer rounded-lg text-lg font-medium"
			onclick={signUp}>Зарегистрироваться</button
		>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<p class="text-neutral mb-2 font-medium">Уже есть аккаунт?</p>
			<button class="text-accent mb-2 cursor-pointer font-medium" onclick={changeToSignin}>
				Войти
			</button>
		</div>
	</div>
</div>
