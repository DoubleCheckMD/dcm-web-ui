import axios from "axios";

const handleQuestionSubmit = async () => {
  if (!question.trim()) return;

  setResponse("Fetching answer...");

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // Use "gpt-3.5-turbo" if needed
        messages: [{ role: "user", content: question }],
      },
      {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, 
          "Content-Type": "application/json",
        },
      }
    );

    setResponse(res.data.choices[0].message.content);
  } catch (error) {
    setResponse("Error fetching response. Please try again.");
    console.error("GPT API Error:", error);
  }
};

export default handleQuestionSubmit;