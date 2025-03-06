export default function EmailTemplate({ userEmail, feedbackType, feedbackContent }: Feedback) {
  return (
    <div className="flex flex-col">
      <p><strong>From:</strong> {userEmail}</p>
      <p><strong>Feedback Type:</strong> {feedbackType}</p>      
      <p><strong>Content:</strong> {feedbackContent}</p>
    </div>
  );
}
