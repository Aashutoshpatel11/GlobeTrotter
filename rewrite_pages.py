import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Generic check if it's already refactored
    if 'isLoading' in content and 'useEffect' in content:
        return
        
    # We will inject standard loading/error/empty hooks
    
    # 1. Dashboard
    if 'Dashboard()' in content:
        imports = "import React, { useState, useEffect } from 'react';\nimport { getUpcomingTrips } from '../services/trips.api.js';\n"
        content = re.sub(r"import React[^;]*;", imports, content, count=1)
        
        # Replace hardcoded array with state
        state_hook = """
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpcomingTrips().then(res => {
      setUpcomingTrips(res.data);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load trips. Please try again.");
      setIsLoading(false);
    });
  }, []);
"""
        content = re.sub(r"const upcomingTrips = \[.*?\];", state_hook.strip(), content, flags=re.DOTALL)
        
        # Inject error banner and skeleton
        render_replacement = """
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
          
          <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {isLoading ? (
               [1,2,3].map(i => (
                 <div key={i} className="min-w-[280px] w-[280px] h-[240px] bg-gray-200 animate-pulse rounded-2xl"></div>
               ))
            ) : upcomingTrips.length === 0 ? (
               <div className="w-full py-12 text-center text-gray-500">No trips found. <Link to="/create-trip" className="text-[var(--primary)] hover:underline">Start a new one!</Link></div>
            ) : (
               upcomingTrips.map((trip) => (
"""
        content = re.sub(r"<div className=\"flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0\">\s*\{upcomingTrips\.map\(\(trip\) => \(", render_replacement.strip(), content, flags=re.DOTALL)
        
    # 2. ExploreActivities
    if 'ExploreActivities()' in content:
        imports = "import React, { useState, useEffect } from 'react';\nimport { getActivities } from '../services/discovery.api.js';\n"
        content = re.sub(r"import React[^;]*;", imports, content, count=1)
        
        state_hook = """
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActivities().then(res => {
      setActivities(res.data);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load activities.");
      setIsLoading(false);
    });
  }, []);
"""
        content = re.sub(r"const \[activities, setActivities\] = useState\(\[.*?\]\);", state_hook.strip(), content, flags=re.DOTALL)
        
        render_replacement = """
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
             [1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-white rounded-3xl h-[400px] border border-gray-100 flex flex-col group overflow-hidden">
                 <div className="h-[200px] bg-gray-200 animate-pulse"></div>
                 <div className="p-5 flex-1 space-y-3">
                   <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                   <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                   <div className="h-20 bg-gray-200 animate-pulse rounded w-full"></div>
                 </div>
               </div>
             ))
          ) : activities.length === 0 ? (
             <div className="col-span-full py-12 text-center text-gray-500">No activities found matching your criteria.</div>
          ) : (
             activities.map((act) => (
"""
        content = re.sub(r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\s*\{activities\.map\(\(act\) => \(', render_replacement.strip(), content, flags=re.DOTALL)
        
    with open(filepath, 'w') as f:
        f.write(content)

for f in os.listdir('src/pages'):
    if f.endswith('.jsx'):
        process_file(os.path.join('src/pages', f))

