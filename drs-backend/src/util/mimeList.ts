const mimeList = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf',
  csv: 'text/csv',
  doc: 'application/msword',
  docm: 'application/vnd.ms-word.document.macroenabled.12',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  json: 'application/json',
  ppt: 'application/vnd.ms-powerpoint',
  pptm: 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls: 'application/vnd.ms-excel',
  xlsb: 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
  xlsm: 'application/vnd.ms-excel.sheet.macroenabled.12',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xlt: 'application/vnd.ms-excel',
  xltm: 'application/vnd.ms-excel.template.macroenabled.12',
  xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  xlw: 'application/vnd.ms-excel',
  xm: 'audio/xm',
  xml: 'text/xml',
  xns: 'application/xcap-ns+xml',
};
export const getMimeType = (ext: string) => {
  return mimeList[ext.toLowerCase()];
};
