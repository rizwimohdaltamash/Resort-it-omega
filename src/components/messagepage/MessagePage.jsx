import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { fireDB, storage } from "../../firebase/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GrAttachment } from "react-icons/gr";

const MessagePage = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openCommentSection, setOpenCommentSection] = useState(null);
  const [ngoData, setNgoData] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Store user location
  

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(fireDB, "messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    };

    fetchMessages();
  }, []);

  // Function to get the user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => console.log(error)
      );
    }
  }, []);

  // Haversine formula to calculate distance between two points (user and ngo)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "user"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        const filteredData = data.filter(
          (user) => user.role === "ngo" && user.companyName
        );
        setNgoData(filteredData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async () => {
   

    if (newMessage.trim() === "" && !newImage) return;

    let imageUrl = null;

    if (newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      imageUrl = await getDownloadURL(imageRef);
    }

    const messageData = {
      text: newMessage,
      imageUrl,
      userName: user.name,
      userRole: user.role,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    await addDoc(collection(fireDB, "messages"), messageData);
    setNewMessage("");
    setNewImage(null);
    setImagePreview(null);

    window.location.reload();
  };

  const handleLike = async (id) => {
    const messageDoc = doc(fireDB, "messages", id);
    await updateDoc(messageDoc, {
      likes: messages.find((msg) => msg.id === id).likes + 1,
    });
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const handleDislike = async (id) => {
    const messageDoc = doc(fireDB, "messages", id);
    await updateDoc(messageDoc, {
      dislikes: messages.find((msg) => msg.id === id).dislikes + 1,
    });
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, dislikes: msg.dislikes + 1 } : msg
      )
    );
  };

  const handleComment = async (e, id) => {
    if (e.key !== "Enter") return;

    const comment = e.target.value.trim();
    if (!comment) return;

    const messageDoc = doc(fireDB, "messages", id);
    await updateDoc(messageDoc, {
      comments: [
        ...(messages.find((msg) => msg.id === id).comments || []),
        { userName: user.name, text: comment },
      ],
    });

    setMessages(
      messages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              comments: [
                ...(msg.comments || []),
                { userName: user.name, text: comment },
              ],
            }
          : msg
      )
    );

    e.target.value = "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toggleCommentSection = (id) => {
    setOpenCommentSection(openCommentSection === id ? null : id);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        <div className="flex lg:w-1/3 w-full ">
          {/* Left Side Corner */}
          {/* <div className=" p-4">
            <h2 className="text-xl font-bold mb-4">
              Nearby NGO's can see your post.
            </h2>
            <ul className="list-disc ml-4">
              {ngoData.map((ngo, index) => {
                // Calculate distance only if user location and ngo location are available
                const distance =
                  userLocation && ngo.location
                    ? calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        ngo.location.latitude,
                        ngo.location.longitude
                      )
                    : null;

                return (
                  <h1 key={index}>
                    {ngo.companyName} - {ngo.role}
                    <br />
                    <span>
                      {" "}
                      {distance && (
                        <p className="text-sm text-gray-500">
                          Distance: {distance.toFixed(2)} m away
                        </p>
                      )}{" "}
                    </span>
                  </h1>
                );
              })}
            </ul>
          </div> */}
          {/* Left Side Corner */}
<div className="p-6 mb-4 lg:mb-0 bg-gray-200 shadow-lg rounded-lg">
  <h2 className="text-2xl font-semibold text-green-800 mb-6">
    Nearby NGOs can see your post.
  </h2>
  <ul className="list-disc ml-6 space-y-4">
    {ngoData.map((ngo, index) => {
      // Calculate distance only if user location and NGO location are available
      const distance =
        userLocation && ngo.location
          ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              ngo.location.latitude,
              ngo.location.longitude
            )
          : null;

      return (
        <li key={index} className="flex flex-col space-y-2">
          <h3 className="text-lg font-medium text-green-600">
            <li>  {ngo.companyName} - {ngo.role}</li>
            
          </h3>
          {distance && (
            <p className="text-sm text-gray-600">
              Distance: {distance.toFixed(2)} m away
            </p>
          )}
        </li>
      );
    })}
  </ul>
</div>

        </div>

        <div className="lg:w-2/3 w-full">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Community Page
            </h2>
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-2">
                  <strong className="text-lg">{msg.userName}</strong>{" "}
                  <span className="text-sm text-gray-500">
                    ({msg.userRole})
                  </span>
                </div>
                <p className="mb-2 text-gray-700">{msg.text}</p>
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Uploaded pic"
                    className="lg:w-[30%] h-auto mb-2 rounded-md"
                  />
                )}
                <div className="flex items-center space-x-4 mb-2">
                  <button
                    onClick={() => handleLike(msg.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    👍 {msg.likes}
                  </button>
                  <button
                    onClick={() => handleDislike(msg.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    👎 {msg.dislikes}
                  </button>
                  <button
                    onClick={() => toggleCommentSection(msg.id)}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    💬 Comment
                  </button>
                </div>
                {openCommentSection === msg.id && (
                  <div>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      onKeyPress={(e) => handleComment(e, msg.id)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 space-y-2">
                      {msg.comments?.map((comment, index) => (
                        <p key={index} className="text-sm text-gray-600">
                          <strong>{comment.userName}:</strong> {comment.text}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-row justify-center items-center">
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <GrAttachment size={20} />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
               
              ></textarea>
            </div>
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="lg:w-[30%] h-auto rounded-md"
                />
              </div>
            )}
            <div onClick={handleUpload}>
              <button className="w-[100%] py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
                Post
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagePage;
