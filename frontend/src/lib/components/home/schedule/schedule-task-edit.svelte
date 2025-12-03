<script lang="ts">
	import CategoriesIcon from '$lib/icon/categories.svg?raw';
	import TimeIcon from '$lib/icon/time.svg?raw';
	import DescriptionIcon from '$lib/icon/description.svg?raw';
	import Input from '$lib/components/input.svelte';
	import { client } from '$lib/utils';
	import { ActivityTypeEnum, type TaskDto } from '$lib/utils/client';
	import { acitivtyTypesLoc, activityTypes } from '$lib/utils/helper';
	import { DateTime } from 'luxon';
	import { taskStore } from '$lib/stores/task-store';
	import { scheduleStore } from '$lib/stores/schedule-store';

	let { isEditOpen = $bindable(), task = $bindable() }: { isEditOpen: boolean; task?: TaskDto } =
		$props();

	let label = $state(task ? task.label : '');

	let type = $state<ActivityTypeEnum>(task ? task.type : ActivityTypeEnum.WORK);

	let date = $state(
		task ? DateTime.fromISO(task.date).toFormat('y-MM-dd') : DateTime.now().toFormat('y-MM-dd')
	);
	let startTime = $state(
		task ? DateTime.fromISO(task.start).toFormat('HH:mm') : DateTime.now().toFormat('HH:mm')
	);
	let finishTime = $state(
		task
			? DateTime.fromISO(task.finish).toFormat('HH:mm')
			: DateTime.now().plus({ hour: 1 }).toFormat('HH:mm')
	);

	let description = $state(task ? task.description : '');

	const closeEdit = (event: MouseEvent) => {
		if (event.currentTarget === event.target) {
			isEditOpen = !isEditOpen;
		}
	};

	let startTimeErr = $state(false);

	const validateTime = () => {
		if (!startTime || !finishTime) {
			startTimeErr = false;
			return;
		}

		const splittedTimeStart = startTime.split(':').map((item) => Number(item));
		const splittedTimeFinish = finishTime.split(':').map((item) => Number(item));

		const [startHours, startMinutes] = splittedTimeStart;
		const [finishHours, finishMinutes] = splittedTimeFinish;

		if (startHours > finishHours || (startHours === finishHours && startMinutes > finishMinutes)) {
			startTimeErr = true;
		} else {
			startTimeErr = false;
		}
	};

	let labelErr = $state(false);

	const validateLabel = () => {
		if (!label) {
			labelErr = true;
		} else {
			labelErr = false;
		}
	};

	const selectType = (activityType: ActivityTypeEnum) => {
		type = activityType;
	};

	const upsertTask = async () => {
		if (!label) {
			validateLabel();
			return;
		}

		if (!task) {
			const newTask = await client.task.taskControllerCreateTask({
				label: label,
				type: type,
				date: DateTime.fromISO(date).toISO()!,
				start: DateTime.fromISO(`${date}T${startTime}`).toISO()!,
				finish: DateTime.fromISO(`${date}T${finishTime}`).toISO()!,
				description: description
			});

			taskStore.update((t) => {
				return {
					...t,
					tasks: [...t.tasks, newTask]
				};
			});
		} else {
			const updatedTask = await client.task.taskControllerUpdateTask({
				_id: task._id,
				label: label,
				type: type,
				date: DateTime.fromISO(date).toISO()!,
				start: DateTime.fromISO(`${date}T${startTime}`).toISO()!,
				finish: DateTime.fromISO(`${date}T${finishTime}`).toISO()!,
				description: description
			});

			taskStore.update((t) => {
				t.tasks.splice(
					t.tasks.findIndex((item) => item._id === task._id),
					1
				);
				return {
					...t,
					tasks: [...t.tasks, updatedTask]
				};
			});
		}

		const busyMinutes = await client.analytic.analyticControllerCalculateScheduleBusyAnalytic({
			date: DateTime.fromISO(date).toISO()!
		});

		scheduleStore.update((s) => {
			return {
				...s,
				busyMinutes: busyMinutes.schedule_busy_minutes
			};
		});

		isEditOpen = false;
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="schedule-task_create" onclick={(event: MouseEvent) => closeEdit(event)}>
	<div class="schedule-task_create-modal">
		<input
			class={[
				'schedule-task_create-modal_label',
				labelErr ? 'schedule-task_create-modal_label-err' : ''
			]}
			placeholder={labelErr ? 'Название не может быть пустым' : 'Введите название'}
			bind:value={label}
			oninput={() => validateLabel()}
		/>

		<div class="schedule-task_create-modal_types">
			<div class="schedule-task_create-modal_types-header">
				<p class="schedule-task_create-modal_types-header-text">
					{@html CategoriesIcon} Основные категории
				</p>
			</div>
			<div class="schedule-task_create-modal_types-categories">
				{#each activityTypes as activityType}
					<button
						class={[
							'schedule-task_create-modal_types-categories-category',
							activityType === type
								? 'schedule-task_create-modal_types-categories-category-selected'
								: ''
						]}
						style="background-color: var(--color-{activityType})"
						onclick={() => selectType(activityType)}
					>
						<p class="schedule-task_create-modal_types-categories-category-text">
							{acitivtyTypesLoc.get(activityType)}
						</p>
					</button>
				{/each}
			</div>
		</div>

		<div class="schedule-task_create-modal_time">
			<p class="schedule-task_create-modal_time-text">{@html TimeIcon} Время</p>
			<div class="schedule-task_create-modal_time-date">
				<p class="schedule-task_create-modal_time-date-text">Дата:</p>
				<Input placeholder="" bind:value={date} type="date" onInputCustom={validateTime} />
			</div>
			<div class="schedule-task_create-modal_time-date-start">
				<p class="schedule-task_create-modal_time-date-start-text">Старт:</p>
				<Input
					placeholder=""
					bind:value={startTime}
					type="time"
					onInputCustom={validateTime}
					err={startTimeErr}
					errText="Старт не может быть больше Финиша"
					errPosition="right"
				/>
			</div>
			<div class="schedule-task_create-modal_time-date-finish">
				<p class="schedule-task_create-modal_time-date-finish-text">Финиш:</p>
				<Input placeholder="" bind:value={finishTime} type="time" onInputCustom={validateTime} />
			</div>
		</div>

		<div class="schedule-task_create-modal_description">
			<p class="schedule-task_create-modal_description-text">{@html DescriptionIcon} Описание</p>
			<textarea
				class="schedule-task_create-modal_description-input"
				maxlength="120"
				bind:value={description}
			></textarea>
		</div>

		<button class="schedule-task_create-modal-create" onclick={() => upsertTask()}
			>{task ? 'Обновить' : 'Создать'}</button
		>
	</div>
</div>

<style>
	.schedule-task_create {
		width: 100vw;
		height: 100vh;

		position: absolute;

		left: 0;
		top: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: rgba(0, 0, 0, 0.8);

		overflow: hidden;
	}

	.schedule-task_create-modal {
		width: 30%;
		height: 80%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: 2rem;

		background-color: var(--color-primary);

		border-radius: 20px;

		padding: 2rem;
	}

	.schedule-task_create-modal_label {
		width: 100%;
		height: 3rem;

		padding: 1rem;

		background-color: var(--color-secondary);

		font-size: 28px;
		font-weight: 500;
		color: var(--color-accent);

		border-radius: 10px;

		outline: none;
		border: none;
	}

	.schedule-task_create-modal_label-err {
		border: 1px solid var(--color-accent);
	}

	.schedule-task_create-modal_label::placeholder {
		color: var(--color-accent);
	}

	.schedule-task_create-modal_types {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		gap: 1rem;
	}

	.schedule-task_create-modal_types-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.schedule-task_create-modal_types-header-text {
		fill: var(--color-neutral);

		font-size: 24px;
		font-weight: 600;
		color: var(--color-neutral);
	}

	.schedule-task_create-modal_types-categories {
		width: 100%;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.schedule-task_create-modal_types-categories-category {
		background-color: var(--color-accent);

		padding: 0.2rem 1rem 0.2rem 1rem;

		color: #ffffff;

		border-radius: 48px;

		outline: none;
		border: none;

		cursor: pointer;
	}

	.schedule-task_create-modal_types-categories-category-selected {
		border: 2px solid var(--color-neutral);
	}

	.schedule-task_create-modal_time {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;

		gap: 1rem;
	}

	.schedule-task_create-modal_time-text {
		fill: var(--color-neutral);

		font-size: 24px;
		font-weight: 600;
		color: var(--color-neutral);
	}

	.schedule-task_create-modal_time-date,
	.schedule-task_create-modal_time-date-start,
	.schedule-task_create-modal_time-date-finish {
		width: 50%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.schedule-task_create-modal_time-date-text,
	.schedule-task_create-modal_time-date-start-text,
	.schedule-task_create-modal_time-date-finish-text {
		font-size: 18px;
		font-weight: 600;
		color: var(--color-neutral);
	}

	.schedule-task_create-modal_description {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;

		gap: 1rem;
	}

	.schedule-task_create-modal_description-text {
		fill: var(--color-neutral);

		font-size: 24px;
		font-weight: 600;
		color: var(--color-neutral);
	}

	.schedule-task_create-modal_description-input {
		width: 100%;
		max-height: 8rem;

		padding: 1rem;

		background-color: var(--color-secondary);

		font-size: 28px;
		font-weight: 500;
		color: var(--color-accent);

		border-radius: 10px;

		outline: none;
		border: none;

		resize: none;
	}

	.schedule-task_create-modal-create {
		height: 1rem;

		display: flex;
		justify-content: center;
		align-items: center;

		align-self: flex-end;

		background-color: var(--color-accent);

		font-size: 18px;
		font-weight: 600;
		color: #ffffff;

		border-radius: 12px;

		outline: none;
		border: none;

		padding: 1.2rem;

		cursor: pointer;
	}
</style>
