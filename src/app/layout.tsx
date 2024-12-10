
import "./globals.css";
import { Providers } from "./Provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
      <body
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
