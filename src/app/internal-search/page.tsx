'use client';

import { useState } from 'react';
import { Search, Loader2, ExternalLink } from 'lucide-react';

export default function InternalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Internal Knowledge Search</h1>
          <p className="text-gray-600">Search through PropScale AI's indexed knowledge base.</p>
        </header>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pricing, features, documentation..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Score: {(result.score * 100).toFixed(1)}%
                  </span>
                  <a
                    href={result.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  {result.text}
                </p>
                <div className="text-xs text-gray-400">
                  Source: <span className="text-gray-600">{result.source}</span>
                </div>
              </div>
            ))
          ) : query && !isLoading ? (
            <div className="text-center py-20 text-gray-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
