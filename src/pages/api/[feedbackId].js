import {buildFeedbackPath, getFeedback} from './feedback'


export default function handleFeedback(req, res){
    const feedbackID = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = getFeedback(filePath);

    const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackID)

    res.status(200).json({feedback: selectedFeedback});

}