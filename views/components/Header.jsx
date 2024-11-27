const Header = () => {
  return (
    <header className="bg-green text-green-100 p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <div className="logo text-2xl font-bold">
                    <div className="flex items-center">
                    <img
                        src="https://i.pinimg.com/736x/45/99/85/4599857802d1f0d3d16971e2173e7eea.jpg" 
                        alt="Logo"
                        className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div className="logo text-2xl bg-white-100 font-bold">
                        <a href="/">2Hand</a>
                    </div>
                </div>
                </div>
        </div>
    </header>
  );
}

export default Header;
