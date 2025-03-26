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

  // const response = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
  // if(!response){
  //     throw new Error("An Error occured while fetching the users...");
  // }
  // const users = await response.json();
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
      {users.map((user) => (
        <Product key={user.id} user={user} />
      ))}
    </div>
  );
};

export default ProductList;
