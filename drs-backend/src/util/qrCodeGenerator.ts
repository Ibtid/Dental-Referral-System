import * as QRCode from 'qrcode';
export const qrCodeGenerator = async (data: any) => {
    return await QRCode.toDataURL(JSON.stringify(data));
};