import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import nock from 'nock'
import loadPage from '../src/index.js'
import { getFileName } from '../src/utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)
const readFixtureFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

let tmpDir

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
})

test('downloads page and saves it', async () => {
  const url = 'https://example.com'
  const html = '<html><body>hello</body></html>'

  nock('https://example.com')
    .get('/')
    .reply(200, html)

  const filePath = await loadPage(url, tmpDir)
  const content = await fs.readFile(filePath, 'utf-8')

  expect(content).toBe(html)
})

test('throws error on http error', async () => {
  const url = 'https://example.com'

  nock('https://example.com')
    .get('/')
    .reply(500)

  await expect(loadPage(url, tmpDir)).rejects.toThrow()
})

test('throws error on fs error', async () => {
  const url = 'https://example.com'
  const html = '<html></html>'

  nock('https://example.com')
    .get('/')
    .reply(200, html)

  const invalidDir = path.join(tmpDir, 'non-existent-dir')

  await expect(loadPage(url, invalidDir)).rejects.toThrow()
})

test('getFileName', () => {
  expect(getFileName('https://ru.hexlet.io/courses')).toBe('ru-hexlet-io-courses.html')
})

test('downloads images and replaces links in html', async () => {
  const url = 'https://ru.hexlet.io/courses'

  const html = readFixtureFile('page-with-image.html')

  const imageData = Buffer.from('image content')

  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, html)

  nock('https://ru.hexlet.io')
    .get('/assets/professions/nodejs.png')
    .reply(200, imageData)

  const filePath = await loadPage(url, tmpDir)

  const filesDir = path.join(tmpDir, 'ru-hexlet-io-courses_files')
  const imagePath = path.join(
    filesDir,
    'ru-hexlet-io-assets-professions-nodejs.png'
  )

  const savedHtml = await fs.readFile(filePath, 'utf-8')

  expect(savedHtml).toContain(
    'src="ru-hexlet-io-courses_files/ru-hexlet-io-assets-professions-nodejs.png"'
  )

  await expect(fs.stat(filesDir)).resolves.toBeDefined()
  await expect(fs.stat(imagePath)).resolves.toBeDefined()
})

afterEach(async () => {
  if (tmpDir) {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
})


