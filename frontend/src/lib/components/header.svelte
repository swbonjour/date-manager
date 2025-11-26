<script lang="ts">
	import Logo from '$lib/icon/logo.svg?raw';
</script>

<div class="header">
	<p class="header_logo">{@html Logo}</p>
</div>

<style>
	.header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100wh;
		min-height: 4rem;
		background-color: var(--color-primary);
	}

	.header_logo {
		width: 6rem;

		display: flex;
		justify-content: center;
		align-items: center;

		fill: var(--color-neutral);
	}
</style>
