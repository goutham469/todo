import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTask() {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    title: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function postTask(event) {

    event.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      const date = new Date();

      try {
        let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/posts/create-task`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: '',
            username: '',
            securityKey: "12345678",
            title: title,
            body: body,
            status: "incomplete",
            createdOn: date,
            lastModifiedOn: date,
            openedOn: [],
            deleteTemporary: "false",
            deletePermanently: "false"
          })
        });

        response = await response.json();
        console.log(response);
        // Clear the form on successful submission
        setTitle('');
        setBody('');
        setErrorMsg({ title: '', body: '' });
      } catch (error) {
        console.error("Error posting task:", error);
      } finally {
        setIsSubmitting(false);
        // window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/home`
      }
    }
  }

  function validate() {
    let returnStatus = true;

    if (title.trim()) {
      setErrorMsg(prevData => ({ ...prevData, title: '' }));
    } else {
      setErrorMsg(prevData => ({ ...prevData, title: 'Empty title not accepted!' }));
      returnStatus = false;
    }

    if (body.trim()) {
      setErrorMsg(prevData => ({ ...prevData, body: '' }));
    } else {
      setErrorMsg(prevData => ({ ...prevData, body: 'Empty body not accepted!' }));
      returnStatus = false;
    }

    return returnStatus;
  }

  return (
    <div>
      <center>
        <p>Create Task</p>
      </center>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <form className='create-new-task-form'>
          <input
            type='text'
            value={title}
            placeholder="Enter title"
            className='create-new-task-input-title'
            onChange={(event) => setTitle(event.target.value)}
            style={{ border: errorMsg.title ? "2px solid red" : "1px solid black" }}
          />
          {errorMsg.title && <p style={{ color: 'red' }}>{errorMsg.title}</p>}
          <br />
          <textarea
            value={body}
            placeholder="Enter task body"
            className='create-new-task-textarea'
            onChange={(event) => setBody(event.target.value)}
            style={{ border: errorMsg.body ? "2px solid red" : "1px solid black" }}
          />
          {errorMsg.body && <p style={{ color: 'red' }}>{errorMsg.body}</p>}
          <br />
          <button
            className='create-new-task-button'
            onClick={(event) => postTask(event)}
            disabled={isSubmitting || !title.trim() || !body.trim()}
          >
            {isSubmitting ? "Adding..." : "Add task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
