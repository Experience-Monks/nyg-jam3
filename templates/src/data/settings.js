const settings = {};

// global
settings.resizeDebounceTime = 10; // in ms
settings.isDevelopment = process.env.NODE_ENV !== 'production';

// breakpoints
settings.tabletLayout = 577;
settings.desktopSmallLayout = 1201;
settings.desktopMediumLayout = 1440;
settings.desktopLargeLayout = 1920;

// global scale values
settings.defaultFontSizePercent = 62.5;
settings.defaultFontSizePx = 10;
settings.minScaleSize = 1200; // below this size we lock the font
settings.maxScaleSize = 1920; // above this size we lock the font
settings.baseDesignWidth = 1440; // only at this exact screen size pixel values will match designs. it will scale up/down within the above range
settings.percentToPxMultiplier = settings.defaultFontSizePx / settings.defaultFontSizePercent;

export default settings;
