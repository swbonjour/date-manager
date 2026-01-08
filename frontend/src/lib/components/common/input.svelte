<script lang="ts">
	import { ThemesName } from '$lib/utils/themes';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		inputAttributes,
		onInput,
		value = $bindable(),
		isErr = $bindable()
	}: {
		inputAttributes: HTMLInputAttributes;
		value: any;
		onInput?: () => void;
		isErr?: boolean;
	} = $props();

	let isThemeDark = localStorage
		? localStorage.getItem('theme') === ThemesName.DARK
		: ThemesName.LIGHT;
</script>

<input
	{...inputAttributes}
	bind:value
	class={[
		'text-neutral w-full border-b outline-0 outline-transparent',
		isErr ? 'border-red-600' : '',
		isThemeDark ? 'input-c-dark' : ''
	]}
	oninput={() => {
		isErr = false;
		if (onInput) {
			onInput();
		}
	}}
/>

<style>
	.input-c-dark {
		color-scheme: dark;
	}
</style>
