<script lang="ts">
	import Schedule from '$lib/icon/schedule.svg?raw';
	import Todo from '$lib/icon/todo.svg?raw';
	import Dashboard from '$lib/icon/dashboard.svg?raw';
	import People from '$lib/icon/people.svg?raw';
	import Chat from '$lib/icon/chat.svg?raw';

	let selectedMenuItem = $state('schedule');

	const selectMenuItem = (item: string) => {
		selectedMenuItem = item;
	};
</script>

<div class="menu">
	<div class="menu_icons">
		<div
			class={['menu_icons-icon', selectedMenuItem === 'schedule' ? 'menu_icons-icon-active' : '']}
			onclick={() => selectMenuItem('schedule')}
		>
			{@html Schedule}
		</div>
		<div
			class={['menu_icons-icon', selectedMenuItem === 'todo' ? 'menu_icons-icon-active' : '']}
			onclick={() => selectMenuItem('todo')}
		>
			{@html Todo}
		</div>
		<div
			class={['menu_icons-icon', selectedMenuItem === 'dashboard' ? 'menu_icons-icon-active' : '']}
			onclick={() => selectMenuItem('dashboard')}
		>
			{@html Dashboard}
		</div>
		<div
			class={['menu_icons-icon', selectedMenuItem === 'people' ? 'menu_icons-icon-active' : '']}
			onclick={() => selectMenuItem('people')}
		>
			{@html People}
		</div>
		<div
			class={['menu_icons-icon', selectedMenuItem === 'chat' ? 'menu_icons-icon-active' : '']}
			onclick={() => selectMenuItem('chat')}
		>
			{@html Chat}
		</div>
	</div>
</div>

<style>
	.menu {
		width: 6rem;
		background-color: var(--color-primary);
	}

	.menu_icons {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		height: 50%;
	}

	.menu_icons-icon {
		cursor: pointer;
		fill: var(--color-neutral);
	}

	.menu_icons-icon-active {
		fill: var(--color-accent);
	}

	.menu_icons-icon:hover {
		fill: var(--color-accent);
	}
</style>
