import React from "react";

const CommentsSection = ({ comments, onRemoveComment }) => {
  const handleRemoveComment = (index) => {
    const commentId = comments[index].id;

    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        onRemoveComment(index);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment, index) => (
          <div className="comment card mb-3" key={comment.id}>
            <div className="card-body">
              <h5 className="card-title">Name: {comment.userName}</h5>
              <p className="card-text">
                Date: {new Date(comment.date).toLocaleDateString()}
              </p>
              <p className="card-text">{comment.comments}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveComment(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentsSection;
