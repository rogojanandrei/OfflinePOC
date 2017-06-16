var db;

$("#noYears").on("change", function () {
    drawChart();
});

window.addEventListener("offline",
    function (e) {
        updateUIStatus(false);
    },
    false);

window.addEventListener("online",
    function (e) {
        updateUIStatus(true);
    },
    false);

function updateUIStatus(online) {
    var img = document.getElementById("logo");

    if (online) {
        img.setAttribute("src", img.getAttribute("data-online"));

    } else
        img.setAttribute("src", img.getAttribute("data-offline"));
}

function drawChart() {
    var noYears = 1 * $("#noYears").val();

    // read from indexed db.
    db.series.toArray().then(function (result) {
        $.each(result, function (key, item) {
            if (item.data !== [] && item.data !== null)
                item.data.splice(noYears, item.data.length - noYears);
        });
        renderChart(result);
    }).catch(function (error) {
        console.log("Error reading from DB.");
    });
}

function renderChart(chartData) {
    Highcharts.chart('container', {
        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false
        },
        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                pointStart: 2010
            }
        },
        series: chartData

    });
}

function loadData(online) {

    if (localStorage.getItem("chartData") === null) {

        if (!online) {
            alert("cannot load data while offline");
        }

        var url = $("#container").attr("data-api-url");
        $.getJSON(url)
            .done(function (json) {
                // add in Db
                writeDataInIndexedDb(json);
                drawChart();
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                alert("Request Failed: " + err);
            });
    } else {
        drawChart();
    }
}

function initDB() {
    db = new Dexie("offlineDb");
}

function writeDataInIndexedDb(series, version) {
    initDB();

    db.version(1).stores({
        series: "name,data"
    });

    //todo bulk insert
    $.each(series, function (key, item) {
        db.series
            .put(item)
            .then(function () {
                console.log("data stored.");
            })
            .catch(function (error) {
                console.log("Error when try to store data in the indexed db: " + error);
            });
    });
}
