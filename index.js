const scrapeIt = require("scrape-it");
var request = require("request");
var jsonfile = require('jsonfile');
var promise = require('promise');


function getPageItems(pageNum) {
    var isFinished = false;
    var url = "https://www.list.am/category/23/" + pageNum;
    request({ url: url, followRedirect: false }, function (err, res, body) {
        if (res.headers.location != null) {
            console.log("Job Finished on page " + pageNum);
            isFinished = true;
            return;
        }
        var cars = scrapeIt.scrapeHTML(body, {
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
        });
        console.log(cars);
        jsonfile.writeFile('cars.json', cars, { spaces: 2, EOL: '\r\n' }, function (err) {
            if (null != err) {
                console.error("ERROR: " + err);
            }
        });
    });
    return isFinished;
}

function timeout(i) {
    to = setTimeout(function () {
        var isFinished = getPageItems(i);
        if (isFinished) {
            console.log("Is Finished!");
        }
        i++;
        timeout(i);

    }, 3000);
}

timeout(1);
