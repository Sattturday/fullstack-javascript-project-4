import path from 'path'

const normalizeName = value =>
  value.replace(/[^a-zA-Z0-9]/g, '-')

// https://ru.hexlet.io/courses → ru-hexlet-io-courses.html
export const getFileName = (url) => {
  const { hostname, pathname } = new URL(url)

  const normalizedPath = pathname === '/'
    ? ''
    : pathname.replace(/\/$/, '')

  return normalizeName(`${hostname}${normalizedPath}`).concat('.html')
}
// https://ru.hexlet.io/courses → ru-hexlet-io-courses_files

export const getFilesDirName = url =>
  getFileName(url).replace('.html', '_files')

// https://ru.hexlet.io/courses/assets/professions/nodejs.png → ru-hexlet-io-assets-professions-nodejs.png
export const getResourceFileName = (resourceUrl, pageUrl) => {
  const resource = new URL(resourceUrl, pageUrl)
  const page = new URL(pageUrl)

  const ext = path.extname(resource.pathname)

  return normalizeName(
    `${page.hostname}${resource.pathname.replace(ext, '')}`,
  ).concat(ext)
}

// Проверяет, что ресурс лежит на том же хосте
export const isLocalResource = (resourceUrl, pageUrl) => {
  const resource = new URL(resourceUrl, pageUrl)
  const page = new URL(pageUrl)

  return resource.origin === page.origin
}
