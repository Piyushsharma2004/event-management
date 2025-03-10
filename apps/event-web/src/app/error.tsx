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
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-gray-800">
        <div className="max-w-md text-center space-y-8">
          <h1 className="text-3xl font-extrabold ">
            Oops! Something went wrong
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Home Button */}
            <Link 
              href="/board/orders"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg "
            >
             
              back
            </Link>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg "
            >
             
              Refresh
            </button>
          </div>

          {/* Error Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            
            <span>Error detected</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ErrorPage;