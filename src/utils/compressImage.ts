import imageCompression from 'browser-image-compression'

const compressImage = async (image: File, opts = {}) => {
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
		return compressedFile
	} catch (error) {
		console.log(error)
		return image
	}
}

export default compressImage
