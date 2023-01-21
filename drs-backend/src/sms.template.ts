export const REFERRAL_SMS = (
  clinicName: string,
  patientName: string,
  investigations: any,
) => {
  return `Dear ${clinicName}, Thank you for refering ${patientName}. Investigation(s): ${investigations}`;
};
export const PAYMENT_SMS = (clinicName: string, month: string) => {
  return `Dear ${clinicName}, Your ${month} referral amount was paid`;
};
