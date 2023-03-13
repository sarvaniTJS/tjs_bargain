const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer')

const { db } = require('../lib/db')

exports.handler = async function (event) {
  // get bargain
  const { bargainId } = JSON.parse(event.body)
  const bargain = await db.bargain.findUnique({
    where: { id: bargainId },
  })
  console.log('bargain------->', bargain.product)

  // start scraping
  const start = Date.now()
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
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
  const modelName = await page.evaluate(() => {
    return document.querySelector('div.f0t7kf').textContent
  })
  console.log('modelName', modelName)

  let data = await page.$$('tr.sh-osd__offer-row')

  console.log('data1', data)

  data = await data.map(async (d) => {
    const source = await d.$eval('a.UxuaJe.shntl.FkMp', (node) => node.text)
    // if (source) {
    //   source = source.split("Opens")[0];
    // }
    const link = await d.$eval('a.b5ycib.shntl', (node) => node.href)
    // if (link) {
    //   link = link.split("q=")[1].split("%")[0].split("&")[0];
    // }
    const price = await d.$eval('div.drzWO', (node) => node.innerText)
    console.log(link, price)
    return { link }
  })

  // data = data.filter((d) => d.link.includes('http'))
  // await browser.close()

  // const end = Date.now()
  // const timeTaken = end - start
  // console.log(`seconds elapsed = ${Math.floor(timeTaken / 1000)}`)
  // try {
  //   await db.$transaction(async (tx) => {
  //     const existingLink = await tx.link.findFirst({
  //       where: {
  //         bargainId,
  //       },
  //     })
  //     console.log('existingLink====>', existingLink)
  //     if (existingLink !== null) {
  //       const delLink = await tx.link.deleteMany({
  //         where: {
  //           bargainId,
  //         },
  //       })
  //       console.log('delLink=======>', delLink)
  //     }

  //     data.forEach(async (d) => {
  //       await tx.link.create({
  //         data: {
  //           bargainId,
  //           link: d.link,
  //           source: d.source,
  //           price: d.price,
  //           model: modelName,
  //         },
  //       })
  //     })
  //     return {
  //       statusCode: 200,
  //     }
  //   })
  //   console.log('new data created')
  // } catch (error) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({ error: error.message }),
  //   }
  // }
}
