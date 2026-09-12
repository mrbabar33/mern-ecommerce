import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency, cartItems } = useContext(ShopeContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const productInfo = products.find((product) => product._id === items);
          if (productInfo) {
            tempData.push({
              ...productInfo,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
    }
    setOrderData(tempData);
  }, [cartItems, products]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2'>
                  Date: <span className='text-gray-400'>
                    {new Date().toDateString()}
                  </span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready to ship</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition'>
                Track Order
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;