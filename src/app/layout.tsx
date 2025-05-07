import Page from "@/app/page";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body><Page/></body>
    </html>
  );
}
