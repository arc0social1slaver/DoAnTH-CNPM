const Header = () => {
  return (
    <header className="bg-green-700 text-white-100 p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <div className="logo text-2xl font-bold">
                    <div className="flex items-center">
                    <img
                        src="https://i.pinimg.com/736x/d2/c7/12/d2c7122f6f018eaf2835a321135f2cde.jpg" 
                        alt="Logo"
                        className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div className="logo text-2xl font-bold">
                        <a href="/">ThriftMate</a>
                    </div>
                </div>
                </div>
        </div>
    </header>
  );
}

export default Header;
