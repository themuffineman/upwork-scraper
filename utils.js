export async function getRootDomain(url, browser){
  try {
    const rootPage = await browser.newPage()
    await rootPage.goto(url)
    const rootUrl = rootPage.url()
    await rootPage.close()
    return rootUrl
  } catch (error) {
    console.error(error.message);
    throw Error()
  }
}



