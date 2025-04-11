'use client';

import useSWR from 'swr';

import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

const blogs = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
];

const fetcher = async (url) => {
  const res = await fetch(url, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export default function BlogsPage() {
  const { data, error, isLoading } = useSWR(
    `${process.env.API_URL}/post`,
    fetcher
  );

  console.log('data', data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container">
      <h1 className="text-center font-bold font-size: var(--text-3xl)">
        My Posts
      </h1>
      <div className="blog-list">
        {data &&
          data.data.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
