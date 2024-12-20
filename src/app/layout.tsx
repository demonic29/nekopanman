import "./globals.css";

export const metadata = {
  title: "MoriMori",
  description: "An application for who want to design their own album",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>{children}</body>
    </html>
  );
}
