const settings = {};

// global
settings.resizeDebounceTime = 10; // in ms
settings.isDevelopment = process.env.NODE_ENV !== 'production';

// global paths
settings.assetPath = `${process.env.PUBLIC_URL}/assets/`;
settings.imagesPath = `${process.env.PUBLIC_URL}/assets/images/`;

export default settings;
