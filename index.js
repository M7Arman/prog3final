const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')

function getPageItems(pageNum) {
    console.log("aAAAaaaaa")
    // Promise interface
    scrapeIt("https://www.list.am/category/23/" + pageNum, {
        cars: {
            listItem: ".gl a",
            data: {
                image: {
                    selector: "img",
                    attr: "src"
                },
                title: "div.l:nth-child(2)",
                price: ".l2 .l",
                url: {
                    attr: 'href'
                }
            }
        }

    }).then(page => {
        console.log(page);
        jsonfile.writeFile('cars.json', page, { spaces: 2, EOL: '\r\n' }, function (err) {
            console.error(err)
        })
    }).then(()=>{console.log('-----!!!')});

}
var i = 0;
while (i < 2) {
    i++;
    setTimeout(getPageItems, 1500, i);
    console.log("++++++++++++++++")
}

