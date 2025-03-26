import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content.substring(0, 100)}...</p>
      <Link href={`/blogs/${blog.id}`}>Read More</Link>
    </div>
  );
}
