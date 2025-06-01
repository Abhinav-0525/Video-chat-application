export const metadata = {
  title: 'Video Chat App',
  description: 'A video chat application.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0}}>{children}</body>
    </html>
  );
}