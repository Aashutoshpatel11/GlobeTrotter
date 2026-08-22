import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Generic check
    if 'isLoading' in content and 'useEffect' in content:
        return
        
    if 'CommunityHub()' in content:
        imports = "import React, { useState, useEffect } from 'react';\nimport { getCommunityPosts } from '../services/community.api.js';\n"
        content = re.sub(r"import React[^;]*;", imports, content, count=1)
        
        state_hook = """
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommunityPosts().then(res => {
      setPosts(res.data);
      setIsLoading(false);
    }).catch(err => {
      setError("Failed to load community posts.");
      setIsLoading(false);
    });
  }, []);
"""
        content = re.sub(r"const \[posts, setPosts\] = useState\(\[.*?\]\);", state_hook.strip(), content, flags=re.DOTALL)
        
        render_replacement = """
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {isLoading ? (
             [1,2,3,4,5].map(i => (
               <div key={i} className="break-inside-avoid bg-gray-200 animate-pulse h-64 rounded-3xl mb-6"></div>
             ))
          ) : posts.length === 0 ? (
             <div className="col-span-full py-12 text-center text-gray-500">No community posts yet. Be the first to share!</div>
          ) : (
             posts.map((post) => (
"""
        content = re.sub(r'<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">\s*\{posts\.map\(\(post\) => \(', render_replacement.strip(), content, flags=re.DOTALL)
        
    with open(filepath, 'w') as f:
        f.write(content)

for f in os.listdir('src/pages'):
    if f.endswith('.jsx'):
        process_file(os.path.join('src/pages', f))

