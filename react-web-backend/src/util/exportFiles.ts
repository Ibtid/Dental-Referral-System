import { errorhandler, successHandler } from './response.handler';

const path = require('path');
const xlsx = require('xlsx');
var pdf = require('pdf-creator-node');
var Readable = require('stream').Readable;
const fs = require('fs');

export function bufferToStream(buffer) {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

export const exportExcel = (
  data,
  workSheetColumnNames,
  workSheetName,
  extension,
) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

  const wbOpts = {
    bookType: extension === 'csv' ? 'csv' : 'xlsx',
    type: 'buffer',
  };
  const resp = xlsx.write(workBook, wbOpts); // write workbook buffer

  const base64 = resp.toString('base64');

  return base64;
};

export const exportPDF = async (document: any) => {
  try {
    await pdf.create(document);
  } catch (err) {
    return errorhandler(400, JSON.stringify(err.message));
  }

  var buffer = fs.readFileSync(document.path);
  const base64 = buffer.toString('base64');
  // const head = {
  //   'Content-Length': Buffer.byteLength(buffer),
  //   'Content-Type': 'application/pdf',
  // };
  // res.writeHead(200, head); // write

  //Delete the file
  fs.unlinkSync(path.resolve(document.path));

  // const stream = bufferToStream(buffer); // convert buffer to stream
  // stream.pipe(res); // send to client
  return base64;
};
