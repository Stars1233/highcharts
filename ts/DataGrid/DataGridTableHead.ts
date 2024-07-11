/* *
 *
 *  Data Grid class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import DGUtils from './Utils.js';
import Utilities from '../Core/Utilities.js';
import DataGridColumn from './DataGridColumn.js';
import DataGridTable from './DataGridTable.js';
import Templating from '../Core/Templating.js';
import Globals from './Globals.js';
import DataModifier from '../Data/Modifiers/DataModifier.js';
import DataTable from '../Data/DataTable.js';

const { makeHTMLElement } = DGUtils;

const { format } = Templating;
const { addEvent } = Utilities;


/* *
 *
 *  Class
 *
 * */

/**
 * Represents a table header row containing the column names.
 */
class DataGridTableHead {

    /* *
    *
    *  Properties
    *
    * */

    /**
     * The visible columns of the table.
     */
    public columns: DataGridColumn[] = [];

    /**
     * The container of the table head.
     */
    public container: HTMLElement;

    /**
     * The viewport (table) the table head belongs to.
     */
    public viewport: DataGridTable;

    /**
     * Reference to sorting (descending) button.
     */
    public sortingBtnContainer?: HTMLElement;

    // /**
    //  * Reference to sorting (ascending) button.
    //  */
    // public sortingBtnAsc?: HTMLElement;

    // /**
    //  * Reference to sorting (descending) button.
    //  */
    // public sortingBtnDesc?: HTMLElement;

    /* *
    *
    *  Constructor
    *
    * */

    /**
     * Constructs a new table head.
     *
     * @param viewport
     * The viewport (table) the table head belongs to.
     */
    constructor(viewport: DataGridTable) {
        this.viewport = viewport;
        this.columns = viewport.columns;
        this.container = makeHTMLElement('tr', {}, viewport.theadElement);
        this.container.setAttribute('aria-rowindex', 1);
    }


    /* *
    *
    *  Methods
    *
    * */

    /**
     * Renders the table head content.
     */
    public render(): void {
        const vp = this.viewport;
        if (!vp.dataGrid.enabledColumns) {
            return;
        }

        let column: DataGridColumn;
        for (let i = 0, iEnd = this.columns.length; i < iEnd; ++i) {
            column = this.columns[i];
            const innerText = column.userOptions.headFormat ? (
                format(column.userOptions.headFormat, column)
            ) : column.id;

            const element = makeHTMLElement('th', {}, this.container);
            makeHTMLElement('span', {
                innerText,
                className: Globals.classNames.headCellContent
            }, element);

            // Set the accessibility attributes.
            element.setAttribute('scope', 'col');
            element.setAttribute('data-column-id', this.columns[i].id);

            column.setHeadElement(element);

            // resizing
            if (vp.columnsResizer && (
                vp.columnDistribution !== 'full' ||
                i < vp.dataGrid.enabledColumns.length - 1
            )) {
                // Render the drag handle for resizing columns.
                this.renderColumnDragHandles(
                    column,
                    element
                );
            }

            // sorting buttons
            if (column.userOptions.sorting) {
                this.renderColumnSortingButtons(
                    column,
                    element
                );
            }
        }
    }

    /**
     * Reflows the table head's content dimensions.
     */
    public reflow(): void {
        const { clientWidth, offsetWidth } = this.viewport.tbodyElement;
        const vp = this.viewport;

        for (let i = 0, iEnd = this.columns.length; i < iEnd; ++i) {
            const column = this.columns[i];
            const td = column.headElement;
            if (!td) {
                continue;
            }

            // Set the width of the column. Max width is needed for the
            // overflow: hidden to work.
            td.style.width = td.style.maxWidth = column.getWidth() + 'px';
        }

        if (vp.rowsWidth) {
            vp.theadElement.style.width = Math.max(vp.rowsWidth, clientWidth) +
                offsetWidth - clientWidth + 'px';
        }
    }

    /**
     * Render the drag handle for resizing columns.
     */
    private renderColumnDragHandles(
        column: DataGridColumn,
        headElement: HTMLElement
    ): HTMLElement {
        const handle = makeHTMLElement('div', {
            className: 'highcharts-dg-col-resizer'
        }, headElement);

        this.viewport.columnsResizer?.addHandleListeners(handle, column);

        return handle;
    }

    /**
     * Render the drag handle for resizing columns.
     */
    private renderColumnSortingButtons(
        column: DataGridColumn,
        headElement: HTMLElement
    ): void {

        if (!this.viewport.dataGrid.dataTable) {
            return;
        }

        const sortAsc = new DataModifier.types.Sort({
            direction: 'asc',
            orderByColumn: column.id
        });

        const sortDesc = new DataModifier.types.Sort({
            direction: 'desc',
            orderByColumn: column.id
        });

        this.sortingBtnContainer = makeHTMLElement('div', {
            className: 'highcharts-dg-col-sorting'
        }, headElement);

        const sortingBtnAsc = makeHTMLElement('button', {
            className: 'highcharts-dg-col-sorting-asc'
        },  this.sortingBtnContainer);

        addEvent(sortingBtnAsc, 'click', () => {
            this.viewport.dataGrid.update({
                table: sortAsc.modifyTable(
                    (this.viewport.dataGrid.dataTable as DataTable).clone()
                )
            });
        });

        const sortingBtnDesc = makeHTMLElement('button', {
            className: 'highcharts-dg-col-sorting-desc'
        },  this.sortingBtnContainer);

        addEvent(sortingBtnDesc, 'click', () => {
            this.viewport.dataGrid.update({
                table: sortDesc.modifyTable(
                    (this.viewport.dataGrid.dataTable as DataTable).clone()
                )
            });

            console.log('this.viewport.dataGrid', this.viewport.dataGrid);
        });
    }

    /**
     * Scrolls the table head horizontally.
     *
     * @param scrollLeft
     * The left scroll position.
     */
    public scrollHorizontally(scrollLeft: number): void {
        this.viewport.theadElement.style.transform =
            `translateX(${-scrollLeft}px)`;
    }
}


/* *
 *
 *  Class Namespace
 *
 * */

namespace DataGridTableHead {

}


/* *
 *
 *  Default Export
 *
 * */

export default DataGridTableHead;
