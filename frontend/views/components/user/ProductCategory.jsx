import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); 
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };
    return (
        <div 
            className='relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="font-bold text-green-700 hover:text-opacity-75">Danh mục sản phẩm</button>
            {isHovered && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-colors-white border border-green-700 rounded-md shadow-lg">
                    <ul>
                        <li className="p-2 text-colors-gray-600 hover:font-bold hover:text-green-700 cursor-pointer">
                            <Link to="/fashion">Thời trang</Link>
                        </li>
                        <li className="p-2 text-colors-gray-600 hover:font-bold hover:text-green-700 cursor-pointer">
                            <Link to="/beauty">Sắc đẹp</Link>
                        </li>
                        <li className="p-2 text-colors-gray-600 hover:font-bold hover:text-green-700 cursor-pointer">
                            <Link to="/documents">Tài liệu</Link>
                        </li>
                        <li className="p-2 text-colors-gray-600 hover:font-bold hover:text-green-700 cursor-pointer">
                            <Link to="/electronics">Thiết bị điện tử</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;