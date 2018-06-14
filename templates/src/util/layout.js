import { medium as MEDIUM, large as LARGE } from '../data/layout.json';

export const MEDIUM_MEDIA_QUERY = `(min-width: ${MEDIUM}px)`;
export const LARGE_MEDIA_QUERY = `(min-width: ${LARGE}px)`;

const MEDIUM_MATCH_MEDIA = window.matchMedia(MEDIUM_MEDIA_QUERY);
const LARGE_MATCH_MEDIA = window.matchMedia(LARGE_MEDIA_QUERY);

export default {
  get small() {
    return !this.medium;
  },
  get medium() {
    return MEDIUM_MATCH_MEDIA.matches;
  },
  get large() {
    return LARGE_MATCH_MEDIA.matches;
  },
  get all() {
    return {
      small: this.small,
      medium: this.medium,
      large: this.large
    };
  }
};
