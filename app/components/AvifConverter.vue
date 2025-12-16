<template>
  <input type="file" accept="image/*" @change="onFile" />
  <a v-if="url" :href="url" download="image.avif">Скачать AVIF</a>
</template>

<script setup>
const url = ref(null);

const onFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/avif", {
    method: "POST",
    body: form,
  });

  const blob = await res.blob();

  if (url.value) URL.revokeObjectURL(url.value);
  url.value = URL.createObjectURL(blob);
};
</script>
