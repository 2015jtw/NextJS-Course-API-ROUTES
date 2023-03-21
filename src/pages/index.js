import { useRef, useState } from "react"

export default function Home() {

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [feedbackItems, setFeedbackItems] = useState([]);

  function formHandler(event){
    event.preventDefault()

    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const reqBody = {email: email, feedback: feedback}

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))

  }

  function loadFeedback(){

    fetch('/api/feedback')
    .then(response => response.json())
    .then(data => setFeedbackItems(data.feedback))
  }

  return (
    
    <>
      <h1>Home Page</h1>

      <form method="post" onSubmit={formHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input id="email" type="email" ref={emailInputRef}/>
        </div>

        <div>
          <label htmlFor="feedback"> Your Feedback</label>
          <textarea id="feedback" rows="5" type="text" ref={feedbackInputRef}/>
        </div>
        <button>Send Feedback</button>
      </form>

      <hr/>
      <button onClick={loadFeedback}>Load Feedback</button>
        <ul>
          {feedbackItems.map(item => <li key={item.id}>{item.feedback}</li>)}
        </ul>
    </>
  )
}
