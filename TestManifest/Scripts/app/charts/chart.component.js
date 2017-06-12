(function () {
    "use strict";

    angular
        .module("offline.chart")
        .component("charts",
            {
                templateUrl: function () {
                    return "/ChartView/ChartResult";
                },
                bindings: {
                    data: "<"
                },
                controller: chartController,
                controllerAs: "vm"
            });

    chartController.$inject = ["$http", "$log"];

    function chartController($http, $log) {
        var vm = this;
        vm.wasAlreadyCalled = false;

        vm.$onChanges = function(changeObj) {
            //when filters change, update products and totalItems
            if (!changeObj.data.isFirstChange()) {
                vm.products = changeObj.data.currentValue.Items;
                vm.totalItems = changeObj.data.currentValue.TotalNoRecords;
                vm.facetGroups = changeObj.data.currentValue.FacetGroups;

                vm.pagination.current = 1;
            }
        }

        vm.chart = function () {

            //scope.$watch(function () { return scope.data; },
            //    function (newValue) {
            //        initChart(newValue.items);
            //    });

            function initChart(items) {
                var categories = items
                    .map(function (item) {
                        return item.name;
                    });

                var values = items
                    .map(function (item) {
                        return item.percentage;
                    });

                var chartConfig = {
                    xAxis: {
                        title: {text: ""},
                        categories: categories
                    },
                    credits: {
                        enabled: false
                    },
                    title: {text: ""},
                    yAxis: { min: 0, max: 100, title: {text:""} },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            return "<b>" + this.x.toString() + ":</b><br/> Capacity Utilization: " + Highcharts.numberFormat(this.y, 0) + " %";
                        }
                    },
                    legend: { enabled: false },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },
                    series: [
                        {
                            name: "Capacity",
                            type: "bar",
                            data: values
                        }
                    ]
                };

                var defaultOptions = {
                    chart: { renderTo: element[0] }
                };
                var config = angular.extend(defaultOptions, chartConfig);
                var chart = new Highcharts.Chart(config);
            }

            initChart(vm.data.items);
        }
    }
}());
