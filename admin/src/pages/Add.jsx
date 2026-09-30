import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: 'Men',
  subCategory: 'Topwear',
  sizes: [],
  bestseller: false,
}

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

const Add = ({ token }) => {
  const [form, setForm] = useState(initialForm)
  const [imageUrls, setImageUrls] = useState([''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSizeChange = (size) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size],
    }))
  }

  const onImageChange = (index, value) => {
    setImageUrls((current) => current.map((url, imageIndex) => (
      imageIndex === index ? value : url
    )))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const images = imageUrls.map((url) => url.trim()).filter(Boolean)

    if (!images.length) {
      toast.error('Kam az kam ek image URL add karein')
      return
    }

    if (!form.sizes.length) {
      toast.error('Kam az kam ek size select karein')
      return
    }

    if (!backendUrl) {
      toast.error('Admin .env mein VITE_BACKEND_URL set nahi hai')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        { ...form, price: Number(form.price), image: images },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (!response.data.success) {
        toast.error(response.data.message || 'Product add nahi hua')
        return
      }

      toast.success('Product successfully add ho gaya')
      setForm(initialForm)
      setImageUrls([''])
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Product add nahi hua')
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

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Product details</h2>
        <div>
          <label className={labelClass} htmlFor="product-name">Product name</label>
          <input
            id="product-name"
            className={inputClass}
            name="name"
            value={form.name}
            onChange={onFieldChange}
            placeholder="e.g. Classic cotton shirt"
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            className={`${inputClass} min-h-28 resize-y`}
            name="description"
            value={form.description}
            onChange={onFieldChange}
            placeholder="Describe the product"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="product-price">Price</label>
            <input
              id="product-price"
              className={inputClass}
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={onFieldChange}
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="product-category">Category</label>
            <select id="product-category" className={inputClass} name="category" value={form.category} onChange={onFieldChange}>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="product-subcategory">Subcategory</label>
            <select id="product-subcategory" className={inputClass} name="subCategory" value={form.subCategory} onChange={onFieldChange}>
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Image URLs</h2>
          <p className="mt-1 text-xs text-gray-500">Public image links add karein. Pehla image product ki main photo hoga.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {imageUrls.map((url, index) => (
            <div key={index}>
              <label className={labelClass} htmlFor={`product-image-${index + 1}`}>Image {index + 1}</label>
              <input
                id={`product-image-${index + 1}`}
                className={inputClass}
                type="url"
                value={url}
                onChange={(event) => onImageChange(index, event.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Available sizes</h2>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <label key={size} className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${form.sizes.includes(size) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700'}`}>
              <input
                className="sr-only"
                type="checkbox"
                checked={form.sizes.includes(size)}
                onChange={() => onSizeChange(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </section>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          className="h-4 w-4 accent-gray-900"
          type="checkbox"
          name="bestseller"
          checked={form.bestseller}
          onChange={onFieldChange}
        />
        Mark as bestseller
      </label>

      <div className="border-t border-gray-200 pt-5">
        <button
          className="min-w-36 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding product...' : 'Add product'}
        </button>
      </div>
    </form>
  )
}

export default Add