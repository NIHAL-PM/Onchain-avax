import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "OnchainSIP",
  description: "Decentralized Systematic Investment Plans on Avalanche Fuji Testnet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
