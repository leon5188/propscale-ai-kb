import React from 'react';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'PropScale AI | Market Intelligence Blog',
  description: 'Data-driven real estate market reports and AI automation strategies.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-[10px] uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3 mr-2 fill-blue-500" />
            Market Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            Real Estate <br />
            <span className="text-blue-600">Data Reports.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Deep analysis on local markets, Zillow trends, and how AI is changing the speed-to-lead equation.
          </p>
        </div>

        {/* Blog List Grid */}
        {posts.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium">No reports generated yet. Run the content factory script.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-bl-[100px]"></div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <time className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 flex-1">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Analysis <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
