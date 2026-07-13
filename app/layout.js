import "../styles.css";

export const metadata = {
  title: "Launch Window",
  description: "Ocean go/no-go weekend checker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
