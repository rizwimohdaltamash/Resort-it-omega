import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Bg from '../../assets/logins.png';
import Logo from '../../assets/logoicon.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    companyName: ""
  });

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserSignup({
      ...userSignup,
      role: role,
      companyName: role === "ngo" ? userSignup.companyName : "", // Clear company name if not NGO
    });
  };

  const userSignupFunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === "" ||
      userSignup.role === ""
    ) {
      toast.error("All Fields are required");
      return;
    }
  
    // Check if the role is "ngo" to capture geolocation
    const captureLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              console.error("Error getting geolocation: ", error);
              reject(null);
            }
          );
        } else {
          reject(null);
        }
      });
    };
  
    try {
      let location = null;
  
      // Only capture geolocation if the user is an NGO
      if (userSignup.role === "ngo" || userSignup.role === "scrapdealer") {
        location = await captureLocation();
      }
  
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
  
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        companyName: userSignup.role === "ngo" ? userSignup.companyName : null,
        location: location ? { ...location } : null, // Add location if available
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
  
      const userRefrence = collection(fireDB, "user");
  
      await addDoc(userRefrence, user);
  
      localStorage.setItem("users", JSON.stringify(user));
  
      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "",
        companyName: "",
      });
  
      toast.success("Signup Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className=" bg-opacity-20 backdrop-filter backdrop-blur-lg px-5 lg:px-8 py-10 rounded-lg shadow-md w-[90%] md:w-[50%] lg:w-[30%]">
        <div className="flex flex-col items-center mb-6">
          {/* <AiFillDingtalkCircle size={64} className="text-black" /> */}
          <img src={Logo} className="w-[5rem]" alt="" />
          <h2 className="text-center text-3xl font-bold text-black mt-2">
            Signup
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="bg-gray-100 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-400"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="bg-gray-100 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-400"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="bg-gray-100 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-400"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-5">
          <label className="text-black mr-4">
            <input
              type="radio"
              value="scrapdealer"
              checked={userSignup.role === "scrapdealer"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            scrap-dealer
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="user"
              checked={userSignup.role === "user"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            user
          </label>
          <label className="text-black">
            <input
              type="radio"
              value="ngo"
              checked={userSignup.role === "ngo"}
              onChange={handleRoleChange}
              className="ml-2"
            />
            ngo
          </label>
        </div>

        {/* Conditionally render company name input field */}
        {userSignup.role === "ngo" && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Company Name"
              value={userSignup.companyName}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  companyName: e.target.value,
                });
              }}
              className="bg-gray-100 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-400"
            />
          </div>
        )}

        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-[#51cf7bf8] border-2 border-[#51cf7bf8] hover:bg-[#2ba654f8] w-full text-white py-3 font-bold rounded-md transition duration-200 "
          >
            Signup
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-black">
          Have an account
            <Link className=" text-[#51cf7bf8] font-bold ml-4" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
