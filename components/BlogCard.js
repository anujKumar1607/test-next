import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <h2>{post.heading}</h2>
      <p>{post.description.substring(0, 100)}...</p>
      <Link href={`/blogs/${post.id}`}>Read More</Link>
    </div>
  );
}
