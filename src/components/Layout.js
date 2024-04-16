import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className=" mx-auto flex w-full max-w-7xl grow items-stretch divide-x divide-slate-500">
        {children}
      </div>
      <Footer />
    </div>
  );
}
