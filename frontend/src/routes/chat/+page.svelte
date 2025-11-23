<script lang="ts">
	import { initSocket, messages, sendGlobalMessage } from '$lib/utils/socket';
	import Button from '$lib/components/button.svelte';
	import { userStore } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	import { client } from '$lib/utils';

	let chats = $state<{ id: string; login: string }[]>();

	let message = $state('');
	let selectedChat = $state('');
	let isGlobalSelected = $state(false);
	let componentMessages = $state<
		{ id: string; message: string; type: string; create_at: number }[]
	>([]);
	let chatType = '';

	messages.subscribe((item) => {
		componentMessages = item
			.filter((item) => item.type === chatType)
			.sort((a, b) => a.create_at - b.create_at);
	});

	const selectChat = (_id: string) => {
		selectedChat = _id;
		isGlobalSelected = false;
		chatType = _id;
		componentMessages = $messages
			.filter((item) => item.type === chatType)
			.sort((a, b) => a.create_at - b.create_at);
	};

	const selectGlobalChat = () => {
		isGlobalSelected = true;
		selectedChat = '';
		chatType = 'global';
		componentMessages = $messages
			.filter((item) => item.type === chatType)
			.sort((a, b) => a.create_at - b.create_at);
	};

	const getChats = async (): Promise<{ _id: string; login: string }[]> => {
		return await client.user.userControllerGetAllUsers();
	};

	const sendMessageToGlobalChat = () => {
		sendGlobalMessage($userStore.id, message);
	};

	onMount(async () => {
		initSocket();
		chats = await getChats();
		const chatsMap = new Map();
		for (const item of chats) {
			chatsMap.set(item.id, item.login);
		}
		userStore.update((u) => ({ ...u, usersMap: chatsMap }));
	});
</script>

<div class="chat_page">
	<div class="chat">
		<div class="chat_chats">
			<div
				class={['chat_chats-item', isGlobalSelected ? 'chat_chats-item-active' : '']}
				onclick={() => selectGlobalChat()}
				role="button"
				tabindex="0"
				onkeydown={() => {}}
			>
				<div>Global chat</div>
			</div>
			{#each chats as user}
				<div
					class={['chat_chats-item', user.id === selectedChat ? 'chat_chats-item-active' : '']}
					onclick={() => selectChat(user.id)}
					role="button"
					tabindex="0"
					onkeydown={() => {}}
				>
					<div>{user.login}</div>
				</div>
			{/each}
		</div>
		<div class="chat_chat">
			<div class="chat_chat-message">
				{#each componentMessages as mes}
					{#if mes.id !== $userStore.id}
						<div class="chat_chat-message-not-personal">
							{new Date(mes.create_at).toLocaleString()}
						</div>
						<div class="chat_chat-message-not-personal">
							{$userStore.usersMap.get(mes.id)}: {mes.message}
						</div>
					{:else}
						<div class="chat_chat-message-personal">{new Date(mes.create_at).toLocaleString()}</div>
						<div class="chat_chat-message-personal">
							{$userStore.usersMap.get(mes.id)}: {mes.message}
						</div>
					{/if}
				{/each}
			</div>
			<div class="chat_input">
				<input class="chat_input-field" placeholder="message" bind:value={message} />
				<Button
					label="Send"
					onclick={isGlobalSelected ? () => sendMessageToGlobalChat() : () => {}}
					size="s"
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.chat_page {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chat {
		width: 90%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.chat_chats {
		flex: 1;
		width: 20%;
		height: 80%;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: scroll;
	}

	.chat_chats-item {
		border-bottom: 1px solid black;
		padding-top: 1rem;
		cursor: pointer;
	}

	.chat_chats-item-active {
		color: red;
	}

	.chat_chat {
		flex: 6;
		height: 80%;
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
	}

	.chat_input {
		display: flex;
		gap: 1rem;
		width: 80%;
		align-items: baseline;
	}

	.chat_input-field {
		width: 100%;
		height: 2rem;
		margin-bottom: 2rem;
		padding-left: 1rem;
		box-sizing: border-box;
	}

	.chat_chat-message {
		display: flex;
		flex-direction: column;
		width: 80%;
		height: 100%;
		justify-content: flex-end;
		margin-bottom: 2rem;
		margin-top: 2rem;
		overflow-y: scroll;
		box-sizing: border-box;
		overflow: hidden;
	}

	.chat_chat-message-not-personal {
		max-width: 50%;
		text-wrap: wrap;
		word-break: break-all;
	}

	.chat_chat-message-personal {
		align-self: flex-end;
		max-width: 50%;
		text-wrap: wrap;
		word-break: break-all;
	}
</style>
