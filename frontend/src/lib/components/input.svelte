<script lang="ts">
	let {
		placeholder,
		value = $bindable(),
		size = 's',
		border = false,
		err
	}: {
		placeholder: string;
		value: string | number;
		size?: 's' | 'm' | 'xl';
		border?: boolean;
		err?: boolean;
	} = $props();
</script>

<input
	{placeholder}
	bind:value
	class={['inp', `inp-${size}`, err ? `inp_err` : '', border ? 'inp-border' : '']}
/>

<style>
	.inp {
		border: none;
		box-sizing: border-box;
		padding: 1rem;
	}

	.inp-border {
		border: 1px solid black;
	}

	.inp-s {
		height: 2rem;
	}

	.inp-m {
		height: 4rem;
	}

	.inp-xl {
		height: 6rem;
	}

	.inp:focus {
		outline: none;
	}

	.inp_err {
		box-shadow: 0px -8px 18px -5px rgba(221, 8, 83, 0.6) inset;
	}
</style>
