google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawAreaChart);
google.charts.setOnLoadCallback(drawGeoChart);
google.charts.setOnLoadCallback(drawTable);

var URL = "https://www.list.am";

function drawPieChart() {
    var chartData = [
        ['Less then 1500$', 0],
        ['1500$ - 4000$', 0],
        ['More than 4000$', 0]
    ];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (cars) {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].price == "") continue;
                cars[i].price.replace("0", ".");
                console.log("aaa", cars[i].price);
                var price = parseFloat(cars[i].price.replace(/\D/g, ''), 10);
                console.log("price", price)
                if (price < 1500) {
                    chartData[0][1]++;
                } else if (price < 4000) {
                    chartData[1][1]++;
                } else if (price < 17000) { //NOTE: to handle issue with amd prices
                    chartData[2][1]++;
                }
            }
            console.log(chartData);
            data.addRows(chartData);


            var options = {
                legend: 'left',
                title: 'Air Composition',
                is3D: false,
                width: '100%',
                height: '100%'
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
}

function drawColumnChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ]);

    var options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: 'red' } }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
}

function drawAreaChart() {
    var date = [
        ['Year', 'Cars'],
        ['until 1990', 0],
        ['1990 - 2000', 0],
        ['2000 - 2005', 0],
        ['2005 - 2010', 0],
        ['since 2010', 0]
    ];
    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (cars) {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].title == "") continue;
                var yearWithText = cars[i].title.split(", ");
                if (yearWithText[1] == undefined) continue;
                var year = parseInt(yearWithText[1], 10);
                if (year < 1990) {
                    date[1][1]++;
                } else if (year < 2000) {
                    date[2][1]++;
                } else if (year < 2005) {
                    date[3][1]++;
                } else if (year < 2010) {
                    date[4][1]++;
                } else {
                    date[5][1]++;
                }
            }
            var data = google.visualization.arrayToDataTable(date);

            var options = {
                title: 'Cars in list.am',
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 }
            };

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
            chart.draw(data, options);
        }
    });

}

function drawGeoChart() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
    ]);

    var chart = new google.visualization.GeoChart(document.getElementById('region_map_div'));
    chart.draw(data, null);
}

function drawTable() {
    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Names');
            data.addColumn('string', 'Prices');
            data.addColumn('string', 'Year');
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].title == "") {
                    continue;
                }
                var carData = jsonData[i].title.split(", ");
                if (carData[1] == undefined) continue;
                var dotI = carData[1].indexOf('.');
                var year = carData[1].substring(0, dotI != -1 ? dotI : carData[1].length);
                data.addRow([
                    "<a href=\"" + (URL + jsonData[i].url) + "\">" + carData[0] + "</a>",
                    jsonData[i].price,
                    year,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawAreaChart();
    drawTable();
});
