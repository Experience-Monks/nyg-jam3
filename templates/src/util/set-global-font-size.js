import settings from '../data/settings';

/**
 * Set fontsize to the HTML tag depending of the user resolution and the web app configuration
 *
 * @param {Number} windowWidth
 * @param {Number} windowHeight
 * @param {Boolean} isDesktopLayout
 */
function setGlobalFontSize(windowWidth, windowHeight, isDesktopLayout) {
  const scale = settings.minScaleSize / settings.baseDesignWidth;
  let fontSize = settings.defaultFontSizePercent;

  if (isDesktopLayout) {
    if (windowWidth > settings.maxScaleSize) {
      // lock font size for max range limit
      fontSize = settings.defaultFontSizePercent / settings.minScaleSize * settings.maxScaleSize * scale;
    } else if (windowWidth > settings.minScaleSize) {
      // proportionate scale font size within range
      fontSize = settings.defaultFontSizePercent / settings.minScaleSize * windowWidth * scale;
    } else {
      // lock font size for min range limit
      fontSize = settings.defaultFontSizePercent / settings.minScaleSize * settings.minScaleSize * scale;
    }
  }

  document.documentElement.style.fontSize = `${fontSize * settings.percentToPxMultiplier}px`;
}

export default setGlobalFontSize;
