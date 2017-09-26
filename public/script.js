google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawAreaChart);
google.charts.setOnLoadCallback(drawGeoChart);
google.charts.setOnLoadCallback(drawTable);

function drawPieChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]
    ]);

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
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
    ]);

    var options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
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
            data.addColumn('number', 'imagesCount');

            for (var i = 0; i < jsonData.length; i++) {
                if(jsonData[i].title == "") {
                    continue;
                }
                console.log(jsonData[i].title);
                var carData = jsonData[i].title.split(", ");
                if(carData[1] == undefined) continue;
                var dotI = carData[1].indexOf('.');
                var year = carData[1].substring(0, dotI != -1 ? dotI : carData[1].length);
                data.addRow([
                    carData[0],
                    jsonData[i].price,
                    year,
                    jsonData[i].imagesCount,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawAreaChart();
    drawRegionsMap();
    drawTable();
});
