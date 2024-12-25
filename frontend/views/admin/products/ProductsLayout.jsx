import Card from "./Card";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import Products from "./Products";
import Category from "./Category";

const AdminProducts = () => {
    const [activeButton, setActiveButton] = useState("products");

    return (
        <div className="bg-white h-screen overflow-y-scroll">
            <h1 className="p-5 m-5 text-4xl font-bold text-colors-green-700">Danh mục sản phẩm</h1>
            <div className="mt-5 mx-5">
                <button
                    className={`px-3 py-2 rounded-t-lg transition cursor-pointer ${
                        activeButton === "products"
                            ? "bg-green-100"
                            : "bg-green-700 hover:bg-green-900"
                    }`}
                    onClick={() => setActiveButton("products")}
                >
                    Sản phẩm
                </button>
                <button
                    className={`px-3 py-2 rounded-t-lg transition cursor-pointer ${
                        activeButton === "categories"
                            ? "bg-green-100"
                            : "bg-green-700 hover:bg-green-900"
                    }`}
                    onClick={() => setActiveButton("categories")}
                >
                    Danh mục
                </button>
            </div>
            {activeButton === "products" && <Products />}
            {activeButton === "categories" && <Category />}         
        </div>
    );
}

export default AdminProducts;
