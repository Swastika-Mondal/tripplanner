import React from 'react';

// Helper function to create skeletons for each section
const SkeletonLoader = ({ className, height, width }) => (
  <div className={`${className} bg-gray-300 animate-pulse`} style={{ height, width }}></div>
);

function ShowItinerarySkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <div className="bg-[#2c1810] text-white">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 rounded-full bg-[#6a4e33] bg-opacity-20 mb-6">
              <SkeletonLoader className="w-12 h-12" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <SkeletonLoader className="w-2/4 h-8" />
            </h1>
            <div className="text-xl text-[#e6b17e]">
              <SkeletonLoader className="w-1/2 h-6" />
            </div>
          </div>
        </header>

        <nav className="bg-[#1a0f0a] sticky top-0 z-50 border-t border-[#3d261b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center -mb-px">
              {/* Skeleton for each Day */}
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  className="relative py-6 px-8 text-lg font-medium text-gray-400 hover:text-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <SkeletonLoader className="w-5 h-5" />
                    <SkeletonLoader className="w-20 h-6" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#e6b17e] to-transparent"></div>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e6b17e]/20">
              <h2 className="text-2xl font-bold text-[#2c1810] mb-4">
                <SkeletonLoader className="w-2/4 h-8" />
              </h2>
              <div className="text-gray-600">
                <SkeletonLoader className="w-full h-6" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#2c1810]">
                  <SkeletonLoader className="w-5 h-5" />
                  <span className="font-medium">Today's Schedule</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <SkeletonLoader className="w-6 h-6 rounded-full" />
                      <SkeletonLoader className="w-3/4 h-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e6b17e]/20">
              <SkeletonLoader className="w-full h-96" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#2c1810] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SkeletonLoader className="w-6 h-6" />
                <span className="text-xl font-semibold">
                  <SkeletonLoader className="w-32 h-6" />
                </span>
              </div>
              <div className="text-gray-400">
                <SkeletonLoader className="w-3/4 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                <SkeletonLoader className="w-3/4 h-6" />
              </h3>
              <ul className="space-y-2 text-gray-400">
                {[...Array(3)].map((_, idx) => (
                  <li key={idx}>
                    <SkeletonLoader className="w-3/4 h-6" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                <SkeletonLoader className="w-3/4 h-6" />
              </h3>
              <div className="text-gray-400">
                <SkeletonLoader className="w-full h-6" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#3d261b] text-center text-gray-400">
            <div>
              <SkeletonLoader className="w-1/4 h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShowItinerarySkeleton;
