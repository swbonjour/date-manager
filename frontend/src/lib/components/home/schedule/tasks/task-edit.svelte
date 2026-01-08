<script lang="ts">
	import Input from '$lib/components/common/input.svelte';
	import { ActivityTypeColors, ActivityTypeTranslation } from '$lib/enums/enum';
	import Category from '$lib/icon/categories.svg?raw';
	import Description from '$lib/icon/description.svg?raw';
	import Time from '$lib/icon/time.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { ActivityTypeEnum } from '$lib/utils/client';
	import { DateTime } from 'luxon';
	import Plus from '$lib/icon/plus.svg?raw';
	import { client } from '$lib/utils';

	let label = $state('');

	let dateStart = $derived($scheduleStore.date.toFormat('y-MM-dd'));
	let dateStartTime = $state(DateTime.now().toFormat('HH:mm'));
	let dateFinishTime = $state(DateTime.now().plus({ hour: 1 }).toFormat('HH:mm'));

	let selectedActivityType = $state(ActivityTypeEnum.ENTERTAINMENT);

	const activities = [
		ActivityTypeEnum.EDUCATION,
		ActivityTypeEnum.ENTERTAINMENT,
		ActivityTypeEnum.HOBBY,
		ActivityTypeEnum.SPORT,
		ActivityTypeEnum.WORK
	];

	let description = $state<string | null | undefined>('');

	const toggleTasksModal = (e: MouseEvent, force?: boolean) => {
		const target = e.target as HTMLElement;

		if (!target.classList.contains('modal-bg') && !force) {
			return;
		}

		scheduleStore.update((s) => ({
			...s,
			isTasksModalOpen: !s.isTasksModalOpen
		}));

		label = '';
		description = '';
	};

	const selectActivity = (activity: ActivityTypeEnum) => {
		selectedActivityType = activity;
	};

	$effect(() => {
		if ($scheduleStore.isTasksModalOpen) {
			dateStartTime = DateTime.now().toFormat('HH:mm');
			dateFinishTime = DateTime.now().plus({ hour: 1 }).toFormat('HH:mm');
		}

		if ($scheduleStore.selectedTask) {
			label = $scheduleStore.selectedTask.label;
			dateStartTime = DateTime.fromISO($scheduleStore.selectedTask.start).toFormat('HH:mm');
			dateFinishTime = DateTime.fromISO($scheduleStore.selectedTask.finish).toFormat('HH:mm');
			selectedActivityType = $scheduleStore.selectedTask.type;
			description = $scheduleStore.selectedTask.description;
		}
	});

	const upsertTask = async () => {
		if (!$scheduleStore.selectedTask) {
			const task = await client.task.taskControllerCreateTask({
				date: `${DateTime.fromFormat(`${dateStart}`, 'y-MM-dd').toISODate()}`,
				start: `${DateTime.fromFormat(`${dateStart}-${dateStartTime}`, 'y-MM-dd-HH:mm').toISO()}`,
				finish: `${DateTime.fromFormat(`${dateStart}-${dateFinishTime}`, 'y-MM-dd-HH:mm').toISO()}`,
				label: label,
				type: selectedActivityType,
				description: description
			});

			scheduleStore.update((s) => ({
				...s,
				tasks: [...s.tasks, task],
				isTasksModalOpen: !s.isTasksModalOpen
			}));
		} else {
			const task = await client.task.taskControllerUpdateTask({
				date: `${DateTime.fromFormat(`${dateStart}`, 'y-MM-dd').toISODate()}`,
				start: `${DateTime.fromFormat(`${dateStart}-${dateStartTime}`, 'y-MM-dd-HH:mm').toISO()}`,
				finish: `${DateTime.fromFormat(`${dateStart}-${dateFinishTime}`, 'y-MM-dd-HH:mm').toISO()}`,
				label: label,
				type: selectedActivityType,
				description: description,
				_id: $scheduleStore.selectedTask._id
			});

			const existingScheduleTasks = $scheduleStore.tasks;
			existingScheduleTasks.splice(
				existingScheduleTasks.findIndex((item) => item._id === task._id),
				1
			);
			scheduleStore.update((s) => ({
				...s,
				tasks: [...existingScheduleTasks, task],
				isTasksModalOpen: !s.isTasksModalOpen
			}));
		}

		const analyticsData = await client.analytic.analyticControllerGetScheduleBusyAnalytic({
			date: $scheduleStore.date.toISODate()
		});

		$scheduleStore.scheduleBusyMinutes = analyticsData.schedule_busy_minutes || 0;

		label = '';
		description = '';
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $scheduleStore.isTasksModalOpen}
	<div
		class="modal-bg absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
		onclick={toggleTasksModal}
	>
		<div
			class="bg-primary flex h-full w-full flex-col items-start justify-around gap-6 p-8 md:h-5/6 md:w-3/4 md:gap-8 md:rounded-xl lg:w-2/6"
		>
			<button
				class="fill-neutral h-0.5 rotate-45 cursor-pointer self-end"
				onclick={(e) => toggleTasksModal(e, true)}>{@html Plus}</button
			>
			<input
				placeholder="Добавьте название"
				maxlength="255"
				bind:value={label}
				class="bg-secondary text-neutral w-full rounded-xl p-2 text-xl font-bold outline-none"
			/>

			<div class="flex flex-col items-start justify-center gap-4">
				<div class="flex items-center justify-start gap-4">
					<div class="fill-neutral">{@html Category}</div>
					<p class="text-md text-neutral font-semibold">Основные категории</p>
				</div>
				<div class="flex flex-wrap items-center justify-start gap-2">
					{#each activities as activity}
						<div
							class={[
								'text-primary md:text-md min-w-20 cursor-pointer rounded-2xl p-1 text-center text-sm',
								selectedActivityType === activity ? 'selected-activity-type' : ''
							]}
							style="background-color: {ActivityTypeColors[activity]};"
							onclick={() => selectActivity(activity)}
						>
							{ActivityTypeTranslation[activity]}
						</div>
					{/each}
				</div>
			</div>

			<div class="justify-caret-entertainment flex w-full flex-col items-start">
				<div class="flex items-center justify-start gap-4">
					<div class="fill-neutral">{@html Time}</div>
					<p class="text-md text-neutral font-semibold">Время</p>
				</div>
				<div class="mt-4 flex flex-col gap-2 text-nowrap">
					<div class="flex w-full items-center justify-between gap-8">
						<p class="text-md text-neutral font-semibold">Дата задачи</p>
						<Input
							bind:value={dateStart}
							inputAttributes={{ type: 'date', style: 'width: 7rem' }}
						/>
					</div>
					<div class="flex w-full items-center justify-between gap-8">
						<p class="text-md text-neutral font-semibold">Начало задачи</p>
						<Input
							bind:value={dateStartTime}
							inputAttributes={{ type: 'time', style: 'width: 6rem' }}
						/>
					</div>
					<div class="flex items-center justify-between gap-8">
						<p class="text-md text-neutral mt-4 font-semibold">Конец задачи</p>
						<Input
							bind:value={dateFinishTime}
							inputAttributes={{ type: 'time', style: 'width: 6rem' }}
						/>
					</div>
				</div>
			</div>

			<div class="flex w-full flex-col items-start justify-center gap-4">
				<div class="flex items-center justify-start gap-4">
					<div class="fill-neutral">{@html Description}</div>
					<p class="text-md text-neutral font-semibold">Описание</p>
				</div>
				<textarea
					class="bg-secondary text-neutral text-md h-full w-full resize-none overflow-hidden rounded-xl p-2 outline-0"
					maxlength="255"
					rows="4"
					bind:value={description}
				></textarea>
			</div>

			<button
				class="text-neutral bg-accent w-40 cursor-pointer self-end rounded-xl p-2"
				onclick={upsertTask}>Сохранить</button
			>
		</div>
	</div>
{/if}

<style>
	.selected-activity-type {
		outline: 2px solid var(--color-neutral);
	}
</style>
