'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

interface InstaPost {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
  likes: number;
  comments: number;
}

export function InstaFeed() {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch Instagram gallery');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Error fetching gallery feed:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="aspect-square bg-cream/30 rounded-2xl animate-pulse flex items-center justify-center">
            <Instagram className="w-8 h-8 text-espresso/15 animate-bounce" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Visual Header */}
      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <div className="p-2.5 bg-espresso text-cream rounded-full">
          <Instagram className="w-6 h-6" />
        </div>
        <a
          href="https://instagram.com/braidbarnj"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-display)] text-xl font-bold hover:text-gold-dark transition-colors tracking-tight text-espresso"
        >
          @braidbarnj
        </a>
        <p className="text-xs text-charcoal/50">Follow us on Instagram for real-time protective styling lookbooks</p>
      </div>

      {/* Masonry-style portfolio grid */}
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {posts.map((post) => (
          <motion.a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="break-inside-avoid block rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm border border-espresso/5 bg-cream/10 select-none"
            whileHover={{ y: -4 }}
          >
            {/* Visual placeholder box with details */}
            <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-cream to-gold/5 flex items-center justify-center font-[family-name:var(--font-display)] text-espresso/10 text-7xl font-bold">
              {post.caption.charAt(0) || 'B'}
              
              {/* Image element if real url provided */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Hover overlay metrics display */}
              <div className="absolute inset-0 bg-espresso/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-cream text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-gold fill-gold" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-gold fill-gold" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>

            {/* Description Caption */}
            <div className="p-3 text-[10px] text-charcoal/60 leading-normal line-clamp-2 font-medium bg-glass-bg/10">
              {post.caption}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
export default InstaFeed;
