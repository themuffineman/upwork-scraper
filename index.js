import puppeteer from "puppeteer";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getRootDomain } from "./utils.js";

const server = express();
server.use(bodyParser.json());
server.use(
  cors({
    origin: "*",
  }),
);
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.post("/scrape/yelp", async (req, res) => {
  const { industry, location, pagination } = req.body;
  let browser;
  let page;
  console.info("Received Request");
  try {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(
      `https://www.yelp.com/search?find_desc=${industry}&find_loc=${location}&start=${pagination * 10}`,
    );
    if (page.$(h3.y - css - n2l5h3)) {
      return res.status(400).send({
        message: "No more results",
      });
    }
    await page.locator("ul.list__09f24__ynIEd").wait();
    const results = await page.$$eval("ul.list__09f24__ynIEd li", async () => {
      const result = [];
      const list = document.querySelectorAll("ul.list__09f24__ynIEd li");
      for (const item of list) {
        const name = item.querySelector("a.y-css-12ly5yx").innerText;
        const businessPageUrl = item.querySelector("a.y-css-12ly5yx").href;

        const businessPage = await browser.newPage();
        await businessPage.goto(businessPageUrl);
        await businessPage.locator("a.y-css-1rq499d").wait();

        const businessWebsite = await businessPage.$eval(
          "a.y-css-1rq499d",
          (el) => getRootDomain(el.href, browser),
        );
        const businessPhone = await businessPage.$eval(
          "p.y-css-1o34y7f",
          (el) => el.innerText,
        );

        result.push({
          name,
          website: businessWebsite,
          phone: businessPhone,
          source: "yelp",
        });
        await businessPage.close();
      }
      return result;
    });
    res.json({ results }).status(200);
  }catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }finally{
    await page.close();
    await browser.close();
  }
});
