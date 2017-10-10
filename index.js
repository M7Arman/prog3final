const scrapeIt = require("scrape-it");
var request = require("request");
var jsonfile = require('jsonfile');
var promise = require('promise');
var merge = require('deepmerge');
var JSONPath = require('JSONPath');
var fx = require('money');


function getPageItems(pageNum) {
    var isFinished = false;
    var url = "https://www.list.am/category/23/" + pageNum;
    request({ url: url, followRedirect: false }, function (err, res, body) {
        if (res.headers.location != null) {
            console.log("Job Finished on page " + pageNum);
            isFinished = true;
            return;
        }
        var json = scrapeIt.scrapeHTML(body, {
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
        // console.log(json);
        amdToDollar(json.cars);
        //writeInFile(cars, "cars.json", "cars");

    });
    return isFinished;
}

function writeInFile(json, fileName, rootKey) {
    var resJson;
    jsonfile.readFile(fileName, function (err, fileData) {
        if (fileData != undefined && fileData[rootKey] != null) {
            resJson = merge(fileData[rootKey], json[rootKey], { arrayMerge: concatMerge });
        } else {
            resJson = json
        }
        jsonfile.writeFile(fileName, resJson, { spaces: 2, EOL: '\r\n' }, function (err) {
            if (null != err) {
                console.error("ERROR: " + err);
            }
        });
    })

}


//TODO: There is a bug with converting from AMD to USD
function amdToDollar(jsonArr) {
    JSONPath({json: jsonArr, path: "$..price", callback: function (data) {
        if(data.indexOf("֏") > -1) {
            var price = parseFloat(data.replace(",", ""));
            console.log("price", price);
            var a = fx.convert(price, {from: "AMD", to: "USD"});
            console.log(a);
        } 
    }});
}

function concatMerge(destinationArray, sourceArray, options) {
    destinationArray
    sourceArray
    options
    return destinationArray.concat(sourceArray)
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

timeout(1031);
