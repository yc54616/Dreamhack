const puppeteer = require('puppeteer');

if (process.argv.length != 3) {
	console.error("Invalid invoke");
	process.exit(1);
}

let url = process.argv[2];
url = Buffer.from(url, "base64").toString("utf8");

if (!url.startsWith("http://localhost/")) {
	console.error("Invalid URL");
	process.exit(1);
}

console.log(url);

(async () => {
  const browser = await puppeteer.launch({
	  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(3000);
  await page.goto(url);
  await browser.close();
})();
