import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import './DataTable.css';

export default function DataTable( { tableData }) {
    const rows = tableData;

    // so that we don't get the whole toolbar,
    // we specify only these two
    function customToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <GridToolbarExport csvOptions={{ allColumns: true }}/>
            </GridToolbarContainer>
        );
    }

    // to format the time of a contract's start month
    const formatStartMonthTimestamp = (dateString) => {
        const options = { year: "numeric", month: "long"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // to format the length to add 'months' to the value
    function generateMonthsString(item) {
        return (`
            ${item} months
        `);
    }

    // to add a $ to the cost value
    function generateDollarSign(item) {
        return (`
            $${item}
        `);
    }

    // columns for the DataGrid
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'companyName', headerName: 'Company', width: 180},
        {field: 'name', headerName: 'Advertiser', width: 180},
        {field: 'contactPreference', headerName: 'Contact Pref', width: 180},
        {field: 'startMonth', headerName: 'Start Month', width: 180,
            valueFormatter: (params) => {
                return formatStartMonthTimestamp(params.row.startMonth);
            }
        },
        {field: 'months', headerName: 'Length', width: 120,
            valueFormatter: (params) => {
                return generateMonthsString(params.row.months)
            }
        },
        {field: 'contractType', headerName: 'Type', width: 120},
        {field: 'adType', headerName: 'Size', width: 180},
        {field: 'page', headerName: 'Page', width: 120},
        {field: 'colorType', headerName: 'Color', width: 120},
        {field: 'actualBill', headerName: 'Cost', width: 120,
            valueFormatter: (params) => {
                return generateDollarSign(params.row.actualBill);
            }
        },
    ];

    return (
        <>
            <div className="dataTable">
                <div>
                    <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={100}
                        checkboxSelection
                        components={{
                            Toolbar: customToolbar,
                        }}
                    />
                </div>
            </div>
        </>
    );
}