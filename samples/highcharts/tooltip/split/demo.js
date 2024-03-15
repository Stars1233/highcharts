// Create the chart
Highcharts.chart('container', {

    chart: {
        type: 'spline'
    },

    title: {
        text: 'Mountain house indoor temperatures'
    },

    subtitle: {
        text: 'Split tooltips in Highcharts makes it easier to read ' +
            'overlapping line series'
    },

    tooltip: {
        valueSuffix: '°C',
        split: true,
        distance: 30,
        padding: 5
    },

    xAxis: {
        crosshair: {
            enabled: true
        }
    },

    yAxis: {
        title: {
            text: 'Temperatur'
        }
    },

    plotOptions: {
        series: {
            lineWidth: 1.5,
            marker: {
                radius: 2
            }
        }
    },

    data: {
        columns: [
            [
                'Time', 1451616120000, 1451865660000, 1451952060000,
                1452038400000, 1452124800000, 1452211200000, 1452297600000,
                1452384000000, 1452470400000, 1452556800000, 1452643200000,
                1452729600000, 1452816000000, 1452902400000, 1452988800000,
                1453075200000, 1453161600000, 1453248000000, 1453334400000,
                1453420800000, 1453507200000, 1453593600000, 1453680000000,
                1453766400000, 1453852800000, 1453939200000, 1454025600000
            ],
            [
                'Kitchen', 5, 4, 5, 9, 6, 15, 19, 14, 6, 5, 6, 6, 15, 18, 15,
                6, 6, 6, 6, 6, 6, 6, 16, 10, 6, 6, 6
            ],
            [
                'Living room', 9, 10, 16, 13, 6, 20, 24, 16, 7, 7, 6, 6, 20, 23,
                18, 9, 7, 6, 6, 7, 6, 21, 20, 16, 6, 6, 6
            ],
            [
                'Hall', 7, 7, 13, 12, 5, 17, 22, 14, 4, 5, 5, 6, 18, 21, 17, 9,
                5, 6, 5, 6, 6, 18, 20, 14, 5, 5, 5
            ],
            [
                'Bathroom', 7, 7, 13, 12, 5, 17, 22, 14, 4, 5, 5, 6, 18, 21, 17,
                9, 5, 6, 5, 6, 6, 18, 20, 14, 5, 5, 5
            ],
            [
                'Bedroom 1', 6, 19, 19, 10, 5, 15, 21, 14, 6, 6, 5, 5, 17, 21,
                16, 6, 5, 5, 5, 5, 5, 17, 18, 13, 5, 5, 5
            ],
            [
                'Bedroom 2', 7, 19, 19, 9, 5, 11, 19, 15, 6, 5, 6, 6, 16, 19,
                17, 8, 9, 6, 5, 6, 5, 17, 19, 14, 6, 6, 6
            ],
            [
                'Shed', 6, 6, 5, 5, 6, 6, 6, 5, 5, 6, 6, 5, 6, 6, 6, 6, 6, 6,
                null, null, 6, 6, 6, 6, 6, 6, 6
            ]
        ]
    }

});
