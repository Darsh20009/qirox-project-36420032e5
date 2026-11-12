import { QRCodeSVG } from "qrcode.react";
import { OFFICIAL_DONATION_URL } from "@/lib/donation-portal";

type DonationQrCodeProps = {
  size?: number;
  className?: string;
};

export function DonationQrCode({ size = 128, className }: DonationQrCodeProps) {
  return (
    <QRCodeSVG
      value={OFFICIAL_DONATION_URL}
      size={size}
      level="H"
      includeMargin
      className={className}
      title="رمز منصة التبرع الرسمية لجمعية معين"
    />
  );
}
