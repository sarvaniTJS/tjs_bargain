const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')

const { db } = require('../lib/db')

exports.handler = async function (event) {
  const { bargainId } = JSON.parse(event.body)
  const bargain = await db.bargain.findUnique({
    where: { id: bargainId },
  })
  console.log('bargain------->', bargain.product)
  const start = Date.now()
  const path = await chromium.executablePath()
  console.log('path==========>', path)
  const browser = await puppeteer.launch({
    // Required
    executablePath: path,

    // Optional
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })
  const page = await browser.newPage()
  await page.goto(
    `https://www.google.co.in/search?q=${bargain.product}&tbm=shop`
  )

  await page.waitForSelector('.iXEZD')
  const goto = await page.evaluate(() => {
    return document.querySelector('a.iXEZD').href
  })
  console.log('gotolink', goto)
  await page.goto(goto)
  await page.waitForSelector('.UxuaJe.shntl.FkMp')
  const linkNodeList = await page.evaluate(() => {
    return document.querySelector('.b5ycib.shntl').href
    // return document.querySelectorAll('.b5ycib.shntl')
    // const links = linkElements.map((ele) => {
    //   return ele.href
    // })
    // return links
  })
  console.log('linkNodeList------>', linkNodeList)
  // const linkList = Array.from(linkNodeList)
  // console.log('linkList==========>', linkList)
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
      await tx.link.create({
        data: { bargainId, link: linkNodeList },
      })

      // linkList.forEach(async (l) => {
      //   await tx.link.create({
      //     data: { bargainId, link: l },
      //   })
      // })
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
