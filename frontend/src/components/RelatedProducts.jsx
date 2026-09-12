import React, { useState, useEffect, useContext } from 'react';  // ✅ Sahi import
import { ShopeContext } from '../context/ShopeContext';  // ✅ Sahi path

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopeContext);  // ✅ Context se products lo
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            // 1️⃣ Sab products ki copy banayein
            let productsCopy = products.slice();
            
            // 2️⃣ Same category ke products filter karein
            productsCopy = productsCopy.filter(
                (item) => category === item.category
            );
            
            // 3️⃣ Same subCategory ke products filter karein
            productsCopy = productsCopy.filter(
                (item) => subCategory === item.subCategory
            );
            
            // 4️⃣ Related products set karein
            setRelated(productsCopy);
        }
    }, [products, category, subCategory]);  // ✅ Sahi dependencies

    return (
        <div className="mt-20 px-6">
            <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
            
            {/* Agar related products hain toh show karein */}
            {related.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {related.map((product) => (
                        <div key={product._id} className="border rounded-lg p-4">
                            <img 
                                src={product.image[0]} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <h3 className="font-medium mt-2">{product.name}</h3>
                            <p className="text-gray-600">₹{product.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                // Agar koi related product nahi hai
                <p className="text-gray-500">No related products found</p>
            )}
        </div>
    );
};

export default RelatedProducts;