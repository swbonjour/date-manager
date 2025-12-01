<script lang="ts">
	import Warning from '$lib/icon/warning.svg?raw';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let {
		placeholder,
		value = $bindable(),
		size = 's',
		border = false,
		err,
		errText,
		type,
		min,
		max,
		minTextLength = 0,
		maxTextLength = 20,
		onInputCustom,
		errPosition = 'bottom'
	}: {
		placeholder: string;
		value: string | number;
		size?: 's' | 'm' | 'xl';
		border?: boolean;
		err?: boolean;
		errText?: string;
		type?: HTMLInputTypeAttribute;
		min?: number;
		max?: number;
		minTextLength?: number;
		maxTextLength?: number;
		onInputCustom?: () => void;
		errPosition?: 'bottom' | 'right';
	} = $props();

	let isInfo = $state(false);
	let infoText = $state('');

	const infoLimitNumValue = () => {
		if (type !== 'number') {
			return;
		}

		let isErr = false;

		if (min !== undefined && Number(value) < min) {
			value = min;
			isErr = true;
		}

		if (max !== undefined && Number(value) > max) {
			value = max;
			isErr = true;
		}

		if (isErr) {
			isInfo = true;
			infoText = `Минимальное значение: ${min} Максимальное значение: ${max}`;
		} else {
			isInfo = false;
		}
	};

	const infoMinMaxTextLengthReached = () => {
		if (String(value).length <= minTextLength || String(value).length >= maxTextLength) {
			isInfo = true;
			infoText = `Минимальная длина: ${minTextLength} Максимальная длина: ${maxTextLength}`;
		} else {
			isInfo = false;
		}
	};

	const infoIncorrectEmail = () => {
		const emailRegexp =
			/^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

		const isCorrect = emailRegexp.test(String(value));

		if (!isCorrect) {
			isInfo = true;
			infoText = 'Email некорректный: **@**.**';
		} else {
			isInfo = false;
		}
	};

	const onInput = () => {
		if (onInputCustom) {
			return () => {
				onInputCustom();
			};
		}

		switch (type) {
			case 'number':
				return () => {
					infoLimitNumValue();
				};
			case 'email':
				return () => {
					infoIncorrectEmail();
				};
			default: {
				return () => {
					infoMinMaxTextLengthReached();
				};
			}
		}
	};
</script>

<div class="inp-div">
	<input
		{placeholder}
		bind:value
		class={['inp', `inp-${size}`, err ? `inp_err` : '', border ? 'inp-border' : '']}
		{type}
		oninput={onInput()}
		minlength={minTextLength}
		maxlength={maxTextLength}
	/>
	{#if err}
		<div class={['err', errPosition === 'right' ? 'err-right' : '']}>
			<p class="err-text">{@html Warning} {errText}</p>
		</div>
	{/if}

	{#if isInfo}
		<div class="info">
			<p class="info-text">{infoText}</p>
		</div>
	{/if}
</div>

<style>
	.inp-div {
		box-sizing: border-box;
		position: relative;
	}
	.info,
	.err {
		position: absolute;
		background-color: var(--color-secondary);
		width: 100%;
		border-radius: 10px;
	}
	.err-right {
		right: -200%;
		bottom: 0%;
		width: 12rem;
	}
	.info-text,
	.err-text {
		padding-left: 0.4rem;
		color: var(--color-neutral);
	}
	.inp {
		width: 100%;

		background-color: var(--color-secondary);

		border: 1px solid;
		border-color: #e5e5e5;
		border-radius: 10px;

		color: var(--color-neutral);

		padding: 1rem;
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
