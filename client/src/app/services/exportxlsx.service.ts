import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportxlsxService {

  constructor() { }

exportToExcel(json: any[], excelFilename: string): void {

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet},
  SheetNames: ['data']
  };
  const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
  // call method buffer and filename
  this.saveAsExcel(excelBuffer, excelFilename);
  }

private saveAsExcel(buffer: any, filename: string){
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  FileSaver.saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXT);
}

}
