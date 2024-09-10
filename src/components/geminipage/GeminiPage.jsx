import React, { useState } from "react";

import Layout from "../layout/Layout";

import axios from "axios";

const GeminiPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const keywords = [
    "waste",
    "environment",
    "garbage",
    "scrap",
    "trash",
    "shit",
    "recycling",
    "pollution",
    "sanitation",
    "disposal",
    "compost",
    "reduce",
    "reuse",
    "recycle",
    "sewage",
    "health",
    "ill"
  ];

  const generateAnswer = async () => {
    const isRelevant = keywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );

    if (!isRelevant) {
      setAnswer("No info about this.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCvZCloLPAWjCqsbiJrYm-Itm8Bd-ldBF4",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const rawAnswer = response["data"]["candidates"][0]["content"][
        "parts"
      ][0]["text"].replace(/\*/g, "");

      // Combine all lines into a single paragraph without trimming
      const paragraph = rawAnswer
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join(" ");

      setAnswer(paragraph);
    } catch (error) {
      setAnswer("Error fetching the answer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-500 to-green-900 flex flex-col lg:flex-row justify-center items-center p-4">

        

        <div className=" w-full  flex flex-col justify-center items-center">
          <h1 className=" text-xl lg:text-4xl font-bold text-white mb-6">
            Green Genie AI Chatbot
          </h1>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols="30"
            rows="5"
            placeholder="Ask a question related to waste management..."
            className="border-2 border-gray-300 rounded-lg p-4 w-full max-w-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition"
          ></textarea>

          <button
            className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition font-semibold"
            onClick={generateAnswer}
          >
            Generate Answer
          </button>

          {loading ? (
            <div className="mt-6">
              <div
                className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
                style={{ borderTopColor: "green" }}
              ></div>
            </div>
          ) : (
            <div
              className="mt-6 bg-green-200 p-4 rounded-lg shadow-lg w-full lg:w-[80%]  text-gray-800 text-lg overflow-y-auto"
              style={{ maxHeight: "300px" }}
            >
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GeminiPage;


