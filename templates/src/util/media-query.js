export const MEDIUM = 786;
export const LARGE = 1100;

export const MEDIUM_MEDIA_QUERY = `(min-width: ${MEDIUM}px)`;
export const LARGE_MEDIA_QUERY = `(min-width: ${LARGE}px)`;

const MEDIUM_MATCH_MEDIA = window.matchMedia(MEDIUM_MEDIA_QUERY);
const LARGE_MATCH_MEDIA = window.matchMedia(LARGE_MEDIA_QUERY);

export default {
  get medium() {
    return MEDIUM_MATCH_MEDIA.matches;
  },
  get large() {
    return LARGE_MATCH_MEDIA.matches;
  },
  get layout() {
    return {
      small: !this.medium,
      medium: this.medium,
      large: this.large
    };
  }
};
