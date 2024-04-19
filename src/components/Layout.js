import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl grow items-stretch divide-x divide-slate-500 overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
}
