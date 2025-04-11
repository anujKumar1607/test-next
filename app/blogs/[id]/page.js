import Link from 'next/link';
import { cookies } from 'next/headers';

const getPostDetail = async (url) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get('token')?.value;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export default async function BlogPage({ params }) {
  // const post = await getPostDetail(`http://localhost:3000/api/posts/5`);

  // if (!post) {
  //   return <div>Blog not found</div>;
  // }

  const post = {
    id: '1',
    title: 'The Ultimate Guide to Next.js and Tailwind CSS',
    description:
      'Learn how to build modern web applications with Next.js and style them beautifully using Tailwind CSS. This comprehensive guide covers everything from setup to deployment.',
    imageUrl:
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    username: 'webdev_expert',
    date: 'May 15, 2023',
    tags: ['Next.js', 'Tailwind CSS', 'React', 'Web Development'],
    content: `
      <p>Next.js has revolutionized the way we build React applications by providing server-side rendering, static site generation, and API routes out of the box.</p>
      <p>When combined with Tailwind CSS, you get a powerful combination that allows for rapid UI development without sacrificing performance or customization.</p>
      <h2>Getting Started</h2>
      <p>To create a new Next.js project with Tailwind CSS, run the following commands:</p>
      <pre><code>npx create-next-app my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init</code></pre>
      <p>Then configure your tailwind.config.js and postcss.config.js files according to the official documentation.</p>
    `,
  };

  // Sample comments data
  const comments = [
    {
      id: 1,
      username: 'react_lover',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: 'May 16, 2023',
      text: 'Great tutorial! I especially liked the section on dynamic routing.',
      rating: 5,
    },
    {
      id: 2,
      username: 'css_wizard',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: 'May 17, 2023',
      text: 'Would love to see more examples of dark mode implementation with this setup.',
      rating: 4,
    },
    {
      id: 3,
      username: 'newbie_dev',
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: 'May 18, 2023',
      text: 'This helped me so much with my first project. Thank you!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Compact Breadcrumbs */}
        <nav className="flex mb-4">
          <ol className="inline-flex items-center space-x-2 text-sm">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Posts
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800 font-medium truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Compact Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {post.title}
        </h1>

        {/* Author and Date - Compact */}
        <div className="flex items-center mb-4">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={`https://i.pravatar.cc/150?u=${post.username}`}
            alt={post.username}
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{post.username}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{post.date}</span>
              <span className="mx-1.5">·</span>
              <span>8 min read</span>
            </div>
          </div>
        </div>

        {/* Compact Rating */}
        <div className="flex items-center mb-5">
          <div className="flex items-center mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(post.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-600">
            {post.rating} ({12} ratings)
          </span>
        </div>

        {/* Attractive Featured Image with Gradient Overlay */}
        <div className="relative mb-6 rounded-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent z-10"></div>
          <img
            className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            src={post.imageUrl}
            alt={post.title}
          />
          <p className="absolute bottom-3 left-3 text-xs text-white/90 z-20">
            Photo by Unsplash
          </p>
        </div>

        {/* Post Content */}
        <div
          className="prose prose-sm max-w-none text-gray-700 mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Compact Action Buttons */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>42</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{comments.length} comments</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>Save</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Comments ({comments.length})
          </h2>

          {/* Compact Comment Form */}
          <form className="mb-6">
            <div className="flex items-start space-x-3">
              <img
                className="w-8 h-8 rounded-full mt-1"
                src="https://i.pravatar.cc/150?img=5"
                alt="Your avatar"
              />
              <div className="flex-1">
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </form>

          {/* Compact Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  className="w-8 h-8 rounded-full mt-0.5"
                  src={comment.avatar}
                  alt={comment.username}
                />
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {comment.username}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <time>{comment.date}</time>
                        <button className="ml-2 text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <button className="hover:text-blue-600">Like</button>
                      <button className="hover:text-blue-600">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
