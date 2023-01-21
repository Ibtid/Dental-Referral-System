export const invoiceId = (id: string) => {
  const dateSegmentOfLastId = id.slice(3, 9);

  const todaysDate = new Date();
  let month = '' + (todaysDate.getMonth() + 1);
  let day = '' + todaysDate.getDate();
  const year = todaysDate.getFullYear().toString().slice(2);

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  const todaysDateSegment = year + month + day;

  if (todaysDateSegment === dateSegmentOfLastId) {
    const idSegment = Number.parseInt(id.slice(9, 14)) + 1;

    let concatedId;
    if (idSegment < 10) {
      concatedId = '0000' + idSegment.toString();
    } else if (idSegment < 100) {
      concatedId = '000' + idSegment.toString();
    } else if (idSegment < 1000) {
      concatedId = '00' + idSegment.toString();
    } else if (idSegment < 10_000) {
      concatedId = '0' + idSegment.toString();
    }

    const generatedId = 'INV' + todaysDateSegment + concatedId;
    return generatedId;
  } else {
    const generatedId = 'INV' + todaysDateSegment + '00001';
    return generatedId;
  }
};
