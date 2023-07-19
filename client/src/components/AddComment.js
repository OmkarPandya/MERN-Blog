import React, { useState } from "react";

const AddComment = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await fetch(`/api/articles/${articleName}/add-comments`, {
      method: "post",
      body: JSON.stringify({ username, text: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await result.json();
    setArticleInfo(body);
    setUsername("");
    setComment("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="shadow rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="text-xl fond-bold mb-4 text-gray-900">Add a comment</h3>
      <label className="block text-gray-700 text-sm fond-bold mb-2">
        Name:
      </label>
      <input
        type="text"
        value={username}
        onChange={usernameChangeHandler}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label className="block text-gray-700 text-sm fond-bold mb-2">
        Comment:
      </label>
      <textarea
        rows="4"
        cols="5"
        value={comment}
        onChange={commentChangeHandler}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Comment
      </button>
    </form>
  );
};

export default AddComment;
