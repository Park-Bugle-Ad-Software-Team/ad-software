import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import './DataTable.css';

export default function DataTable( { tableData }) {
    const rows = tableData;

    // columns for the DataGrid
    const columns = [
        {field: 'startMonth', headerName: 'Start Month', width: 180},
        {field: 'months', headerName: 'Length', width: 120},
        {field: 'contractType', headerName: 'Type', width: 120},
        {field: 'adType', headerName: 'Size', width: 180},
        {field: 'page', headerName: 'Page', width: 120},
        {field: 'colorType', headerName: 'Color', width: 180},
        {field: 'actualBill', headerName: 'Cost', width: 120},
    ];

    function customToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }

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