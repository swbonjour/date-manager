<script lang="ts">
	import { ThemesName } from '$lib/utils/themes';
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		inputAttributes,
		onInput,
		value = $bindable(),
		isErr = $bindable(),
		inputElement = $bindable(),
		cssClass
	}: {
		inputAttributes: HTMLInputAttributes;
		value: any;
		onInput?: () => void;
		isErr?: boolean;
		inputElement?: any;
		cssClass?: string;
	} = $props();

	let isThemeDark = $state(ThemesName.LIGHT);

	onMount(() => {
		isThemeDark = localStorage.getItem('theme')
			? (localStorage.getItem('theme') as ThemesName)
			: ThemesName.LIGHT;
	});
</script>

<input
	{...inputAttributes}
	bind:value
	class={[
		'text-neutral w-full border-b outline-0 outline-transparent',
		isErr ? 'border-red-600' : '',
		isThemeDark ? 'input-c-dark' : '',
		cssClass
	]}
	oninput={() => {
		isErr = false;
		if (onInput) {
			onInput();
		}
	}}
	bind:this={inputElement}
/>

<style>
	.input-c-dark {
		color-scheme: dark;
	}
</style>
