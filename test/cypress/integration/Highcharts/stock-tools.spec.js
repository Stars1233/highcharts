describe('Stock Tools', () => {
    beforeEach(() => {
        cy.viewport(1000, 500);
    });

    before(() => {
        cy.visit('/stock/demo/stock-tools-gui');
    });

    it('#15730: Should close popup after hiding annotation', () => {
        cy.get('.highcharts-label-annotation').first().click();
        cy.get('.highcharts-container').click();
        cy.chart().should(chart =>
            assert.strictEqual(chart.annotations.length, 1)
        );
        cy.get('.highcharts-annotation').click();
        cy.get('.highcharts-popup').should('be.visible');
        cy.get('.highcharts-toggle-annotations').click();
        cy.get('.highcharts-popup').should('be.hidden');
        cy.get('.highcharts-toggle-annotations').click();
    });

    it('#15725: Should use the same axis for all points in multi-step annotation', () => {
        cy.get('.highcharts-elliott3').first().click();
        cy.get('.highcharts-container')
            .click(100, 210)
            .click(120, 260)
            .click(140, 210)
            .click(160, 260);
        cy.chart().should(chart =>
            chart.annotations[1].points.forEach(point =>
                assert.ok(point.y > -50 && point.y < 50)
            )
        );
    });
});

describe('An indicator on indicator, #15696.', () => {
    beforeEach(() => {
        cy.viewport(1000, 800);
    });

    before(() => {
        cy.visit('/stock/demo/stock-tools-gui');
    });

    it('There should be a possibility to add indicators based on other indicator, #15696.', () => {
        cy.openIndicators();

        cy.addIndicator(); // Add SMA indicator.

        cy.openIndicators();

        cy.get('#highcharts-select-series')
            .contains('SMA (14)')
        
        cy.get('#highcharts-select-series')
            .select('SMA (14)')

        cy.get('input[name="highcharts-sma-period"]')
            .eq(0)
            .clear()
            .type('20');

        cy.addIndicator(); // Add SMA indicator with period 20.

        cy.window().then((win) => {
            const H = win.Highcharts,
                chart = H.charts[0];

            // Select the first 3m period.
            chart.xAxis[0].setExtremes(1565098200000, 1565098200000 + 36e5 *24 *90);
        });

        cy.chart().should(chart =>
            // Select the first 3m period.
            assert.strictEqual(
                chart.series[2].processedXData.length - chart.series[3].processedXData.length,
                19,
                `The second SMA indicator which is based on the previous SMA indicator
                should be shifted by period (19) thus data should have 19 fewer points.`
            )
        );

        cy.openIndicators();

        cy.get('#highcharts-select-series')
            .contains('SMA (20)')

        cy.get('.highcharts-tab-item')
            .eq(1)
            .click(); // Open EDIT bookmark.

        cy.get('#highcharts-select-series')
            .contains('SMA (20)')
            .should('not.contain', 'SMA (14)')
    });
});