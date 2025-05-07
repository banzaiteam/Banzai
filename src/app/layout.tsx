import Page from "@/app/page";
import '../shared/styles/global.css' // Подключение глобальных стилей

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
