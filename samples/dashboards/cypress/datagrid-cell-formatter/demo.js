DataGrid.dataGrid('container', {
    dataTable: {
        columns: {
            date: [Date.UTC(2022, 0, 1)],
            product: ['Apples']
        }
    },
    columns: [{
        id: 'date',
        cellFormatter: function () {
            return new Date(this.value)
                .toISOString()
                .substring(0, 10);
        }
    }]
});
