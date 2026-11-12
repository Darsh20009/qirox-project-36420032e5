import { QRCodeSVG } from "qrcode.react";
import { OFFICIAL_DONATION_URL } from "./_runtime";

type Props = { size?: number; className?: string };
export function DonationQrCode({ size = 128, className }: Props) {
  return <QRCodeSVG value={OFFICIAL_DONATION_URL} size={size} level="H" includeMargin className={className} title="رمز منصة التبرع الرسمية لجمعية معين" />;
}
