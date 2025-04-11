// pages/posts/create.js
'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { createPostApi } from '../../../lib/auth';

export default function CreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState('');
  const [touched, setTouched] = useState({});
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('Technology');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Technology',
    tags: [],
    tagInput: '',
    image: null,
    imagePreview: '',
  });
  // Validation rules
  const validate = {
    title: (value) => {
      if (!value.trim()) return 'Title is required';
      if (value.length < 10) return 'Title must be at least 10 characters';
      if (value.length > 100) return 'Title must be less than 100 characters';
      return '';
    },
    description: (value) => {
      if (!value.trim()) return 'Description is required';
      if (value.length < 20)
        return 'Description must be at least 20 characters';
      if (value.length > 200)
        return 'Description must be less than 200 characters';
      return '';
    },
    // content: (value) => {
    //   if (!value.trim()) return 'Content is required';
    //   if (value.length < 50) return 'Content must be at least 50 characters';
    //   return '';
    // },
    tags: (tags) => {
      if (tags.length > 5) return 'Maximum 5 tags allowed';
      return '';
    },
    image: (file) => {
      if (!file) return 'File is Required';

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 1 * 1024 * 1024; // 5MB
      console.log(file.size, maxSize);
      if (!validTypes.includes(file.type)) {
        return 'Only JPG, PNG, or GIF images are allowed';
      }
      if (file.size > maxSize) {
        return 'Image must be smaller than 5MB';
      }
      return '';
    },
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate immediately after change
    if (validate[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate[name](value) }));
    }
  };

  const categories = [
    'Technology',
    'Programming',
    'Design',
    'Business',
    'Lifestyle',
    'Health',
    'Education',
  ];

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = formData.tagInput.trim();

      if (newTag && !formData.tags.includes(newTag)) {
        const newTags = [...formData.tags, newTag];
        setFormData((prev) => ({ ...prev, tags: newTags, tagInput: '' }));
        setErrors((prev) => ({ ...prev, tags: validate.tags(newTags) }));
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    const newTags = formData.tags.filter((tag) => tag !== tagToRemove);
    setFormData((prev) => ({ ...prev, tags: newTags }));
    setErrors((prev) => ({ ...prev, tags: validate.tags(newTags) }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validate.image(file);
      setErrors((prev) => ({ ...prev, image: error }));

      if (!error) {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: validate.title(formData.title),
      description: validate.description(formData.description),
      //   content: validate.content(formData.content),
      tags: validate.tags(formData.tags),
      image: validate.image(formData.image),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      title: true,
      description: true,
      content: true,
      tags: true,
      image: true,
    });
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('heading', formData.title);
      formDataToSend.append('description', formData.description);
      //   formDataToSend.append('content', content);
      formDataToSend.append('category', formData.category);
      formData.tags.forEach((tag) => formDataToSend.append('tags', tag));
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Submit to your Node.js API endpoint
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
        // Don't set Content-Type header when using FormData
        // The browser will set it automatically with the correct boundary
      });

      if (!response.ok) {
        throw new Error(`Error: ${response}`);
      }

      const data = await response.json();
      console.log('data', data);
      // Redirect to the new post or posts list
      router.push(`/blogs`);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if field should show error
  const shouldShowError = (field) => touched[field] && errors[field];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Create New Post | My Blog</title>
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
            <p className="text-blue-100">
              Share your knowledge with the community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            {errors.form && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {errors.form}
              </div>
            )}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                className={`w-full px-4 py-2 border ${
                  shouldShowError('title')
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter post title"
              />
              {shouldShowError('title') && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, description: true }))
                }
                className={`w-full px-4 py-2 border ${
                  shouldShowError('description')
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Briefly describe your post"
              />
              {shouldShowError('description') && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white pr-8"
                >
                  {categories.map((cat, index) => (
                    <option key={cat} value={index + 1}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tags - Updated with better handling */}
            <div>
              <label
                htmlFor="tagInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 inline-flex items-center justify-center w-3 h-3 text-blue-600 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                id="tagInput"
                name="tagInput"
                value={formData.tagInput}
                onChange={handleChange}
                onKeyDown={handleTagInput}
                onBlur={() => setTouched((prev) => ({ ...prev, tags: true }))}
                className={`w-full px-4 py-2 border ${
                  shouldShowError('tags') ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Type tag and press Enter"
              />
              {shouldShowError('tags') ? (
                <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  {formData.tags.length < 5
                    ? `Add up to ${5 - formData.tags.length} more tags`
                    : 'Maximum 5 tags reached'}
                </p>
              )}
            </div>

            {/* Rest of the form remains the same */}
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div className="mt-1 flex items-center">
                {formData.imagePreview ? (
                  <div className="relative group">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          image: null,
                          imagePreview: '',
                        }));
                        setErrors((prev) => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF (Max. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              {shouldShowError('image') && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Content Editor */}
            {/* <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm"
                placeholder="Write your post content here..."
                required
              />
            </div> */}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
