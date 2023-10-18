import React, { useState } from 'react';

const CommentsForm = ({ onFormSubmit }) => {
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = { userName, date, comments };

    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((data) => {
        onFormSubmit(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setUserName('');
    setDate('');
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} style={{padding: '2em'}}>
      <h3>Enter a New Comment:</h3>
      <div className="form-group">
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          className="form-control"
          id="userName"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          className="form-control"
          id="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comments">Comments:</label>
        <textarea
          className="form-control"
          id="comments"
          value={comments}
          onChange={handleCommentsChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{marginTop:"1em"}}>Submit</button>
    </form>
  );
};

export default CommentsForm;

