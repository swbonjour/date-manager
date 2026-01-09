<script lang="ts">
	import { DateTime, Settings } from 'luxon';
	import Input from '$lib/components/common/input.svelte';
	import { emailRegexp, getFileSize } from '$lib/utils/helper';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import { goto } from '$app/navigation';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import imageCompression from 'browser-image-compression';

	let { isSignin = $bindable() } = $props();

	let name = $state('');
	let age = $state(DateTime.now().minus({ year: 18 }).toFormat('yyyy-dd-M'));
	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');

	let isErrEmail = $state(false);
	let isErrPasswordConfirm = $state(false);

	let isRegisterDataStageComplete = $state(false);

	let inputImgPreview = $state<string | null>(null);
	let inputFileElement: HTMLInputElement | undefined = $state();
	let imgFile = $state<File>();

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
			age: DateTime.fromFormat(age, 'y-MM-dd').toISODate()!,
			email: email,
			password: password,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			//@ts-ignore
			file: imgFile
		});

		if (authData) {
			$userStore.init(authData.authToken);
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
		}
	};

	const changeRegisterStage = () => {
		isRegisterDataStageComplete = !isRegisterDataStageComplete;
	};

	const handleInputImgChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;

		if (!target || !target.files?.length) {
			return;
		}

		const file = target.files[0];

		const fileSize = getFileSize(file);

		if (fileSize > 10) {
			return;
		}

		const reader = new FileReader();
		reader.onload = (r) => {
			if (r.target) {
				inputImgPreview = r.target.result as string;
			}
		};
		reader.readAsDataURL(file);

		const compressedFile = await imageCompression(file, {
			maxSizeMB: 1,
			maxWidthOrHeight: 300,
			useWebWorker: true,
			maxIteration: 10,
			initialQuality: 0.8
		});

		imgFile = compressedFile;
	};

	const triggerInputFile = () => {
		if (inputFileElement) {
			inputFileElement.click();
		}
	};
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center gap-6">
	<div class="flex w-3/4 flex-col items-center gap-8 md:w-1/2">
		{#if isRegisterDataStageComplete}
			<input
				type="file"
				bind:this={inputFileElement}
				class="hidden"
				onchange={(e) => handleInputImgChange(e)}
				accept="image/png, image/jpeg"
			/>
			{#if inputImgPreview}
				<button
					class="bg-secondary img-shadow relative h-60 w-60 cursor-pointer overflow-hidden rounded-full"
					onclick={triggerInputFile}
				>
					<img
						src={inputImgPreview}
						alt="preview"
						class="h-60 w-60 rounded-full object-cover"
						style="box-shadow: 76px 4px 8px 0px rgba(34, 60, 80, 0.2) inset"
					/>
				</button>
			{:else}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="bg-secondary img-shadow_select relative h-60 w-60 cursor-pointer overflow-hidden rounded-full transition-all duration-200"
					onclick={triggerInputFile}
				>
					<div class="bg-neutral absolute top-14 left-20 h-20 w-20 rounded-full"></div>
					<div class="bg-neutral absolute -bottom-2 left-15 h-25 w-30 rounded-full"></div>
				</button>
			{/if}
			<p class="text-neutral mb-2 font-medium">Выберите фото</p>
			<div class="flex w-full items-center justify-center gap-2">
				<button
					class="bg-neutral text-primary hover:bg-accent hover:text-neutral h-12 w-1/4 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200"
					onclick={changeRegisterStage}>Назад</button
				>
				<button
					class="bg-neutral text-primary hover:bg-accent hover:text-neutral h-12 w-3/4 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 xl:w-1/2"
					onclick={signUp}>Зарегистрироваться</button
				>
			</div>
		{:else}
			<div class="w-full">
				<p class="text-neutral mb-2 font-medium">Имя</p>
				<Input inputAttributes={{ placeholder: 'Иван', maxlength: 35 }} bind:value={name} />
			</div>
			<div class="w-full">
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
			<div class="w-full">
				<p class="text-neutral mb-2 font-medium">Электронная почта</p>
				<Input
					inputAttributes={{ placeholder: 'example@mail.ru', type: 'email', maxlength: 254 }}
					bind:value={email}
					bind:isErr={isErrEmail}
				/>
			</div>
			<div class="w-full">
				<p class="text-neutral mb-2 font-medium">Пароль</p>
				<Input
					inputAttributes={{ placeholder: '******', type: 'password' }}
					bind:value={password}
				/>
			</div>
			<div class="w-full">
				<p class="text-neutral mb-2 font-medium">Подтверждение пароля</p>
				<Input
					inputAttributes={{ placeholder: '******', type: 'password' }}
					bind:value={passwordConfirm}
					bind:isErr={isErrPasswordConfirm}
				/>
			</div>
			<button
				class="bg-neutral text-primary hover:bg-accent hover:text-neutral h-12 w-full cursor-pointer rounded-lg text-lg font-medium transition-all duration-200"
				onclick={changeRegisterStage}>Далее</button
			>
		{/if}
		<div class="flex flex-wrap items-center justify-center gap-2">
			<p class="text-neutral mb-2 font-medium">Уже есть аккаунт?</p>
			<button
				class="text-accent border-primary hover:border-accent mb-2 cursor-pointer border-b-2 font-medium transition-all duration-200 hover:border-b-2"
				onclick={changeToSignin}
			>
				Войти
			</button>
		</div>
	</div>
</div>

<style>
	.img-shadow {
		position: relative;
		display: inline-block;
	}

	.img-shadow::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: inset 0 0 0 0 transparent; /* Начальное состояние - прозрачная тень */
		-moz-box-shadow: inset 0 0 0 0 transparent;
		-webkit-box-shadow: inset 0 0 0 0 transparent;
		transition: box-shadow 0.2s ease-out; /* Анимируем только box-shadow */
		pointer-events: none; /* Чтобы не мешало кликам */
		border-radius: inherit; /* Если нужны скругленные углы */
	}

	.img-shadow:hover::before {
		box-shadow: inset 0 0 12px var(--color-primary);
		-moz-box-shadow: inset 0 0 12px var(--color-primary);
		-webkit-box-shadow: inset 0 0 12px var(--color-primary);
	}

	.img-shadow_select {
		box-shadow: inset 0 0 0 0 transparent;
	}

	.img-shadow_select:hover {
		box-shadow: inset 0 0 12px var(--color-primary);
		-moz-box-shadow: inset 0 0 12px var(--color-primary);
		-webkit-box-shadow: inset 0 0 12px var(--color-primary);
	}
</style>
