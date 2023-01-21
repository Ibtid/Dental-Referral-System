export const downloadBlob = (blobFile: Blob, downloadAs: string) => {
  const url = window.URL.createObjectURL(blobFile);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", downloadAs);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
