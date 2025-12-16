<template>
	<template v-if="images.length > 1">
		<div class="max-w-[1240px] w-full overflow-auto px-8">
			<swiper-container ref="containerRef" :slides-per-view="'auto'" :space-between="12" :free-mode="true">
				<swiper-slide
					v-for="(slide, idx) in images"
					:key="idx"
					class="max-w-[20svw] rounded-xl overflow-hidden"
				>
					<a :href="slide" download class="relative group">
						<NuxtImg :src="slide" class="w-[20svw] object-cover aspect-square" />
						<div
							class="absolute inset-0 hidden justify-center items-center group-hover:flex bg-black/50 duration-200"
							title="Download"
						>
							<Icon name="material-symbols:download-sharp" class="text-main text-3xl" />
						</div>
					</a>
				</swiper-slide>
			</swiper-container>
		</div>
	</template>
	<template v-else>
		<a :href="images[0]" download class="relative group">
			<NuxtImg :src="images[0]" class="w-[20svw] object-cover aspect-square" />
			<div class="absolute inset-0 hidden justify-center items-center group-hover:flex bg-black/50 duration-200">
				<Icon name="material-symbols:download-sharp" class="text-main text-3xl" />
			</div>
		</a>
	</template>
</template>

<script setup lang="ts">
defineProps<{
	images: string[];
}>();
</script>
