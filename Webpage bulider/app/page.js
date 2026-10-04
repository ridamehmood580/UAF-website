'use client';

import React, { useState } from 'react';
import AdminBuilder from '../components/AdminBuilder';
import PublicUserPanel from '../components/PublicUserPanel';

export default function Home() {
  const [viewMode, setViewMode] = useState('admin'); // 'admin' | 'public'
  const [pageData, setPageData] = useState({ meta: { title: 'Untitled faculty page', author: 'Faculty' }, elements: [] });

  return (
    <main className="min-h-screen">
      {viewMode === 'admin' ? (
        <AdminBuilder 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToPublic={() => setViewMode('public')} 
        />
      ) : (
        <PublicUserPanel 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToAdmin={() => setViewMode('admin')} 
        />
      )}
    </main>
  );
}
