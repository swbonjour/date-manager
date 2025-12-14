<script lang="ts">
	import Category from '$lib/icon/categories.svg?raw';
	import Description from '$lib/icon/description.svg?raw';
	import Time from '$lib/icon/time.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';

	let label = $state('');

	const toggleTasksModal = (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		if (!target.classList.contains('modal-bg')) {
			return;
		}

		scheduleStore.update((s) => ({
			...s,
			isTasksModalOpen: !s.isTasksModalOpen
		}));
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $scheduleStore.isTasksModalOpen}
	<div
		class="modal-bg absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
		onclick={toggleTasksModal}
	>
		<div class="bg-primary flex h-3/4 w-2/4 flex-col rounded-xl p-8">
			<input
				placeholder="Добавьте название"
				maxlength="255"
				bind:value={label}
				class="bg-secondary text-neutral flex-col rounded-xl p-2 text-xl font-bold outline-none"
			/>

			<div class="mt-8 flex items-center justify-start gap-4">
				<div class="fill-neutral">{@html Category}</div>
				<p class="text-md text-neutral font-semibold">Основные категории</p>
			</div>

			<div class="mt-8 flex flex-col items-center justify-start">
				<div class="flex items-center justify-start gap-4">
					<div class="fill-neutral">{@html Time}</div>
					<p class="text-md text-neutral font-semibold">Время</p>
				</div>
			</div>

			<div class="mt-8 flex items-center justify-start gap-4">
				<div class="fill-neutral">{@html Description}</div>
				<p class="text-md text-neutral font-semibold">Описание</p>
			</div>
		</div>
	</div>
{/if}
