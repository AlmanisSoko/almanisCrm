import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        // <Button variant="warning" onClick={(e) => exportToCSV(csvData,fileName)}>Export</Button>
        <button className="btn btn-icon btn-outline-white ms-2 export dropdown d-inline" data-type="csv" onClick={(e) => exportToCSV(csvData,fileName)}>
            <span className="btn-inner--icon">
                <i className="fa-regular fa-file-excel"></i>
            </span>
            <span className="btn-inner--text"> Export CSV</span>
        </button>
    )
} 