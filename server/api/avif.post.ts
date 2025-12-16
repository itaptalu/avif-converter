import sharp from 'sharp';

export default defineEventHandler(async (event) => {
	const form = await readMultipartFormData(event);
	if (!form) {
		throw createError({ statusCode: 400, statusMessage: 'No form data' });
	}

	const file = form.find((f) => f.name === 'file');
	if (!file || !file.data) {
		throw createError({ statusCode: 400, statusMessage: 'No file' });
	}

	const avif = await sharp(file.data)
		.avif({
			quality: 60,
			effort: 4,
			chromaSubsampling: '4:2:0',
		})
		.toBuffer();

	setHeader(event, 'Content-Type', 'image/avif');
	setHeader(event, 'Content-Disposition', 'attachment; filename=image.avif');

	return avif;
});
