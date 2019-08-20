// export function fileNameByUrl(url) {
//     const decoded = decodeURIComponent(url)
//     return decoded.substring(decoded.lastIndexOf("/") + 1)
// }

exports.replaceTrailing = path =>
  path === `/` ? path : path.replace(/\/$/, ``);
