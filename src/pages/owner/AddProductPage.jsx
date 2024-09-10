import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireDB, storage } from '../../firebase/Firebase'; // Ensure the path is correct
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false); // State to manage loader
  const storedUser = localStorage.getItem('users');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [productData, setProductData] = useState({
    name: '',
    productType: 'plastic',
    quantity: '',
    defects: '',
    city: '',
    state: '',
    address: '',
    phone: ''
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const marketPrices = {
    plastic: 6,
    paper: 10,
    metal: 25
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a product image.");
      return;
    }
   
    setIsLoading(true); // Show loader when starting the submission

    try {
      // Calculate total price
      const totalPrice = productData.quantity * marketPrices[productData.productType];
      
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `products/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      // Store the product data in Firestore
      await addDoc(collection(fireDB, 'products'), {
        ...productData,
        thumbnail: fileURL,
        marketPrice: marketPrices[productData.productType],
        totalPrice: totalPrice,
        lat: userLocation.lat,
        lng: userLocation.lng,
        email: user?.email || 'Anonymous',
        uid: user?.uid || 'Anonymous',
        time: new Date(),
      });

      toast.success("Product added successfully!");
      navigate('/owner-dashboard');

      // Reset the form
      setProductData({
        name: '',
        productType: 'plastic',
        quantity: '',
        defects: '',
        city: '',
        state: '',
        address: '',
        phone: ''
      });
      setFile(null);
    } catch (error) {
      toast.error("Failed to add product. " + error.message);
      console.error("Error adding product: ", error);
    }finally {
      setIsLoading(false); // Hide loader when submission is complete
    }
  };

  return (
    <Layout>
      <div className="w-[90%] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

         {/* Loader */}
         {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="loader ease-linear border-4 border-t-4 border-gray-200 rounded-full animate-spin h-16 w-16"
             style={{ borderTopColor: "#00a99d" }}
            ></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Name of Product</label>
            <textarea
              name="name"
              value={productData.name}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Product Type</label>
            <select
              name="productType"
              value={productData.productType}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
            >
              <option value="plastic">Plastic</option>
              <option value="paper">Paper</option>
              <option value="metal">Metal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Market Price (per kg)</label>
            <input
              type="text"
              value={`$${marketPrices[productData.productType]}/kg`}
              readOnly
              className="mt-1 block w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Total Price ($)</label>
            <input
              type="text"
              value={productData.quantity ? `$${productData.quantity * marketPrices[productData.productType]}` : ''}
              readOnly
              className="mt-1 block w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Any Defects?</label>
            <textarea
              name="defects"
              value={productData.defects}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={productData.city}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              name="state"
              value={productData.state}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Your Address</label>
            <textarea
              name="address"
              value={productData.address}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Your Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={productData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 lg:w-[20%] bg-[#33c664f8] hover:bg-[#1ca54af8] text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            Add Product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProductPage;
