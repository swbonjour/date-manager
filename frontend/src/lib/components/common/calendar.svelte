<script lang="ts">
	import LeftArrow from '$lib/icon/left-arrow.svg?raw';
	import RightArrow from '$lib/icon/right-arrow.svg?raw';
	import CalendarIcon from '$lib/icon/calendar.svg?raw';
	import { capitalizeFirstLetter } from '$lib/utils/helper';
	import dayjs from 'dayjs';

	let { currentDate = $bindable() }: { currentDate: dayjs.Dayjs } = $props();

	let isOpen = $state(false);

	let currentMonth = $state(currentDate.startOf('M'));

	const getMonthDays = () => {
		return Array.from(
			Array(dayjs(currentMonth).daysInMonth())
				.keys()
				.map((item) => item + 1)
		);
	};

	let daysInCurrentMonth = $state(getMonthDays());

	const scrollMonth = (side: 'left' | 'right') => {
		if (side === 'left') {
			currentMonth = currentMonth.subtract(1, 'M');
		} else {
			currentMonth = currentMonth.add(1, 'M');
		}
		daysInCurrentMonth = getMonthDays();
	};

	const selectDate = (date: dayjs.Dayjs) => {
		currentDate = date;
	};

	const openCalendar = () => {
		isOpen = !isOpen;
	};
</script>

{#if !isOpen}
	<button class="calendar_btn" onclick={() => openCalendar()}>{@html CalendarIcon}</button>
{:else}
	<div class="calendar_wrapper">
		<button class="calendar_btn" onclick={() => openCalendar()}>{@html CalendarIcon}</button>
		<div class="calendar">
			<div class="calendar_header">
				<div class="calendar_header-select">
					<div class="calendar_header-select-date">
						{capitalizeFirstLetter(currentMonth.format('MMMM YYYY'))}
					</div>

					<div class="calendar_header-select-date-scroll">
						<button
							class="calendar_header-select-date-scroll_left-arrow"
							onclick={() => scrollMonth('left')}>{@html LeftArrow}</button
						>
						<button
							class="calendar_header-select-date-scroll_right-arrow"
							onclick={() => scrollMonth('right')}>{@html RightArrow}</button
						>
					</div>
				</div>

				<div class="calendar_header-weekdays">
					<p class="calendar_header-weekdays-day">Пн</p>
					<p class="calendar_header-weekdays-day">Вт</p>
					<p class="calendar_header-weekdays-day">Ср</p>
					<p class="calendar_header-weekdays-day">Чт</p>
					<p class="calendar_header-weekdays-day">Пт</p>
					<p class="calendar_header-weekdays-day">Сб</p>
					<p class="calendar_header-weekdays-day">Вс</p>
				</div>
			</div>

			<div class="calendar_days">
				{#each daysInCurrentMonth as day}
					{#if day === currentMonth.date()}
						<button
							class={['calendar_days-day', `calendar_days-day-start-${currentMonth.day()}`]}
							onclick={() => selectDate(currentMonth.clone().date(day))}
						>
							{day}
						</button>
					{:else}
						<button
							class="calendar_days-day"
							onclick={() => selectDate(currentMonth.clone().date(day))}>{day}</button
						>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.calendar_wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		position: relative;
	}

	.calendar_btn {
		background-color: var(--color-primary);

		outline: none;
		border: none;

		cursor: pointer;
	}

	.calendar {
		background-color: var(--color-primary);

		border-radius: 20px;

		z-index: 9;

		overflow: hidden;

		position: absolute;

		top: 2rem;
	}

	.calendar_header {
		width: 100%;

		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		flex-direction: column;

		border-bottom: 1px solid var(--color-secondary);

		padding-top: 1rem;
	}

	.calendar_header-select {
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-right: 1rem;
		margin-bottom: 1rem;
	}

	.calendar_header-select-date {
		font-size: 20px;
		font-weight: 700;

		color: var(--color-accent);

		padding-left: 0.8rem;
	}

	.calendar_header-select-date-scroll {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.calendar_header-select-date-scroll_left-arrow,
	.calendar_header-select-date-scroll_right-arrow {
		background-color: var(--color-primary);
		fill: var(--color-accent);

		outline: none;
		border: none;

		cursor: pointer;
	}

	.calendar_header-weekdays {
		width: 100%;

		display: flex;
		justify-content: space-around;
		align-items: center;

		font-size: 16px;
		font-weight: 700;

		padding-bottom: 1rem;
	}

	.calendar_days {
		display: grid;
		grid-template-columns: repeat(7, 3rem);
		grid-auto-rows: 3rem;

		background-color: var(--color-primary);

		border-radius: 20px;
	}

	.calendar_days-day {
		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-primary);

		outline: none;
		border: none;
	}

	.calendar_days-day-start-1 {
		grid-column-start: 1;
	}

	.calendar_days-day-start-2 {
		grid-column-start: 2;
	}

	.calendar_days-day-start-3 {
		grid-column-start: 3;
	}

	.calendar_days-day-start-4 {
		grid-column-start: 4;
	}

	.calendar_days-day-start-5 {
		grid-column-start: 5;
	}

	.calendar_days-day-start-6 {
		grid-column-start: 6;
	}

	.calendar_days-day-start-0 {
		grid-column-start: 7;
	}

	.calendar_days-day:hover {
		background-color: var(--color-secondary);

		cursor: pointer;
	}
</style>
