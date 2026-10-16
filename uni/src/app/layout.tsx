import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'University of Agriculture, Faisalabad (UAF) | Admissions & Academic Portal',
  description:
    "Official Web Portal of University of Agriculture, Faisalabad (UAF) - Pakistan's premier agricultural, veterinary, engineering, and science university established in 1906.",
  openGraph: {
    title: 'University of Agriculture, Faisalabad (UAF)',
    description:
      "Official Web Portal of University of Agriculture, Faisalabad (UAF) - Pakistan's premier agricultural, veterinary, engineering, and science university established in 1906.",
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/uaf_logo.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <link rel="preload" as="image" href="/uaf_main_building_renewed.jpg" />
      </head>
      <body className="bg-white text-stone-900 font-sans antialiased selection:bg-[#163887] selection:text-white">
        {children}
      </body>
    </html>
  );
}
