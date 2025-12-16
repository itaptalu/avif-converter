<template>
	<main class="h-full flex flex-col">
		<header class="flex justify-center items-center py-3">
			<Logo />
		</header>
		<div class="flex-1">
			<ClientOnly>
				<AvifConverter />
			</ClientOnly>
		</div>
	</main>
</template>
