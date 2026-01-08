<script lang="ts">
	import Analytic from '$lib/components/home/schedule/analytic/analytic.svelte';
	import Tasks from '$lib/components/home/schedule/tasks/tasks.svelte';
	import Timetable from '$lib/components/home/schedule/timetable.svelte';
</script>

<div class="flex h-full w-full items-center justify-between gap-4 md:p-8">
	<Analytic></Analytic>
	<Timetable></Timetable>
	<Tasks></Tasks>
</div>
