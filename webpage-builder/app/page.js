'use client';

import React, { useState } from 'react';
import AdminBuilder from '../components/AdminBuilder';
import PublicUserPanel from '../components/PublicUserPanel';
import WorkflowDashboard from '../components/WorkflowDashboard';

export default function Home() {
  const [viewMode, setViewMode] = useState('admin'); // 'admin' | 'public' | 'workflow'
  const [pageData, setPageData] = useState({ meta: { title: 'Untitled faculty page', author: 'Faculty' }, elements: [] });

  return (
    <main className="min-h-screen">
      {viewMode === 'admin' ? (
        <AdminBuilder 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToPublic={() => setViewMode('public')}
          onOpenWorkflow={() => setViewMode('workflow')}
        />
      ) : viewMode === 'public' ? (
        <PublicUserPanel 
          pageData={pageData} 
          setPageData={setPageData} 
          onSwitchToAdmin={() => setViewMode('admin')} 
        />
      ) : (
        <WorkflowDashboard pageData={pageData} onBack={() => setViewMode('admin')} />
      )}
    </main>
  );
}
