import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from '../../assets/logins.png';
import Logo from '../../assets/logoicon.jpg';
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";



const Login = () => {
  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
    }

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );     

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));

          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          navigate("/");
          // if (user.role === "scrapdealer" || user.role === "ngo"){
          //   navigate("/");
          // } else {
          //   navigate("/owner-dashboard");
          // }

        });
        return () => data;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);

      toast.error("Login Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-opacity-100"
    style={{ backgroundImage: `url(${Bg})` }}
    >     
      {/* Login Form  */}
      <div className="shadow-2xl bg-opacity-20 backdrop-filter backdrop-blur-lg px-5 lg:px-8 py-10 rounded-lg  w-[90%] md:w-[50%] lg:w-[30%]  ">
        {/* Logo  */}
        <div className="flex flex-col items-center mb-6">
          {/* <AiFillDingtalkCircle size={64} className="text-black" /> */}
          <img src={Logo} className="w-[5rem]" alt="" />
          <h2 className="text-center text-3xl font-bold text-black mt-2">
            Login
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="bg-gray-200 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-500"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-gray-200 text-black px-4 py-3 w-full rounded-md outline-none placeholder-gray-500"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5 ">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-[#51cf7bf8] border-2 border-[#51cf7bf8] hover:bg-[#29a252f8] w-full text-white py-3 font-bold rounded-md transition duration-200 "
          >
            Login
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-black">
            Don't Have an account
            <Link className=" text-[#51cf7bf8] font-bold ml-4" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>

    </div>
  );
};

export default Login;
