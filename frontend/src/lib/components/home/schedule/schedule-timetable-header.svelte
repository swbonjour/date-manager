<script lang="ts">
	import CalendarIcon from '$lib/icon/calendar.svg?raw';
	import LeftArrow from '$lib/icon/left-arrow.svg?raw';
	import RightArrow from '$lib/icon/right-arrow.svg?raw';
	import Calendar from '$lib/components/common/calendar.svelte';
	import { onMount } from 'svelte';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { DateTime, Duration } from 'luxon';

	let currentDate = $state(DateTime.now());

	const scrollDate = (side: 'right' | 'left') => {
		if (side === 'right') {
			currentDate = currentDate.plus(Duration.fromObject({ day: 1 }));
		} else {
			currentDate = currentDate.minus(Duration.fromObject({ day: 1 }));
		}
	};

	onMount(() => {
		scheduleStore.update(() => ({ date: currentDate }));
	});
</script>

<div class="schedule-header">
	<div class="schedule-header_datepicker">
		<button class="schedule-header_datepicker-left-arrow" onclick={() => scrollDate('left')}
			>{@html LeftArrow}</button
		>
		<p class="schedule-header_datepicker-date">{currentDate.toFormat('dd MMMM y')}</p>
		<Calendar bind:currentDate></Calendar>
		<button class="schedule-header_datepicker-right-arrow" onclick={() => scrollDate('right')}
			>{@html RightArrow}</button
		>
	</div>
</div>

<style>
	.schedule-header {
		width: 100%;
		min-height: 4rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		background-color: var(--color-primary);

		border-radius: 20px;
	}

	.schedule-header_datepicker {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		margin-left: 1rem;
	}

	.schedule-header_datepicker-date {
		font-size: 24px;
		font-weight: 600;
	}

	.schedule-header_datepicker-left-arrow,
	.schedule-header_datepicker-right-arrow {
		width: 2rem;
		height: 2rem;

		background-color: var(--color-secondary);
		fill: var(--color-accent);

		border: none;
		border-radius: 5px;

		cursor: pointer;
	}
</style>
