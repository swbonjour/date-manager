<script lang="ts">
	import { scheduleStore } from '$lib/stores/schedule-store';
	import RightArrow from '$lib/icon/right-arrow.svg?raw';
	import LeftArrow from '$lib/icon/left-arrow.svg?raw';
	import Calendar from '$lib/components/common/calendar.svelte';

	const scrollDate = (side: 'left' | 'right') => {
		scheduleStore.update((s) => ({
			...s,
			date: side === 'right' ? s.date.plus({ day: 1 }) : s.date.minus({ day: 1 })
		}));
	};
</script>

<div class="flex h-full w-full flex-col gap-4 md:w-1/2 md:gap-4">
	<div
		class="bg-primary flex min-h-14 w-full items-center justify-center rounded-br-xl rounded-bl-xl md:justify-between md:rounded-xl md:pl-8"
	>
		<div class="text-neutral flex w-fit items-center justify-between gap-4">
			<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('left')}
				>{@html LeftArrow}</button
			>
			<div class="flex w-48 items-center justify-center gap-4">
				<p class="text-lg font-semibold">{$scheduleStore.date.toFormat('dd MMMM yyyy')}</p>
				<Calendar bind:dateToUpdate={$scheduleStore.date} />
			</div>
			<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('right')}
				>{@html RightArrow}</button
			>
		</div>
	</div>
	<div
		class="bg-primary min-h-0 w-full flex-1 flex-col rounded-tl-xl rounded-tr-xl p-8 md:rounded-xl"
	>
		<div class="flex h-16 w-full items-center justify-between gap-4">
			<div class="relative flex w-20 text-sm">
				<p class="text-secondary_contrast absolute top-0 xl:left-0">час</p>
				<div class="bg-secondary_contrast absolute h-0.5 w-12 rotate-30"></div>
				<p class="text-secondary_contrast absolute -top-5 right-2 md:right-0 lg:right-2 xl:right-4">
					мин
				</p>
			</div>
			<div class="mr-2 flex w-full items-center justify-between text-lg md:mr-12">
				<p class="text-secondary_contrast font-semibold">0</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">20</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">30</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">40</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">50</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">60</p>
			</div>
		</div>
		<div class="scrollbar h-7/8 w-full overflow-y-scroll">
			<div class="flex flex-col gap-6">
				{#each { length: 24 }, row}
					<div class="flex items-center justify-center gap-4">
						<p class="text-neutral w-20 text-lg font-semibold">{`${row + 1}:00`}</p>
						<div class="bg-accent mr-2 h-8 w-full rounded-md md:mr-8"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar::-webkit-scrollbar {
		width: 1rem;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
		background: var(--color-secondary);
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: var(--color-neutral);
		border-radius: 20px;
	}

	@media (width < 48rem) {
		.scrollbar::-webkit-scrollbar {
			width: 0.2rem;
		}

		.scrollbar::-webkit-scrollbar-track {
			border-radius: 100vh;
			background: var(--color-secondary);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			background: var(--color-neutral);
			border-radius: 20px;
		}
	}
</style>
