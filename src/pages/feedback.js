import {buildFeedbackPath, getFeedback} from './api/feedback'
import { useState } from 'react';



export default function FeedbackPage(props){

    const [feedbackData, setFeedbackData] = useState();


    function loadFeedbackHandler(id){
        fetch(`/api/${id}`)
        .then(response => response.json)
        .then(data => {
            setFeedbackData(data.feedback);
    })}

    return(
        <>
            {feedbackData && <p>feedbackData.email</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.feedback} <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show More</button>
                    </li> 
                ))}
            </ul>
        </>
    )
}

export async function getStaticProps(){
    const filePath = buildFeedbackPath();
    const data = getFeedback(filePath);
    return{
        props: {
            feedbackItems: data
        }
    }}