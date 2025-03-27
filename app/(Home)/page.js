import Banner from '@/app/(Home)/components/Banner';
import ProductList from './components/ProductList';

export default function Home() {
  return (
    <>
      <div className="text-center font-bold text-[40px]">
        List of All Latest Books using docker
      </div>
      <Banner />
      <ProductList />
    </>
  );
}
