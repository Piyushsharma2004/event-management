'use client';

import { memo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';



const ErrorPage = memo(() => {
  const handleRefresh = () => {
    requestAnimationFrame(() => {
      window.location.reload();
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-300 via-blue-200 to-blue-100">
      
      <h1>ok error</h1>
    </div>
  );
});

export default ErrorPage;