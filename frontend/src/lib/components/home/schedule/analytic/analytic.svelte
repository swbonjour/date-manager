<script lang="ts">
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { userStore } from '$lib/stores/user-store';
	import { client } from '$lib/utils';
	import Plus from '$lib/icon/plus.svg?raw';

	let currentDate = $state($scheduleStore.date);
	let isAnalyticsInitialized = $state(false);

	const scheduleBusyPercent = $derived(
		Math.round(($scheduleStore.scheduleBusyMinutes / (24 * 60)) * 100)
	);
	const scheduleUnbusyPercent = $derived(100 - scheduleBusyPercent);

	const toggleDashboard = () => {
		$scheduleStore.isDashboardOpen = !$scheduleStore.isDashboardOpen;
	};

	$effect(() => {
		$scheduleStore.date;
		if (!$userStore.id) {
			return;
		}
		if (
			currentDate.toFormat('dd-MM-y') !== $scheduleStore.date.toFormat('dd-MM-y') ||
			!isAnalyticsInitialized
		) {
			client.analytic
				.analyticControllerGetScheduleBusyAnalytic({ date: $scheduleStore.date.toISODate() })
				.then((res) => {
					$scheduleStore.scheduleBusyMinutes = res.schedule_busy_minutes || 0;
				});
			isAnalyticsInitialized = true;
			currentDate = $scheduleStore.date;
		}
	});
</script>

{#if $scheduleStore.isDashboardOpen}
	<div
		class="bg-primary z-20 flex h-screen w-screen flex-col items-center justify-center gap-4 self-start rounded-xl pt-4 pr-8 pb-8 pl-8 max-md:absolute max-md:top-0 max-md:left-0 md:max-xl:hidden xl:h-1/2 xl:w-1/4 xl:justify-between xl:gap-0"
	>
		<button
			class="fill-neutral absolute top-8 right-8 h-0.5 rotate-45 cursor-pointer xl:hidden"
			onclick={toggleDashboard}
		>
			{@html Plus}
		</button>
		<p class="text-neutral text-xl font-semibold">График задач</p>
		<div
			class="bg-secondary flex h-60 w-60 items-center justify-center rounded-full"
			style="background: conic-gradient(var(--color-accent) {scheduleBusyPercent}%, var(--color-secondary) 0);"
		>
			<div class="bg-primary flex h-4/6 w-4/6 items-center justify-center rounded-full">
				<div class="flex flex-col items-center justify-center text-center">
					<p class="text-neutral text-md">{scheduleBusyPercent}%</p>
					<p class="text-secondary_contrast text-sm">Времени</p>
					<p class="text-secondary_contrast text-sm">заполнено</p>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-center gap-18">
			<div class="flex flex-col items-center justify-center">
				<p class="text-secondary_contrast text-sm">Заполнено</p>
				<div class="flex items-center justify-center gap-2">
					<div class="bg-accent h-4 w-4 rounded-sm"></div>
					<p class="text-neutral text-sm">{scheduleBusyPercent}%</p>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<p class="text-secondary_contrast text-sm">Свободно</p>
				<div class="flex items-center justify-center gap-2">
					<div class="bg-secondary_contrast h-4 w-4 rounded-sm"></div>
					<p class="text-neutral text-sm">{scheduleUnbusyPercent}%</p>
				</div>
			</div>
		</div>
	</div>
{/if}
