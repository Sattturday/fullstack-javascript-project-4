import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { getFileName } from './utils.js'

export default function loadPage(url, outputDir) {
  const fileName = getFileName(url)
  const filePath = path.join(outputDir, fileName)

  return axios.get(url).then((response) => {
    const html = response.data
    return fs.writeFile(filePath, html).then(() => filePath)
  })
}
