<template>
	<div class="w-full h-full flex flex-col justify-center items-center gap-6">
		<Images v-if="images.length > 0 && !pending" :images="images" />

		<div v-if="!pending && images.length > 0" class="flex gap-3 items-center">
			<button
				class="bg-main text-secondary px-8 py-3 rounded-lg font-medium leading-5 hover:opacity-40 duration-300 max-h-[48px] h-full max-w-[147px] w-full"
				title="Download"
				@click="downloadFiles()"
			>
				Download
			</button>

			<button
				class="bg-main text-secondary h-full aspect-square rounded-full flex justify-center items-center hover:opacity-40 duration-300"
				title="Clear"
				@click="clearFiles()"
			>
				<Icon name="ic:round-clear" class="text-3xl" />
			</button>
		</div>

		<label
			v-else
			class="bg-main text-secondary px-8 py-3 rounded-lg font-medium leading-5 hover:opacity-40 duration-300 cursor-pointer max-h-[48px] h-full max-w-[147px] w-full flex justify-center items-center"
			:class="{ 'pointer-events-none opacity-40': pending }"
		>
			<div v-if="pending" class="loader"></div>
			<span v-else>Select files</span>

			<input type="file" accept="image/*" @change="onChange" hidden multiple ref="files" />
		</label>
	</div>
</template>

<script setup lang="ts">
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const images = reactive<string[]>([]);
const pending = ref(false);

const onChange = async (e: Event) => {
	const target = e.target as HTMLInputElement;
	const files = target.files;
	if (!files || !files.length) return;

	pending.value = true;

	for (const file of files) {
		const form = new FormData();
		form.append('file', file);

		try {
			const res = await fetch('/api/avif', { method: 'POST', body: form });

			const blob = await res.blob();
			images.push(URL.createObjectURL(blob));
		} catch (err) {
			console.error('File upload error:', err);
		}
	}

	pending.value = false;
};

const clearFiles = () => {
	images.splice(0, images.length);
};

const downloadFiles = async () => {
	if (images.length === 0) return;

	const zip = new JSZip();

	for (let i = 0; i < images.length; i++) {
		const url: string = images[i]!;
		const response = await fetch(url);
		const blob = await response.blob();
		zip.file(`image${i + 1}.avif`, blob);
	}

	const zipBlob = await zip.generateAsync({ type: 'blob' });
	saveAs(zipBlob, 'itaptalu.zip');

	clearFiles();
};
</script>
