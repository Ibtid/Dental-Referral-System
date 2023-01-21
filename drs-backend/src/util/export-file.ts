import { errorhandler } from './response.handler';
import * as path from 'node:path';
import xlsx from 'xlsx';
import * as pdf from 'pdf-creator-node';
import * as fs from 'node:fs';
let Readable = require('stream').Readable;
// import * from ('stream').Readable

export function bufferToStream(buffer) {
  let stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

export const exportExcel = (
  data: any,
  workSheetColumnNames: any,
  workSheetName: any,
  extension: string,
) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

  const resp = xlsx.write(workBook, {
    bookType: extension === 'csv' ? 'csv' : 'xlsx',
    type: 'buffer',
  }); // write workbook buffer
  const base64 = resp.toString('base64');
  return base64;
};

export const exportPDF = async (document: any) => {
  try {
    await pdf.create(document);
  } catch (error) {
    return errorhandler(400, JSON.stringify(error.message));
  }
  const buffer = fs.readFileSync(document.path);
  const base64 = buffer.toString('base64');
  fs.unlinkSync(path.resolve(document.path));

  return base64;
};

export const convertFileToBase64 = (documentPath: string) => {
  const buffer = fs.readFileSync(documentPath);
  const ext = documentPath.slice(
    (Math.max(0, documentPath.lastIndexOf('.')) || Infinity) + 1,
  );
  const base64 = buffer.toString('base64');
  return { base64, ext };
};

export const convertFileToByteArray = (relativePath: string, res) => {
  // const absolutePath = path.resolve(relativePath);
  let buffer = fs.readFileSync(relativePath);
  const head = {
    'Content-Length': Buffer.byteLength(buffer),
    'Content-Type': 'image/jpeg',
  };
  res.writeHead(200, head);

  const stream = bufferToStream(buffer); // convert buffer to stream
  stream.pipe(res); // send to client
};
