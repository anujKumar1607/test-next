import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

const blogs = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
];

export default function BlogsPage() {
  return (
    <div className="container">
      <h1>All Blogs</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
