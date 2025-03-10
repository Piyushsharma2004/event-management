'use client';

import { memo } from 'react';
import Link from 'next/link';

const NotFound = memo(() => {
  const handleRefresh = () => {
    // Using requestAnimationFrame for smoother UI updates
    requestAnimationFrame(() => {
      window.location.reload();
    });
  };

  return (
    <>  
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary-200 p-4">
    
      <div className="mx-auto max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for is currently under development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            
          </Link>
          
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
           
            Refresh
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600">
         
          <span>Development in Progress</span>
        </div>
      </div>
    </main>
    </>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;