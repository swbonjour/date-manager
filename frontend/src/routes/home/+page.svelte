<script lang="ts">
	import Schedule from '$lib/components/home/schedule/schedule.svelte';
</script>

<div class="home">
	<div class="home_inner">
		<Schedule></Schedule>
	</div>
</div>

<style>
	.home {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-secondary);

		border-top-left-radius: 40px;
	}

	.home_inner {
		width: 100%;
		height: 90%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
