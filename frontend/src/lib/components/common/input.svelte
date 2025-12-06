<script lang="ts">
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
</script>

<input
	{...inputAttributes}
	bind:value
	class={[
		'text-neutral w-full border-b outline-0 outline-transparent',
		isErr ? 'border-red-600' : ''
	]}
	oninput={() => {
		isErr = false;
		if (onInput) {
			onInput();
		}
	}}
/>
