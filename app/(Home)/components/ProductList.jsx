import Product from './Product';

const ProductList = async () => {
  //Data Fetching

  const users = [
    {
      id: 1,
      username: 'anuj',
      email: 'anujsri1607@gmail.com',
    },
    {
      id: 2,
      username: 'anuj',
      email: 'anujsri1607@gmail.com',
    },
    {
      id: 3,
      username: 'anuj',
      email: 'anujsri1607@gmail.com',
    },
  ];

  const response = await fetch(`${process.env.API_URL}/posts`, {
    cache: 'no-store',
  });
  if (!response) {
    throw new Error('An Error occured while fetching the users...');
  }
  const posts = await response.json();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
      {/* {users.map((user) => (
        <Product key={user.id} user={user} />
      ))} */}
      {posts.data.map((post) => (
        <Product key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProductList;
