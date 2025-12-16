<template>
	<div class="w-full h-full flex flex-col justify-center items-center gap-6">
		<label
			class="bg-main text-secondary px-8 py-3 rounded-lg font-medium leading-5 hover:opacity-40 duration-300 cursor-pointer max-h-[48px] h-full max-w-[147px] w-full flex justify-center items-center"
			:class="{ 'pointer-events-none opacity-40': pending }"
		>
			<div v-if="pending" class="loader"></div>
			<span v-else>Select files</span>

			<input type="file" accept="image/*" @change="onFile" hidden />
		</label>
	</div>
</template>

<script setup>
const url = ref(null);

const pending = ref(false);

const onFile = async (e) => {
	pending.value = true;

	const file = e.target.files[0];
	if (!file) return;

	const form = new FormData();
	form.append('file', file);

	const res = await fetch('/api/avif', {
		method: 'POST',
		body: form,
	});

	const blob = await res.blob();

	if (url.value) URL.revokeObjectURL(url.value);
	url.value = URL.createObjectURL(blob);

	pending.value = false;
};
</script>
