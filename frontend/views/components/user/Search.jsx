import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };
    const navigate= useNavigate();
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
        }
        else toggleSearch();
    };
    return (
        <div className='relative flex items-center'>
          <button 
            className="text-colors-black hover:text-green-700" 
            onClick={handleSearch}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="size-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          {isSearchOpen && (
            <div className="absolute right-full mr-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} //enter
                placeholder="Tìm kiếm sản phẩm..."
                className="p-2 border border-colors-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-colors-green-500"
              />
            </div>
          )}
        </div>
    )
};

export default Search;