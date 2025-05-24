import Page from "@/app/page";
import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css';
import {Scroll} from "@shared/ui";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <body>
    <Scroll >
      <Page/>
    </Scroll>
    </body>
    </html>
  );
}
