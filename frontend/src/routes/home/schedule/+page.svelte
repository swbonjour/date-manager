<script lang="ts">
	import Tasks from '$lib/components/home/schedule/tasks/tasks.svelte';
	import Timetable from '$lib/components/home/schedule/timetable.svelte';
</script>

<div class="flex h-full w-full items-center justify-between gap-4 md:p-8">
	<div
		class="bg-primary flex h-1/2 w-1/4 flex-col items-center justify-start self-start rounded-xl pt-4 pr-8 pb-8 pl-8 max-xl:hidden"
	></div>
	<Timetable></Timetable>
	<Tasks></Tasks>
</div>
