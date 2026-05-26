import React from 'react';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | PropScale AI`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <Link href="/blog" className="inline-flex items-center text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Intelligence
        </Link>

        <header className="mb-16">
          <time className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Markdown Content */}
        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-a:font-bold hover:prose-a:text-blue-700">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* CTA Section embedded at bottom of article */}
        <div className="mt-20 p-8 bg-slate-900 rounded-[32px] shadow-2xl text-center">
           <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-6 shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white fill-current" />
           </div>
           <h3 className="text-2xl font-black text-white tracking-tight mb-4">Dominate this market with PropScale AI.</h3>
           <p className="text-slate-400 text-sm font-medium mb-8 max-w-md mx-auto">
             Don&apos;t let manual follow-ups cost you another listing. Deploy our zero-config AI engine and capture every lead in under 30 seconds.
           </p>
           <a 
             href="https://propscale-ai.com/pricing"
             className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/10"
           >
             Start Your 3-Minute Setup
           </a>
        </div>

      </div>
    </div>
  );
}
