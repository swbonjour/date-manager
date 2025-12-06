<div class="flex h-full w-full flex-col gap-8 md:w-1/2">
	<div class="bg-primary min-h-20 w-full rounded-br-xl rounded-bl-xl md:rounded-xl"></div>
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
			<div class="flex w-full items-center justify-between text-lg md:mr-12">
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
		<div class="h-7/8 w-full overflow-y-scroll">
			<div class="flex flex-col gap-6">
				{#each { length: 24 }, row}
					<div class="flex items-center justify-center gap-4">
						<p class="text-neutral w-20 text-lg font-semibold">{`${row + 1}:00`}</p>
						<div class="bg-accent h-8 w-full rounded-md md:mr-8"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
