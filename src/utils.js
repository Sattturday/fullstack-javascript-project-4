import path from 'path'

/**
 * https://ru.hexlet.io/courses
 * → ru-hexlet-io-courses.html
 */
export const getFileName = (url) => {
  const { hostname, pathname } = new URL(url)

  const normalizedPath = pathname === '/'
    ? ''
    : pathname.replace(/\/$/, '')

  return `${hostname}${normalizedPath}`
    .replace(/[^a-zA-Z0-9]/g, '-')
    .concat('.html')
}

/**
 * https://ru.hexlet.io/courses
 * → ru-hexlet-io-courses_files
 */
export const getFilesDirName = (url) =>
  getFileName(url).replace('.html', '_files')

/**
 * /assets/professions/nodejs.png
 * → ru-hexlet-io-assets-professions-nodejs.png
 */
export const getResourceFileName = (resourceUrl, pageUrl) => {
  const { pathname } = new URL(resourceUrl, pageUrl)
  const ext = path.extname(pathname)

  return pathname
    .replace(ext, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .concat(ext)
}

/**
 * Проверяет, что ресурс лежит на том же хосте
 */
export const isLocalResource = (resourceUrl, pageUrl) => {
  const resource = new URL(resourceUrl, pageUrl)
  const page = new URL(pageUrl)

  return resource.origin === page.origin
}
