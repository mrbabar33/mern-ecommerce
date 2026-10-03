import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)

      if (response.data.success) {
        setProducts(response.data.products || [])
      } else {
        toast.error(response.data.message || 'Products could not be loaded')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong while loading products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (productId) => {
    if (!window.confirm('Is this product to be removed from the catalog?')) return

    try {
      const response = await axios.delete(`${backendUrl}/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        toast.success(response.data.message || 'Product removed successfully')
        setProducts((prev) => prev.filter((product) => product._id !== productId))
      } else {
        toast.error(response.data.message || 'Unable to delete product')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete product')
    }
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>Catalog</p>
          <h1 className='mt-1 text-2xl font-semibold text-gray-900'>Product list</h1>
        </div>
      </div>

      {loading ? (
        <div className='rounded border border-gray-200 bg-white p-6 text-sm text-gray-500'>Loading products...</div>
      ) : products.length === 0 ? (
        <div className='rounded border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500'>
          No products added yet.
        </div>
      ) : (
        <div className='overflow-hidden rounded border border-gray-200 bg-white'>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-left text-sm text-gray-700'>
              <thead className='bg-gray-100 text-xs uppercase tracking-wide text-gray-600'>
                <tr>
                  <th className='px-4 py-3'>Image</th>
                  <th className='px-4 py-3'>Name</th>
                  <th className='px-4 py-3'>Category</th>
                  <th className='px-4 py-3'>Price</th>
                  <th className='px-4 py-3'>Sizes</th>
                  <th className='px-4 py-3 text-right'>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const productImage = Array.isArray(product.image) ? product.image[0] : product.image

                  return (
                    <tr key={product._id} className='border-t border-gray-200 align-middle'>
                      <td className='px-4 py-3'>
                        <img
                          src={productImage || 'https://placehold.co/120x120?text=No+Image'}
                          alt={product.name}
                          className='h-16 w-16 rounded object-cover border border-gray-200'
                        />
                      </td>
                      <td className='px-4 py-3'>
                        <div className='font-medium text-gray-900'>{product.name}</div>
                        <div className='text-xs text-gray-500'>{product.subCategory}</div>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700'>
                          {product.category}
                        </span>
                      </td>
                      <td className='px-4 py-3 font-medium text-gray-900'>{currency}{product.price}</td>
                      <td className='px-4 py-3'>
                        {Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes.join(', ') : '-'}
                      </td>
                      <td className='px-4 py-3 text-right'>
                        <button
                          type='button'
                          onClick={() => deleteProduct(product._id)}
                          className='rounded border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100'
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default List