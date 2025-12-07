<script lang="ts">
	import CalendarIcon from '$lib/icon/calendar.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { capitalizeFirstLetter } from '$lib/utils/helper';
	import { DateTime } from 'luxon';
	import LeftArrow from '$lib/icon/left-arrow.svg?raw';
	import RightArrow from '$lib/icon/right-arrow.svg?raw';

	let { dateToUpdate = $bindable() }: { dateToUpdate: DateTime<true> } = $props();

	let isCalendarOpen = $state(false);

	let calendarDate = $state(dateToUpdate);
	const daysInMonth = $derived(calendarDate.daysInMonth);

	let daysToAddToStart = $state(0);
	let daysToAddToEnd = $state(0);

	const daysInTotal = 42;

	let previousMonthDate = $derived(calendarDate.minus({ month: 1 }));
	let nextMonthDate = $derived(calendarDate.plus({ month: 1 }));

	const calcDaysIfFirstDayIsNotMonday = () => {
		const startOfMonthDay = calendarDate.startOf('month').weekday;
		let daysToAddToStart = 0;
		if (startOfMonthDay !== 1) {
			daysToAddToStart = startOfMonthDay - 1;
		} else {
			daysToAddToStart = 0;
		}

		return daysToAddToStart;
	};

	const calcDaysIfLastDayIsNotSunday = () => {
		const endOfMonthDay = calendarDate.endOf('month').weekday;
		let daysToAddToEnd = 0;
		if (endOfMonthDay !== 7) {
			daysToAddToEnd = 7 - endOfMonthDay;
		} else {
			daysToAddToEnd = 0;
		}

		const daysSum = daysToAddToStart + daysToAddToEnd + daysInMonth;
		if (daysSum !== daysInTotal) {
			daysToAddToEnd += daysInTotal - daysSum;
		}

		return daysToAddToEnd;
	};

	const toggleCalendar = () => {
		isCalendarOpen = !isCalendarOpen;
		calendarDate = $scheduleStore.date;
	};

	const scrollDate = (side: 'left' | 'right') => {
		const newDate =
			side === 'right' ? calendarDate.plus({ month: 1 }) : calendarDate.minus({ month: 1 });
		calendarDate = newDate;
	};

	const selectDate = (date: DateTime) => {
		dateToUpdate = date;
		toggleCalendar();
	};

	$effect(() => {
		calendarDate;

		daysToAddToStart = calcDaysIfFirstDayIsNotMonday();
		daysToAddToEnd = calcDaysIfLastDayIsNotSunday();
	});
</script>

{#if isCalendarOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-primary absolute top-0 left-0 z-10 h-screen w-screen transition-all md:opacity-0"
		onclick={toggleCalendar}
	></div>
{/if}
<div class="flex items-center justify-center md:relative">
	<button class="fill-neutral hover:cursor-pointer" onclick={toggleCalendar}
		>{@html CalendarIcon}</button
	>
	{#if isCalendarOpen}
		<div
			class="bg-primary md:shadow-neutral absolute top-1/2 left-1/2 z-20 w-screen -translate-x-1/2 -translate-y-1/2 transform rounded-xl p-4 pt-2 md:top-full md:-left-32 md:mt-2 md:w-70 md:translate-x-0 md:translate-y-0 md:shadow-md"
		>
			<div class="flex h-12 items-center justify-between pl-2">
				<p class="text-lg font-semibold">{calendarDate.toFormat('LLLL yyyy')}</p>
				<div class="flex w-1/4 items-center justify-between">
					<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('left')}
						>{@html LeftArrow}</button
					>
					<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('right')}
						>{@html RightArrow}</button
					>
				</div>
			</div>
			<div class="grid grid-cols-7 grid-rows-6 gap-2">
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 1 }).toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 2 }).toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 3 }).toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 4 }).toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 5 }).toFormat('EEE'))}
				</div>
				<div
					class="text-neutral flex h-8 w-8 items-center justify-center text-center text-xs font-semibold"
				>
					{capitalizeFirstLetter(calendarDate.startOf('week').plus({ day: 6 }).toFormat('EEE'))}
				</div>
				{#each { length: daysToAddToStart }, day}
					<button
						class="text-secondary_contrast hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-md text-sm transition-all hover:cursor-pointer"
						onclick={() =>
							selectDate(
								DateTime.fromObject({
									year: previousMonthDate.year,
									month: previousMonthDate.month,
									day: previousMonthDate.daysInMonth + day - daysToAddToStart + 1
								})
							)}
						>{previousMonthDate.endOf('month').plus({ day: day - daysToAddToStart + 1 })
							.day}</button
					>
				{/each}
				{#each { length: daysInMonth }, day}
					<button
						class="text-neutral hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-md text-sm transition-all hover:cursor-pointer"
						onclick={() =>
							selectDate(
								DateTime.fromObject({
									year: calendarDate.year,
									month: calendarDate.month,
									day: day + 1
								})
							)}>{day + 1}</button
					>
				{/each}
				{#each { length: daysToAddToEnd }, day}
					<button
						class="text-secondary_contrast hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-md text-sm transition-all hover:cursor-pointer"
						onclick={() =>
							selectDate(
								DateTime.fromObject({
									year: nextMonthDate.year,
									month: nextMonthDate.month,
									day: day + 1
								})
							)}>{day + 1}</button
					>
				{/each}
			</div>
		</div>
	{/if}
</div>
