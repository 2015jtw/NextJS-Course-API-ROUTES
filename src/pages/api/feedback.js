import fs from 'fs'
import path from 'path'

export function buildFeedbackPath(){
  return path.join(process.cwd(), 'data', 'feedback.json')
}

export function getFeedback(filePath){
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

export default function handleFeedback (req, res) {

  if(req.method === 'POST'){
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      email: email,
      feedback: feedback,
      id: new Date().toISOString()
    }

    // store newFeedback object in a database
    const filePath = buildFeedbackPath();
    const data = getFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({message: "Success", feedback: newFeedback})
  }
  else{
    const filePath = buildFeedbackPath();
    const data = getFeedback(filePath);
    res.status(200).json({feedback: data})
  }
}
