<script lang="ts">
	import Schedule from '$lib/components/home/schedule/schedule.svelte';
</script>

<div class="home">
	<Schedule></Schedule>
</div>

<style>
	.home {
		width: 100%;
		border-top-left-radius: 40px;
		background-color: var(--color-secondary);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
	}
</style>
