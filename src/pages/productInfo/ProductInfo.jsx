import { useEffect, useState } from "react";
import Layout from '../../components/layout/Layout';
import { useParams } from "react-router";
import { fireDB } from "../../firebase/Firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [biddingPrice, setBiddingPrice] = useState(''); // State for bidding price input
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  const [commentText, setCommentText] = useState(''); // State for comment text input
  const [allBids, setAllBids] = useState([]); // State to store all bids
  const [allComments, setAllComments] = useState([]); // State to store all comments
  const [scrapDealers, setScrapDealers] = useState([]); // State to store scrap-dealer names
  const [selectedDealer, setSelectedDealer] = useState(''); // State for selected scrap-dealer


  // Get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id); // Reference to the specific product document
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          toast.error("Product not found!");
        }
      } catch (error) {
        toast.error("Failed to fetch product. " + error.message);
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

    // Fetch scrap-dealer names
  useEffect(() => {
    const fetchScrapDealers = async () => {
      try {
        const q = query(collection(fireDB, 'user'), orderBy('name'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const dealersArray = querySnapshot.docs
            .filter(doc => doc.data().role === 'scrapdealer')
            .map(doc => doc.data().name);
          setScrapDealers(dealersArray);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    fetchScrapDealers();
  }, []);

  // Function to add a bid
  const addBid = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to place a bid');
      return;
    }
    try {
      const bidRef = collection(fireDB, `products/${id}/bids`);
      await addDoc(bidRef, {
        fullName: user?.name,
        role: user?.role,
        biddingPrice,
        phoneNumber,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success('Bid placed successfully');
      setBiddingPrice("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a comment
  const addComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to add a comment');
      return;
    }
    try {
      const commentRef = collection(fireDB, `products/${id}/comment`);
      await addDoc(commentRef, {
        fullName: user?.name,
        role: user?.role,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success('Comment added successfully');
      setCommentText("");
      setSelectedDealer('');
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bids
  useEffect(() => {
    const getBids = async () => {
      try {
        const q = query(
          collection(fireDB, `products/${id}/bids`),
          orderBy('time')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const bidsArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAllBids(bidsArray);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    getBids();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const q = query(
          collection(fireDB, `products/${id}/comment`),
          orderBy('time')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const commentsArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAllComments(commentsArray);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [id]);

  // Handle scrap-dealer selection
  const handleDealerChange = (e) => {
    const dealerName = e.target.value;
    setSelectedDealer(dealerName);
    setCommentText(`Deal done with ${dealerName} at Rs.`);
  };


  if (!product) {
    return (
      <Layout>
         <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20 z-50">
            <div className="loader ease-linear border-4 border-t-4 border-gray-300 rounded-full animate-spin h-16 w-16"
              style={{ borderTopColor: "#00a99d" }}
            ></div>
          </div>
      </Layout>
    );
  }

  // Filter comments based on user role
  const filteredComments = user?.role === 'user'
    ? allComments.filter(comment => comment.fullName === user?.name) // User sees only their own comments
    : allComments; // Scrap dealers see all comments
  
  return (
    <Layout>
      <div className="w-full h-full  p-6">

        <div className="flex flex-col  lg:flex-row justify-center items-center h-full w-full">

          <div className="lg:w-1/2 w-full">
            <img src={product.thumbnail} alt={product.name} className="w-full rounded-lg"/>
          </div>

          <div className="flex flex-col justify-center w-full lg:w-1/2 bg-gray-100 rounded-lg p-4">
            <h3 className="lg:text-4xl font-bold">{product.name}</h3>
            <p className="text-gray-600 lg:text-3xl font-bold mt-4 mb-4">{product.quantity} kg (approx)</p>
            <p className="text-gray-600 lg:text-xl">Type: {product.productType}</p>           
            <p className="text-gray-600 lg:text-xl">Defects: {product.defects || 'None'}</p>
            <p className="text-gray-600 lg:text-xl">Place: {product.state}, {product.city}</p>
            <p className="text-gray-600 lg:text-xl">Address: {product.address}</p>
            <p className="text-gray-600 lg:text-xl">Phone: {product.phone}</p>            
          </div>

        </div>

        {/* Bidding Section */}
        <div className="mt-8">
         {user?.role==='scrapdealer' &&(
          <>
           <h4 className="text-2xl font-bold mb-4">Bid your Price :</h4>
          <form onSubmit={addBid}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Enter your bidding price"
                value={biddingPrice}
                onChange={(e) => setBiddingPrice(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
              >
                Place Bid
              </button>
            </div>
          </form>

          </>
         )}
                 </div>

        {/* Display Bids */}
        <div className="mt-8">
          <h4 className="text-2xl font-bold mb-4">All Bids:</h4>
          {allBids.length > 0 ? (
            allBids.map((bid) => (
              <div key={bid.id} className="bg-gray-100 p-4 mb-2 rounded-lg">
                <p className="font-bold">{bid.fullName} <span className="text-sm font-medium text-gray-600">({bid.role})</span>  </p>
                <p>Bidding Price: ₹{bid.biddingPrice}</p>
                <p>Phone: {bid.phoneNumber}</p>
                <p className="text-gray-500 text-sm">{bid.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No bids yet.</p>
          )}
        </div>

        {/* Comment Section */}
        
          <div className="mt-8">
          {user?.role === 'user' && (
            <>
             <h4 className="text-2xl font-bold mb-4">Order To :</h4>
            <form onSubmit={addComment}>
              <div className="mb-4">
                <select
                  value={selectedDealer}
                  onChange={handleDealerChange}
                  className="w-full p-2 border rounded-lg mb-4"
                  required
                >
                  <option value="">Select Scrap Dealer</option>
                  {scrapDealers.map((dealer, index) => (
                    <option key={index} value={dealer}>
                      {dealer}
                    </option>
                  ))}
                </select>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 mt-4 rounded-lg"
                >
                  Post Order
                </button>
              </div>
            </form></>
           
          )}
            <h4 className="text-xl font-bold mt-6 mb-4">Deal Status :</h4>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <div key={comment.id} className="p-2 border rounded-lg mt-2">
                  <p className="font-bold">{comment.fullName} <span className="text-sm font-medium text-gray-600">({comment.role})</span>  </p>
                  <p className="text-gray-800">{comment.commentText}</p>
                  <p className="text-gray-600 text-sm">{comment.date}</p>
                </div>
              ))
            ) : (
              <p>No deals yet.</p>
            )}
          </div>
        
      </div>
    </Layout>
  );
};

export default ProductInfo;

