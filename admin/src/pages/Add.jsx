import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error('Kam az kam ek image upload karein')
      return
    }
    if (!sizes.length) {
      toast.error('Kam az kam ek size select karein')
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-700'
  const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl space-y-6 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Catalog</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">Add product</h1>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Upload Images (4)</h2>
        <div className="flex gap-3">
          <label htmlFor="image1">
            <img className='w-20 h-20 object-cover border cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 h-20 object-cover border cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 h-20 object-cover border cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 h-20 object-cover border cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Product details</h2>
        <div>
          <label className={labelClass} htmlFor="product-name">Product name</label>
          <input id="product-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Classic cotton shirt" required />
        </div>
        <div>
          <label className={labelClass} htmlFor="product-description">Description</label>
          <textarea id="product-description" className={`${inputClass} min-h-28 resize-y`} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="product-price">Price</label>
            <input id="product-price" className={inputClass} type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="product-category">Category</label>
            <select id="product-category" className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="product-subcategory">Subcategory</label>
            <select id="product-subcategory" className={inputClass} value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Available sizes</h2>
        <div className="flex flex-wrap gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])}
              className={`cursor-pointer border px-3 py-2 text-sm ${sizes.includes(size) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700'}`}
            >
              {size}
            </div>
          ))}
        </div>
      </section>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input className="h-4 w-4 accent-gray-900" type="checkbox" checked={bestseller} onChange={() => setBestseller((prev) => !prev)} />
        Mark as bestseller
      </label>

      <div className="border-t border-gray-200 pt-5">
        <button className="min-w-36 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding product...' : 'Add product'}
        </button>
      </div>
    </form>
  )
}

export default Add