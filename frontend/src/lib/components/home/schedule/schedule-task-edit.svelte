<script lang="ts">
	import CategoriesIcon from '$lib/icon/categories.svg?raw';
	import TimeIcon from '$lib/icon/time.svg?raw';
	import DescriptionIcon from '$lib/icon/description.svg?raw';
	import Input from '$lib/components/input.svelte';

	let { isEditOpen = $bindable() } = $props();

	let label = $state('');

	let date = $state('');
	let startTime = $state('');
	let finishTime = $state('');

	const closeEdit = (event: MouseEvent) => {
		if (event.currentTarget === event.target) {
			isEditOpen = !isEditOpen;
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="schedule-task_create" onclick={(event: MouseEvent) => closeEdit(event)}>
	<div class="schedule-task_create-modal">
		<input
			class="schedule-task_create-modal_label"
			placeholder="Введите название"
			bind:value={label}
		/>

		<div class="schedule-task_create-modal_types">
			<div class="schedule-task_create-modal_types-header">
				<p class="schedule-task_create-modal_types-header-text">
					{@html CategoriesIcon} Основные категории
				</p>
			</div>
			<div class="schedule-task_create-modal_types-categories">
				<div class="schedule-task_create-modal_types-categories-category">
					<p class="schedule-task_create-modal_types-categories-category-text">Работа</p>
				</div>
			</div>
		</div>

		<div class="schedule-task_create-modal_time">
			<p class="schedule-task_create-modal_time-text">{@html TimeIcon} Время</p>
			<div class="schedule-task_create-modal_time-date">
				<p class="schedule-task_create-modal_time-date-text">Дата:</p>
				<Input placeholder="" bind:value={date} type="date" />
			</div>
			<div class="schedule-task_create-modal_time-date-start">
				<p class="schedule-task_create-modal_time-date-start-text">Старт:</p>
				<Input placeholder="" bind:value={startTime} type="time" />
			</div>
			<div class="schedule-task_create-modal_time-date-finish">
				<p class="schedule-task_create-modal_time-date-finish-text">Финиш:</p>
				<Input placeholder="" bind:value={finishTime} type="time" />
			</div>
		</div>

		<div class="schedule-task_create-modal_description">
			<p class="schedule-task_create-modal_description-text">{@html DescriptionIcon} Описание</p>
			<textarea class="schedule-task_create-modal_description-input" maxlength="120"></textarea>
		</div>

		<button class="schedule-task_create-modal-create">Создать</button>
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

		padding: 2rem;

		background-color: #f5f4fd;

		font-size: 32px;
		font-weight: 500;
		color: var(--color-accent);

		border-radius: 10px;

		outline: none;
		border: none;
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
		font-size: 24px;
		font-weight: 600;
	}

	.schedule-task_create-modal_types-categories {
		width: 100%;

		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.schedule-task_create-modal_types-categories-category {
		background-color: var(--color-accent);

		padding: 0.2rem 1rem 0.2rem 1rem;

		color: var(--color-primary);

		border-radius: 48px;
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
		font-size: 24px;
		font-weight: 600;
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
		font-size: 24px;
		font-weight: 600;
	}

	.schedule-task_create-modal_description-input {
		width: 100%;
		height: 8rem;

		padding: 1rem;

		background-color: #f5f4fd;

		font-size: 18px;
		font-weight: 500;
		color: var(--color-accent);

		border-radius: 10px;

		outline: none;
		border: none;

		resize: none;
	}

	.schedule-task_create-modal-create {
		height: 2rem;

		display: flex;
		justify-content: center;
		align-items: center;

		align-self: flex-end;

		background-color: var(--color-accent);

		font-size: 24px;
		font-weight: 600;
		color: var(--color-primary);

		border-radius: 21px;

		outline: none;
		border: none;

		padding: 2rem;

		cursor: pointer;
	}
</style>
