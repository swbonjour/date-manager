<script lang="ts">
	import { DateTime } from 'luxon';
	import Input from '../common/input.svelte';
	import { emailRegexp } from '$lib/utils/helper';
	import { client } from '$lib/utils';

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

		await client.auth.authControllerSignUp({
			name: name,
			age: DateTime.fromISO(age).toISODate()!,
			email: email,
			password: password,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		});
	};
</script>

<div class="w-full flex-1 flex justify-center items-center flex-col gap-6">
	<div class="w-3/4 md:w-1/2 flex flex-col gap-8">
		<div>
			<p class="mb-2 font-medium">Имя</p>
			<Input inputAttributes={{ placeholder: 'Иван', maxlength: 35 }} bind:value={name} />
		</div>
		<div>
			<p class="mb-2 font-medium">Возраст</p>
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
			<p class="mb-2 font-medium">Электронная почта</p>
			<Input
				inputAttributes={{ placeholder: 'example@mail.ru', type: 'email', maxlength: 254 }}
				bind:value={email}
				bind:isErr={isErrEmail}
			/>
		</div>
		<div>
			<p class="mb-2 font-medium">Пароль</p>
			<Input inputAttributes={{ placeholder: '******', type: 'password' }} bind:value={password} />
		</div>
		<div>
			<p class="mb-2 font-medium">Подтверждение пароля</p>
			<Input
				inputAttributes={{ placeholder: '******', type: 'password' }}
				bind:value={passwordConfirm}
				bind:isErr={isErrPasswordConfirm}
			/>
		</div>

		<button
			class="h-12 bg-neutral rounded-lg text-primary text-lg font-medium cursor-pointer"
			onclick={signUp}>Зарегистрироваться</button
		>
		<div class="flex justify-center items-center flex-wrap gap-2">
			<p class="mb-2 font-medium">Уже есть аккаунт?</p>
			<button class="mb-2 text-accent font-medium cursor-pointer" onclick={changeToSignin}>
				Войти
			</button>
		</div>
	</div>
</div>
