<script lang="ts">
	import Logo from '$lib/icon/logo.svg?raw';
</script>

<div class="w-screen h-screen flex justify-center items-center bg-secondary">
	<div
		class="w-1/3 h-3/4 flex justify-center items-center flex-col bg-primary shadow-xl rounded-2xl"
	>
		<div class="w-full flex items-center pl-8 pt-8">
			<div>{@html Logo}</div>
			<p class="text-2xl font-bold">Schedly</p>
		</div>
		<div class="w-full flex-1 flex justify-center items-center flex-col gap-6">
			<div class="w-1/2 flex flex-col gap-12">
				<div>
					<p class="mb-2 font-medium">Электронная почта</p>
					<input placeholder="example@mail.ru" class="w-full outline-transparent border-b-1" />
				</div>
				<div>
					<p class="mb-2 font-medium">Пароль</p>
					<input placeholder="******" class="w-full outline-transparent border-b-1" />
				</div>

				<button class="h-12 bg-neutral rounded-lg text-primary text-lg font-medium cursor-pointer"
					>Войти</button
				>
				<div class="flex justify-center items-center flex-wrap gap-2">
					<p class="mb-2 font-medium">Ещё нет аккаунта?</p>
					<p class="mb-2 text-accent font-medium cursor-pointer">Зарегистрироваться</p>
				</div>
			</div>
		</div>
	</div>
</div>
