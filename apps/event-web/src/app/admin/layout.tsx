import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
      
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
     
      </body>
    </html>
  );
}