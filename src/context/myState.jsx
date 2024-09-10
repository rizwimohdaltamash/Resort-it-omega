import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/Firebase";
import toast from "react-hot-toast";

 // Haversine formula to calculate distance between two latitude-longitude points
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const MyState = (props) => {
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

 // Function to get all products from Firestore
 function getAllProduct() {
  try {
    const q = query(collection(fireDB, "products"), orderBy("time"));
    const data = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        const productData = doc.data();
        const distance = userLocation.lat
          ? haversineDistance(
              userLocation.lat,
              userLocation.lng,
              productData.lat,
              productData.lng
            )
          : null; // Only calculate distance if user location is available

        productArray.push({ ...productData, id: doc.id, distance });
      });

      setGetAllProducts(productArray);
    });
    return () => data;
  } catch (error) {
    console.log(error);
  }
}

 // Function to get user's current location using Geolocation API
 const getUserLocation = () => {
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
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

  useEffect(() => {
    getUserLocation();
    getAllProduct();
  }, [userLocation.lat, userLocation.lng]);

  // Product Delete Function 
  const deleteProducts = async (id) => {
    try {
        await deleteDoc(doc(fireDB, "products", id));
        getAllProduct()
        toast.success("Blogs deleted successfully")
    } catch (error) {
        console.log(error)
    }
}


  return (
    <MyContext.Provider value={{
        deleteProducts,
        getAllProducts, // Provide the products array to the context
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
