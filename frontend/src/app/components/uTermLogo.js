import Image from 'next/image';

export default function UTermLogo() {
  return (
    <div className="w-full max-w-[336px] aspect-[336/372]">
      <Image
        src="/images/uterm-logo.png"
        alt="UTerm Logo"
        width={336}
        height={372}
        className="w-full h-full object-contain"
      />
    </div>
  );
}