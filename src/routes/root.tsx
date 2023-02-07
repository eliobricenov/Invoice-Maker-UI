import { Outlet } from "react-router-dom";
import { InvoiceLogo } from "../components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export async function loader() {
  return null;
}

export default function Root() {
  return (
    <>
      <div className="flex justify-between gap-4 border border-gray-200 p-8">
        <div className="inline-flex items-center gap-1">
          <InvoiceLogo width={40} height={40} />
          <p className="text-2xl font-bold">ETHVoice</p>
        </div>
        <ConnectButton showBalance={false} />
      </div>
      <div className="mx-auto max-w-[1536px] px-4 py-7">
        <Outlet />
      </div>
    </>
  );
}
