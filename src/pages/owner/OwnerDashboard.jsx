import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
import Hero from "../../lottie/hero1.json";
import Lottie from "lottie-react";

const OwnerDashboard = () => {
  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // const auth = getAuth();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProducts, deleteProducts } = context;

  const userProducts = getAllProducts.filter(
    (product) => product.uid === user.uid || product.email === user.email
  );

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100">
        {/* User Info Section */}
        <div className="flex flex-row h-1/2 justify-center bg-white text-black p-8  shadow-md mb-8">
          <div className=" w-[65%] lg:w-1/2">
            <h1 className=" text-lg lg:text-4xl font-bold text-[#0ae854f8]">
              Welcome, {user?.name}
            </h1>
            <p className="lg:text-2xl text-gray-800 mt-4">
              Email: {user?.email}
            </p>
            <p className="lg:text-2xl text-gray-800 mt-4">Role: {user?.role}</p>
            <button
              onClick={() => navigate("/addproduct")}
              className="bg-[#33c664f8] hover:bg-[#1ca54af8] w-[80%] md:w-1/2 px-2 lg:px-0 lg:w-1/3 mt-8 py-3 rounded-full text-white text-xl font-semibold shadow-2xl hover:shadow-4xl transition-transform transform hover:-translate-y-1"
            >
              Sell Product
            </button>
          </div>

          {/* Hero Icon */}
          <div className=" w-[35%] lg:w-[25%] flex flex-row justify-end">
            <Lottie animationData={Hero} />
          </div>
        </div>

        {/* Table  */}
        <div className="container h-1/2 mx-auto px-4 max-w-7xl ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
            <table className="w-full border-2 border-[#0ae854f8] text-sm text-left text-gray-200">
              {/* Table Header */}
              <thead className="bg-[#27994df8] text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {userProducts.length > 0 ? (
                  userProducts.map((item, index) => {
                    const { thumbnail, time, id } = item;
                    return (
                      <tr
                        key={index}
                        className="border-b bg-[#0a2540] hover:bg-[#112a3d] transition duration-300"
                      >
                        <td className="px-6 py-4 text-white">{index + 1}.</td>
                        <td className="px-6 py-4 font-medium">
                          <img
                            className="w-16 rounded-lg"
                            src={thumbnail}
                            alt="thumbnail"
                          />
                        </td>
                        <td className="px-6 py-4 text-white">{item.name}</td>
                        <td className="px-6 py-4 text-white">
                          {item.productType}
                        </td>
                        <td className="px-6 py-4 text-white">
                          {new Date(time.seconds * 1000).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteProducts(id)}
                            className="px-4 py-1 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-black"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
