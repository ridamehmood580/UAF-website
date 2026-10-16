'use client';

import dynamic from 'next/dynamic';

// The portal stores CMS/faculty data in localStorage, so it renders in the browser only.
const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-semibold">
      Loading UAF Portal…
    </div>
  ),
});

export default function Home() {
  return <App />;
}
