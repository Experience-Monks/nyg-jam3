const settings = {};

export const PUBLIC_URL: string = process.env.PUBLIC_URL != null ? process.env.PUBLIC_URL : '';

// global
settings.resizeDebounceTime = 10; // in ms
settings.isDevelopment = process.env.NODE_ENV !== 'production';

// global paths
settings.assetPath = `${PUBLIC_URL}/assets/`;
settings.imagesPath = `${PUBLIC_URL}/assets/images/`;

export default settings;
