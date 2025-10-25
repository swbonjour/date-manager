<script lang="ts">
	const {
		label,
		onclick,
		size = 's'
	}: { label: string; onclick?: () => void; size?: 's' | 'm' | 'xl' } = $props();
</script>

<button onclick={onclick ? () => onclick() : () => {}} class={['btn', `btn-${size}`]}>
	{label.toUpperCase()}
</button>

<style>
	.btn {
		width: 5rem;
		height: 2rem;
		border: none;
		font-weight: 600;
		background-color: var(--color-black);
		color: var(--color-white);
		box-sizing: border-box;
		cursor: pointer;
	}

	.btn-s {
		width: 5rem;
		height: 2rem;
	}

	.btn-m {
		width: 8rem;
		height: 3rem;
	}

	.btn-xl {
		width: 10rem;
		height: 4rem;
	}

	.btn:active {
		border: 2px solid var(--color-white);
	}
</style>
