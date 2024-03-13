import imageCompression from 'browser-image-compression'

const compressImage = async (image: File, opts = {}) => {
	// gif图片不压缩
	// if (image.type == "image/gif") {
	// 	return image;
	// }
	const options = {
		maxSizeMB: 0.039,
		maxWidthOrHeight: 300,
		useWebWorker: true,
		maxIteration: 5,
		quality: 0.6,
		...opts,
	}
	try {
		const compressedFile = await imageCompression(image, options)
		console.log(
			'compressedFile instanceof Blob',
			compressedFile instanceof Blob
		) // true
		console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
		return compressedFile
		// await uploadToServer(compressedFile); // write your own logic
	} catch (error) {
		console.log(error)
		return image
	}
}

export default compressImage
