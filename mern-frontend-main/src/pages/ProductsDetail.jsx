import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// http://localhost:3000/api/v1/products/product-detail/690b5ae12714ed16bcc39923
const ProductsDetail = () => {
    const { id } = useParams()
    console.log(id);

    const [product, setProduct] = useState();
    console.log(product);
    

    const getProductDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/products/product-detail/${id}`)
            // console.log(response.data.product);
            setProduct(response.data.product)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getProductDetail()
    }, [])

    console.log(product);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT: Product Images */}
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-4">
                        {product?.images.map((image, index) => (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden"
                            >
                                <img
                                    src={image.url}
                                    alt={`product-${index}`}
                                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product Details */}
                <div className="w-full flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold">
                        {product?.title}
                    </h2>

                    <p className="text-gray-600">
                        {product?.description}
                    </p>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Category:</span>
                            {product?.category}
                        </p>
                        <p>
                            <span className="font-medium">Stock:</span>
                            {product?.stocks}
                        </p>
                        <p>
                            <span className="font-medium">Rating:</span>
                            ⭐ {product?.ratings}
                        </p>
                    </div>

                    <p className="text-2xl font-bold text-green-600">
                        ₹{product?.price}
                    </p>

                    <button className="mt-4 w-fit px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                </div>

            </div>
        </div>

    )
}

export default ProductsDetail
