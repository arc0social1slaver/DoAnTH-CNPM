import Logo from './Logo';
import DashboardButton from './DashboardButton';
import ProductCategory from './ProductCategory';
import Search from './Search';
import Notification from './Notification';
import Cart from './Cart';
import Menu from './Menu';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-colors-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <Logo />
        <div className="flex space-x-8 mx-auto">
          <DashboardButton />
          <ProductCategory />
        </div>

        <div className="relative flex items-center space-x-6">
          <Search />
          <Notification />
          <Cart />
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
