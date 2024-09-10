import React from "react";

function Comment({
  addComment,
  commentText,
  setcommentText,
  allComment,
  fullName,
  setFullName,
}) {
  return (
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold bg-black text-white">
            Make Comment
          </h2>
        </div>
        {/* Comment Form  */}
        <form className="mb-6">
          {/* Full Name Input  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 bg-black text-white"
          >
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              required
              placeholder="Enter Full Name"
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 bg-black text-white"
            />
          </div>

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 bg-black text-white"
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              id="comment"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 text-white bg-black"
              placeholder="Write a comment..."
              required
            />
          </div>
          {/* Button  */}
          <div className="">
            <button
              className="rounded-lg px-2 py-2 bg-black text-white"
              onClick={addComment}
              disabled={!fullName.trim() || !commentText.trim()}
            >
              Post comment
            </button>
          </div>
        </form>

        {/* Bottom Item  */}
        <article className="p-6 mb-6 text-base rounded-lg bg-black">
          {allComment.map((item, index) => {
            console.log(item);
            const { fullName, commentText, date } = item;
            return (
              <React.Fragment key={index}>
                <footer className="flex justify-between items-center mb- ">
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                    <p className="inline-flex items-center mr-3 text-lg  text-gray-500">
                      {fullName}
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      style={{ color: mode === "dark" ? "black" : "black" }}
                    >
                      {date}
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400 text-md">
                  ↳{commentText}
                </p>
              </React.Fragment>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Comment;
