import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { fireDB, storage } from '../../firebase/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

const Idea = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    place: "",
    recipeName: "",
    timeTaken: "",
    servings: "",
    ingredients: "",
    instructions: "",
    category: "",
  });

  const [cardPic, setCardPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loader

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCardPic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardPic) {
        toast.error("Please upload a card picture.");
      return;
    }

    setIsLoading(true); // Show loader

    try {
      // Upload cardPic to Firebase Storage
      const storageRef = ref(storage, `cardpics/${uuidv4()}`);
      const snapshot = await uploadBytes(storageRef, cardPic);
      const url = await getDownloadURL(snapshot.ref);

      // Handle `timeTaken` and `servings` for non-cooking categories
      const timeTaken = formData.category === "cooking" ? formData.timeTaken : null;
      const servings = formData.category === "cooking" ? formData.servings : null;

      // Add recipe details to Firestore
      const docRef = await addDoc(collection(fireDB, "recipes"), {
        userName: formData.userName,
        place: formData.place,
        recipeName: formData.recipeName,
        timeTaken,
        servings,
        ingredients: formData.ingredients.split('\n'),
        instructions: formData.instructions.split('\n'),
        category: formData.category,
        cardPic: url,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      toast.success("Idea successfully submitted!");

     // Navigate to '/skills' page after successful submission
    navigate('/skills');
    } catch (error) {
      console.error("Error submitting recipe: ", error);
      toast.error("Error submitting your idea");
    } finally {
        setIsLoading(false); // Hide loader
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Submit Your Idea</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* User Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Card Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Card Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Recipe Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Idea Name</label>
            <input
              type="text"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="cooking">Cooking</option>
              <option value="arts&craft">Arts & Craft</option>
              <option value="school projects">School Projects</option>
            </select>
          </div>

          {/* Time Taken */}
          {formData.category === "cooking" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Taken</label>
              <input
                type="text"
                name="timeTaken"
                value={formData.timeTaken}
                onChange={handleInputChange}
                placeholder="e.g., 15 mins"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          )}

          {/* Servings */}
          {formData.category === "cooking" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Servings</label>
              <input
                type="text"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          )}

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (In Points)</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="Enter each ingredient on a new line"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Instructions (In Points)</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Enter each instruction on a new line"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="5"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="lg:w-[20%] bg-[#51cf7bf8] hover:bg-[#39a35df8] text-white p-2 rounded-md shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Idea"}
            </button>
          </div>
        </form>
         {/* Loader */}
         {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="loader ease-linear border-4 border-t-4 border-gray-200 rounded-full animate-spin h-16 w-16"
              style={{ borderTopColor: "#00a99d" }}
            ></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Idea;
