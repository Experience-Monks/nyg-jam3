import settings from '../data/settings';
import breakpointHandler from './breakpoint-handler';

export default function(windowWidth, windowHeight) {
  const scale = settings.minScaleSize / settings.baseDesignWidth;
  let fontSize = settings.defaultFontSizePercent;

  if (breakpointHandler.isDesktopLayout()) {
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
