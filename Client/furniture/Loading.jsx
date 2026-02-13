import React from 'react'


export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fafafa]">
      <div className="flex flex-col items-center">
        
        {/* Loader Circle */}
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>

        {/* Text */}
        <p className="mt-3 text-sm text-gray-600">
          loding...
        </p>

      </div>
    </div>
  );
}

module.export={Loading}

  

