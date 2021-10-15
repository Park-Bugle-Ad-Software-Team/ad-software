import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './DataTable.css';

export default function DataTable( { tableData }) {
    const rows = tableData;

    // to format the time of a contract's start month
    const formatStartMonthTimestamp = (dateString) => {
        const options = { year: "numeric", month: "long"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // columns for the DataGrid
    const columns = [
        {field: 'companyName', headerName: 'Company', width: 180},
        {field: 'name', headerName: 'Advertiser', width: 180},
        {field: 'startMonth', headerName: 'Start Month', width: 180,
            valueFormatter: (params) => {
                return formatStartMonthTimestamp(params.row.startMonth);
            },
            // valueGetter is needed to filter properly
            valueGetter: (params) => {
                return formatStartMonthTimestamp(params.row.startMonth);
            }
        },
        {field: 'months', headerName: 'Length', width: 120,
            valueFormatter: (params) => {
                return `${params.row.months} months`
            },
            valueGetter: (params) => {
                return `${params.row.months} months`;
            }
        },
        {field: 'contractType', headerName: 'Type', width: 120},
        {field: 'adType', headerName: 'Size', width: 180},
        {field: 'desc', headerName: 'Description', width: 180},
        {field: 'columns', headerName: 'Columns', width: 180},
        {field: 'inches', headerName: 'Inches', width: 180},
        {field: 'page', headerName: 'Page', width: 120},
        {field: 'colorType', headerName: 'Color', width: 120},
        {field: 'colorPrice', headerName: 'Color Price', width: 180},
        {field: 'calculatedBill', headerName: 'Calculated Bill', width: 180},
        {field: 'actualBill', headerName: 'Actual Bill', width: 180,
            valueFormatter: (params) => {
                return `$${params.row.actualBill}`
            },
            valueGetter: (params) => {
                return `$${params.row.actualBill}`
            }
        },
        {field: 'commissionPercentage', headerName: 'Commission', width: 180},
        {field: 'isApproved', headerName: 'Approved', width: 180,
            valueFormatter: (params) => {
                if (params.row.isApproved === true) {
                    return `Yes`
                } else {
                    return `No`
                }
            },
            valueGetter: (params) => {
                if (params.row.isApproved === true) {
                    return `Yes`
                } else {
                    return `No`
                }
            }
        },
        {field: 'notes', headerName: 'Notes', width: 360}
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
                        checkboxSelection={false}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        filterModel={{
                            items: [{
                                columnField: 'startMonth',
                                operatorValue: 'contains',
                                value: `${formatStartMonthTimestamp(Date.now())}`
                            }]
                        }}
                    />
                </div>
            </div>
        </>
    );
}