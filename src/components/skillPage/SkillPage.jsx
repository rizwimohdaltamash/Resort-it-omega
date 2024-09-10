import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";

const SkillPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category

  // Fetch data from Firestore
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "recipes"));
        const recipeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeData);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
        window.location.reload();
      }
    };

    fetchRecipes();
  }, []);

  // Toggle the expanded recipe
  const toggleRecipeDetails = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  // Function to filter recipes by category
  const filterRecipes = () => {
    if (!selectedCategory) return recipes;
    return recipes.filter((recipe) => recipe.category === selectedCategory);
  };

  return (
    <Layout>
      <div className="skill-page-container p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Learn to Make the Best Out of Waste
        </h1>

        <section className="introduction mb-10">
          <p className="text-lg text-gray-600">
            Welcome to our EcoCreate page! Here, you can explore different creative
            ways to turn waste materials into something useful and beautiful.
          </p>
        </section>

        {/* Category Filter Section */}
        <section className="categories grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className={`category-card p-6 bg-green-100 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedCategory === "cooking" ? "border-4 border-green-300" : ""
            }`}
            onClick={() => setSelectedCategory("cooking")}
          >
            <h2 className="text-3xl font-bold text-green-800 mb-3">Cooking</h2>
            <p className="text-gray-700">
              Learn how to transform leftovers into delicious meals.
            </p>
          </div>

          <div
            className={`category-card p-6 bg-blue-100 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedCategory === "arts&craft" ? "border-4 border-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory("arts&craft")}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-3">
              Arts & Crafts
            </h2>
            <p className="text-gray-700">
              Create beautiful decorations and art using recyclable materials.
            </p>
          </div>

          <div
            className={`category-card p-6 bg-yellow-100 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedCategory === "school projects" ? "border-4 border-yellow-400" : ""
            }`}
            onClick={() => setSelectedCategory("school projects")}
          >
            <h2 className="text-3xl font-bold text-yellow-800 mb-3">
              School Projects
            </h2>
            <p className="text-gray-700">
              Discover creative ideas for school projects made from waste.
            </p>
          </div>
        </section>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate("/idea")}
            className="bg-purple-400 hover:bg-purple-500 p-2 rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            Add your idea
          </button>
        </div>

        {/* Display filtered recipes */}
        <section className="user-contributions mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            User Contributions
          </h2>
          <p className="text-lg text-gray-600">
            Check out what others have created and share your own projects!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
            {filterRecipes().map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                {/* Card Picture */}
                <img
                  src={recipe.cardPic}
                  alt={recipe.recipeName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {/* User Name, Place, Recipe Name */}

                  <h3 className="text-xl font-semibold mb-2">
                    {recipe.recipeName}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {recipe.userName} | {recipe.category} | {recipe.place}
                  </p>

                  {/* Display Category, Servings, and Time */}
                  {recipe.category === "cooking" && (
                    <p className="text-sm text-gray-800">
                      ⏲ {recipe.timeTaken} mins | 🍽 {recipe.servings} servings
                    </p>
                  )}

                  {/* Button to toggle details */}
                  <button
                    onClick={() => toggleRecipeDetails(recipe.id)}
                    className="mt-4 w-full bg-[#51cf7bf8] hover:bg-[#239649f8] text-white p-2 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                  >
                    {expandedRecipe === recipe.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {/* Ingredients and Instructions */}
                  {expandedRecipe === recipe.id && (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold">Ingredients:</h4>
                      <ul className="list-disc list-inside mb-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-700">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                      <h4 className="text-lg font-bold">Instructions:</h4>
                      <ol className="list-decimal list-inside">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="text-gray-700">
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SkillPage;



