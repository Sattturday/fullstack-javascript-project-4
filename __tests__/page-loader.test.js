import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import nock from 'nock'
import loadPage from '../src/index.js'

describe('page loader', () => {
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
})
