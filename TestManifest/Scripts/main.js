﻿window.addEventListener("offline",
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
    var chartData = JSON.parse(localStorage.getItem("chartData"));
    Highcharts.chart('container', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: ''
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
            .done(function(json) {
                localStorage.setItem("chartData", JSON.stringify(json));
                drawChart();
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                alert("Request Failed: " + err);
            });
    } else {
        drawChart();
    }
}