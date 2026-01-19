import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import * as cheerio from 'cheerio'
import {
  getFileName,
  getFilesDirName,
  getResourceFileName,
  isLocalResource,
} from './utils.js'

export default async function loadPage(url, outputDir) {
  const fileName = getFileName(url)
  const filePath = path.join(outputDir, fileName)

  // Загружаем HTML
  const response = await axios.get(url)
  const html = response.data

  // Парсим HTML
  const $ = cheerio.load(html)

  // Готовим директорию для ресурсов
  const filesDirName = getFilesDirName(url)
  const filesDirPath = path.join(outputDir, filesDirName)

  await fs.mkdir(filesDirPath)

  // Ищем картинки
  const images = $('img')

  const promises = images
    .map((_, el) => {
      const src = $(el).attr('src')

      if (!isLocalResource(src, url)) {
        return null
      }

      const resourceUrl = new URL(src, url).href
      const resourceFileName = getResourceFileName(src, url)
      const resourceFilePath = path.join(filesDirPath, resourceFileName)

      // переписываем src в HTML
      $(el).attr('src', `${filesDirName}/${resourceFileName}`)

      // скачиваем ресурс
      return axios
        .get(resourceUrl, { responseType: 'arraybuffer' })
        .then(res => fs.writeFile(resourceFilePath, res.data))
    })
    .get()

  // Ждём, пока все ресурсы сохранятся
  await Promise.all(promises)

  // Сохраняем обновлённый HTML
  const resultHtml = $.html()
  await fs.writeFile(filePath, resultHtml)

  return filePath
}
