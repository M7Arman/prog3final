const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')


// Promise interface
scrapeIt("https://www.list.am/category/23", {
    cars: {
        listItem: ".h",
        data: {
            image: {
                selector: "img",
                attr: "src"
            },
            title: "div.l:nth-child(2)",
            price: ".l2 .l",
        }
    }
    
}).then(page => {
    console.log(page);
    jsonfile.writeFile('cars.json', page, {spaces: 2, EOL: '\r\n'}, function(err) {
        console.error(err)
    })
});