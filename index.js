const puppeteer = require('puppeteer');

(async ()=>{
//    1.打开浏览器
const browser=await puppeteer.launch({
    headless: truer++
})
//       2.打开标签页
    const page = await browser.newPage();
//     3.输入url地址
    await page.goto('https://movie.douban.com/coming');
//     4.等待网页加载完成，爬取数据
    const result = await page.evaluate(()=>{
        let result = [];
        // 开始爬取数据
        const $tds=$('.coming_list>tbody>tr').find('td:last');
        for (let i = 0; i < $tds.length; i++) {
            let $td = $($tds[i]);
            const num = +$td.text().split('人')[0];
            if (num >= 1000) {
                const href = $td.parent().find('td:nth(1)>a').attr('href');
                result.push(href);
            }

        }
        return result;
    });
    console.log(result);
//     5.关闭浏览器
    await browser.close();
})()
