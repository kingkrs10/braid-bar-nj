/**
 * Instagram Gallery API Route
 * ===========================
 * Fetches the latest protective style posts from @braidbarnj.
 * Currently serves mock Instagram Graph API structures with placeholder visuals.
 */

import { NextResponse } from 'next/server';

const mockInstaPosts = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80',
    permalink: 'https://www.instagram.com/braidbarnj',
    caption: 'Soft blush knotless braids. Protective, elegant, and lightweight. ✨ #knotlessbraids #thebraidbar',
    likes: 142,
    comments: 18,
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80',
    permalink: 'https://www.instagram.com/braidbarnj',
    caption: 'Feed-in cornrows with dynamic grid parting. Sleek lines only. 📐🖤 #cornrows #braidbarnj',
    likes: 98,
    comments: 12,
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80',
    permalink: 'https://www.instagram.com/braidbarnj',
    caption: 'Mommy & Me private class session! Bonding through styling tutorials. 👩‍👧💛 #braidclass #salonnj',
    likes: 165,
    comments: 24,
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80',
    permalink: 'https://www.instagram.com/braidbarnj',
    caption: 'Signature Silk Press blowout. Mirror shine + healthy trims. 💆‍♀️✨ #silkpress #westorangenj',
    likes: 120,
    comments: 15,
  },
];

export async function GET() {
  // In production, fetch using:
  // const res = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`);
  
  return NextResponse.json({
    posts: mockInstaPosts,
  });
}
