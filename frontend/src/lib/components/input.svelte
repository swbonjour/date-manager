<script lang="ts">
	import Warning from '$lib/icon/warning.svg?raw';

	let {
		placeholder,
		value = $bindable(),
		size = 's',
		border = false,
		err,
		errText
	}: {
		placeholder: string;
		value: string | number;
		size?: 's' | 'm' | 'xl';
		border?: boolean;
		err?: boolean;
		errText?: string;
	} = $props();
</script>

<div class="inp-div">
	<input
		{placeholder}
		bind:value
		class={['inp', `inp-${size}`, err ? `inp_err` : '', border ? 'inp-border' : '']}
	/>
	{#if err}
		<div class="err">
			<p class="err-text">{@html Warning} {errText}</p>
		</div>
	{/if}
</div>

<style>
	.inp-div {
		box-sizing: border-box;
		position: relative;
	}
	.err {
		position: absolute;
		background-color: var(--color-secondary);
		width: 100%;
		border-radius: 10px;
	}
	.err-text {
		padding-left: 0.4rem;
		color: var(--color-neutral);
	}
	.inp {
		border: 1px solid;
		border-color: #e5e5e5;
		border-radius: 10px;
		box-sizing: border-box;
		padding: 1rem;
		width: 100%;
	}

	.inp-border {
		border: 1px solid black;
	}

	.inp-s {
		height: 2rem;
	}

	.inp-m {
		height: 3rem;
	}

	.inp-xl {
		height: 6rem;
	}

	.inp:focus {
		outline: none;
	}
</style>
