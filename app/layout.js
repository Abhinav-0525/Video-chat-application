export const metadata = {
  title: 'Video Chat App',
  description: 'Made by Abhinav Sai',
  icons: {
    icon: '/video.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0}}>{children}</body>
    </html>
  );
}