// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@nuxt/icon'],

	css: ['~/assets/css/style.css'],

	icon: {
		customCollections: [{ prefix: 'icon', dir: './app/assets/icons' }],
	},
});
