import React, { useEffect, useState } from "react";
import { carouselImages } from "../data";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Books",
    "Furniture",
    "fragnance",
  ];
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getAllProducts = async () => {
    try {
      let url = `http://localhost:3000/api/v1/products/get-all-products?`;
      if (search) {
        url += `keyword=${search}&`;
      }
      if (category && category !== "All") {
        url += `category=${category}&`;
      }

      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [search, category]);

  return (
    <>
      {/* CAROUSEL */}
      <div className="carousel w-full rounded-box">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full"
          >
            <img src={img.img} style={{ width: "100vw", height: "70vh" }} />
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="container mx-auto p-4">
        <h1 className="text-center mt-8 mb-8 font-bold text-5xl">Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR */}
          <div className="border p-4 rounded-xl bg-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* CATEGORY */}
            <select
              className="select select-bordered w-full mb-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* PRICE */}
            <div className="mb-2 font-semibold">Max Price: $</div>
            <input
              type="range"
              min="0"
              max="10000"
              className="range range-primary"
          
            />
          </div>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <Link key={product._id} to={`/product-detail/${product._id}`}>
                <div className="border p-4 rounded-xl bg-gray-200 hover:shadow-lg transition">
                  <img
                    className="object-cover w-full h-48 p-2 rounded-lg"
                    src={product.images[0].url}
                    alt={product.title}
                  />
                  <h3 className="text-lg font-bold mt-2">{product.title}</h3>
                  <p>
                    Price:
                    <span className="font-bold"> ₹{product.price}</span>
                  </p>
                  <div className="text-center">
                    <button className="text-white bg-blue-600 px-4 py-2 rounded-full mt-4">
                      Buy Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
