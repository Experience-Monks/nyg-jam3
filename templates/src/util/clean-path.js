/**
 * Clean url's trailing slashes
 *
 * @export
 * @param {String} path
 * @returns {String}
 */
export default function clean(path: string): ?string {
  if (!path) return null;
  return path.replace(/\/$/, '').replace(/^\//, '');
}
