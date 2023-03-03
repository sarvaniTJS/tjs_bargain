import { db } from 'src/lib/db'

const puppeteer = require('puppeteer')

exports.handler = async function (event) {
  const { bargainId } = JSON.parse(event.body)
  const bargain = await db.bargain.findUnique({
    where: { id: bargainId },
  }).product
  const start = Date.now()
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`https://www.google.co.in/search?q=${bargain}&tbm=shop`)

  await page.waitForSelector('.SirUVb.sh-img__image')
  const goto = await page.evaluate(() => {
    return document.querySelector('.iXEZD').href
  })
  console.log('gotolink', goto)
  await page.goto(goto)
  await page.waitForSelector('.UxuaJe.shntl.FkMp')
  const linkList = await page.evaluate(() => {
    const linkElements = Array.from(document.querySelectorAll('.b5ycib.shntl'))
    const links = linkElements.map((ele) => {
      const rawUrl = ele.href.slice(31)
      const url = rawUrl.split('%')
      return url[0]
    })
    return links
  })
  await browser.close()

  const end = Date.now()
  const timeTaken = end - start
  console.log(`seconds elapsed = ${Math.floor(timeTaken / 1000)}`)
  try {
    await db.$transaction(async (tx) => {
      const existingLink = await tx.link.findFirst({
        where: {
          bargainId,
        },
      })
      if (existingLink !== null) {
        tx.link.deleteMany({
          where: {
            bargainId,
          },
        })
      }

      linkList.forEach(async (l) => {
        await tx.link.create({
          data: { bargainId, link: l },
        })
      })
      return {
        statusCode: 200,
      }
    })
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
}