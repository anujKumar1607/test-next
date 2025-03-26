import Link from 'next/link';
const blogs = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
];

export default function BlogPage({ params }) {
  const blog = blogs.find((b) => b.id === parseInt(params.id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <Link href="/blogs">Back to Blogs</Link>
    </div>
  );
}
