'use client';

import React, { useState } from 'react';
import AdminBuilder from '../components/AdminBuilder';
import PublicUserPanel from '../components/PublicUserPanel';
import WorkflowDashboard from '../components/WorkflowDashboard';
import PublishedPagesDashboard from '../components/PublishedPagesDashboard';

export default function Home() {
  const [viewMode, setViewMode] = useState('admin'); // 'admin' | 'public' | 'publish' | 'published'
  const [pageData, setPageData] = useState({ meta: { title: 'Untitled faculty page', author: 'Faculty' }, elements: [] });

  return (
    <main className="min-h-screen">
      {viewMode === 'admin' ? (
        <AdminBuilder 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToPublic={() => setViewMode('public')}
          onOpenWorkflow={() => setViewMode('publish')}
          onOpenPublished={() => setViewMode('published')}
        />
      ) : viewMode === 'public' ? (
        <PublicUserPanel 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToAdmin={() => setViewMode('admin')} 
        />
      ) : viewMode === 'publish' ? (
        <WorkflowDashboard pageData={pageData} onBack={() => setViewMode('admin')} />
      ) : (
        <PublishedPagesDashboard
          onBack={() => setViewMode('admin')}
          onReloadDesign={(design) => {
            setPageData({ ...design, elements: Array.isArray(design.elements) ? design.elements.map(element => ({ ...element })) : [] });
            setViewMode('admin');
          }}
        />
      )}
    </main>
  );
}
