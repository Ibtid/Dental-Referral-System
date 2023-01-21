import { TContentType } from "../../types/utils/base64ToBlob";

export const base64toBlobConverter = (
  b64Data: string,
  contentType: TContentType,
  sliceSize: number = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  const byteCharactersLength = byteCharacters.length;
  for (let offset = 0; offset < byteCharactersLength; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const sliceLength = slice.length;
    const byteNumbers = new Array(sliceLength);
    for (let i = 0; i < sliceLength; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
