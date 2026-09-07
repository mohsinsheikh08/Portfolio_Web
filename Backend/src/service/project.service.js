const ImageKit = require('@imagekit/nodejs')

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
})

const uploadFile = async (file) => {
    console.log("ImageKit upload function mein file:", file);
    try {
        const result = await imagekit.files.upload({
            file: file.toString('base64'),
            fileName: `project_${Date.now()}.jpg`,
        });
        console.log("ImageKit upload function mein result:", result);
        return result;
    } catch (error) {
        console.log("ImageKit mein error aaya:", error.message);
        throw error;
    }
};

module.exports = uploadFile