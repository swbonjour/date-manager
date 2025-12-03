<script lang="ts">
	import Schedule from '$lib/components/home/schedule/schedule.svelte';
</script>

<div class="home">
	<Schedule></Schedule>
</div>

<style>
	.home {
		width: 100%;
		height: 100%;

		max-width: 100%;
		max-height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-secondary);

		border-top-left-radius: 40px;
	}
</style>
