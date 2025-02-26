// import React, { useState } from "react";
// import "./styles/Planty.css";

// const Planty = () => {
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userChoice, setUserChoice] = useState(null);
//   const [cropDetails, setCropDetails] = useState({ cropName: "", symptoms: "", location: "" });

//   const handleSend = () => {
//     if (!inputText.trim()) return;

//     let botResponse;
//     if (inputText.toLowerCase().includes("disease") || inputText.toLowerCase().includes("problem")) {
//       setUserChoice("request_details");
//       botResponse = "Please provide:\n1. Crop Name 🌾\n2. Symptoms 🍂\n3. Location 🌍";
//     } else {
//       botResponse = getAIResponse(inputText);
//     }

//     setChatHistory([...chatHistory, { sender: "User", message: inputText }, { sender: "Planty", message: botResponse }]);
//     setInputText("");
//   };

//   const handleCropDetailsSubmit = () => {
//     const { cropName, symptoms, location } = cropDetails;
//     if (cropName && symptoms && location) {
//       const diagnosis = getCropRecommendation(cropName, symptoms, location);
//       setChatHistory([
//         ...chatHistory,
//         { sender: "User", message: `Crop: ${cropName}, Symptoms: ${symptoms}, Location: ${location}` },
//         { sender: "Planty", message: diagnosis },
//       ]);
//       setUserChoice(null);
//       setCropDetails({ cropName: "", symptoms: "", location: "" });
//     }
//   };

//   const getAIResponse = (question) => {
//     // Simulated AI response (replace with API call)
//     return `Planty says: This is a placeholder response for "${question}"`;
//   };

//   const getCropRecommendation = (cropName, symptoms, location) => {
//     return `Diagnosis for ${cropName} with symptoms "${symptoms}" in ${location}: Possible issue detected. Suggested treatment: Apply organic pesticide.`;
//   };

//   return (
//     <div className="planty-container">
//       <h1 className="planty-title">🤖🌳 Planty - AI Crop Care Assistant</h1>
//       <p className="planty-subtitle">Ask me how to take care of your crops! 🌿</p>

//       <div className="chat-box">
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className={`chat-message ${chat.sender === "User" ? "user-message" : "bot-message"}`}>
//               <strong>{chat.sender}:</strong> {chat.message}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Describe the issue with your crop..."
//           className="text-input"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSend} className="send-btn">Send</button>
//       </div>

//       {userChoice === "request_details" && (
//         <div className="crop-details">
//           <h2>Provide Crop Details</h2>
//           <input
//             type="text"
//             placeholder="Crop Name"
//             className="detail-input"
//             value={cropDetails.cropName}
//             onChange={(e) => setCropDetails({ ...cropDetails, cropName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Symptoms"
//             className="detail-input"
//             value={cropDetails.symptoms}
//             onChange={(e) => setCropDetails({ ...cropDetails, symptoms: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="detail-input"
//             value={cropDetails.location}
//             onChange={(e) => setCropDetails({ ...cropDetails, location: e.target.value })}
//           />
//           <button onClick={handleCropDetailsSubmit} className="submit-btn">Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planty;



// import React, { useState } from "react";
// import "./styles/Planty.css";

// const Planty = () => {
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userChoice, setUserChoice] = useState(null);
//   const [cropDetails, setCropDetails] = useState({ cropName: "", symptoms: "", location: "" });

//   const sendMessageToBackend = async (message) => {
//     const response = await fetch("http://127.0.0.1:5000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });

//     const data = await response.json();
//     return data;
//   };

//   const sendDiagnosisToBackend = async () => {
//     const response = await fetch("http://127.0.0.1:5000/diagnose", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(cropDetails),
//     });

//     const data = await response.json();
//     return data;
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     setChatHistory([...chatHistory, { sender: "User", message: inputText }]);

//     const data = await sendMessageToBackend(inputText);

//     setChatHistory((prev) => [
//       ...prev,
//       { sender: "Planty", message: data.response },
//     ]);

//     if (data.request_details) {
//       setUserChoice("request_details");
//     }

//     setInputText("");
//   };

//   const handleCropDetailsSubmit = async () => {
//     const { cropName, symptoms, location } = cropDetails;
//     if (cropName && symptoms && location) {
//       setChatHistory([...chatHistory, { sender: "User", message: `Crop: ${cropName}, Symptoms: ${symptoms}, Location: ${location}` }]);

//       const data = await sendDiagnosisToBackend();
//       setChatHistory((prev) => [...prev, { sender: "Planty", message: data.response }]);

//       setUserChoice(null);
//       setCropDetails({ cropName: "", symptoms: "", location: "" });
//     }
//   };

//   return (
//     <div className="planty-container">
//       <h1 className="planty-title">🤖🌳 Planty - AI Crop Care Assistant</h1>
//       <p className="planty-subtitle">Ask me how to take care of your crops! 🌿</p>

//       <div className="chat-box">
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className={`chat-message ${chat.sender === "User" ? "user-message" : "bot-message"}`}>
//               <strong>{chat.sender}:</strong> {chat.message}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Describe the issue with your crop..."
//           className="text-input"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSend} className="send-btn">Send</button>
//       </div>

//       {userChoice === "request_details" && (
//         <div className="crop-details">
//           <h2>Provide Crop Details</h2>
//           <input
//             type="text"
//             placeholder="Crop Name"
//             className="detail-input"
//             value={cropDetails.cropName}
//             onChange={(e) => setCropDetails({ ...cropDetails, cropName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Symptoms"
//             className="detail-input"
//             value={cropDetails.symptoms}
//             onChange={(e) => setCropDetails({ ...cropDetails, symptoms: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="detail-input"
//             value={cropDetails.location}
//             onChange={(e) => setCropDetails({ ...cropDetails, location: e.target.value })}
//           />
//           <button onClick={handleCropDetailsSubmit} className="submit-btn">Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planty;




// import React, { useState } from "react";
// import "./styles/Planty.css";

// const Planty = () => {
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userChoice, setUserChoice] = useState(null);
//   const [cropDetails, setCropDetails] = useState({ cropName: "", symptoms: "", location: "" });

//   const sendMessageToBackend = async (message) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch response from backend");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error sending message:", error);
//       return { response: "Sorry, something went wrong. Please try again later." };
//     }
//   };

//   const sendDiagnosisToBackend = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/diagnose", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cropDetails),
//       });

//       if (!response.ok) throw new Error("Failed to fetch diagnosis from backend");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error sending diagnosis:", error);
//       return { response: "Diagnosis service is currently unavailable." };
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     setChatHistory([...chatHistory, { sender: "User", message: inputText }]);

//     const data = await sendMessageToBackend(inputText);

//     setChatHistory((prev) => [
//       ...prev,
//       { sender: "Planty", message: data.response },
//     ]);

//     if (data.request_details) {
//       setUserChoice("request_details");
//     }

//     setInputText("");
//   };

//   const handleCropDetailsSubmit = async () => {
//     const { cropName, symptoms, location } = cropDetails;
//     if (cropName && symptoms && location) {
//       setChatHistory([...chatHistory, { sender: "User", message: `Crop: ${cropName}, Symptoms: ${symptoms}, Location: ${location}` }]);

//       const data = await sendDiagnosisToBackend();
//       setChatHistory((prev) => [...prev, { sender: "Planty", message: data.response }]);

//       setUserChoice(null);
//       setCropDetails({ cropName: "", symptoms: "", location: "" });
//     }
//   };

//   return (
//     <div className="planty-container">
//       <h1 className="planty-title">🤖🌳 Planty - AI Crop Care Assistant</h1>
//       <p className="planty-subtitle">Ask me how to take care of your crops! 🌿</p>

//       <div className="chat-box">
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className={`chat-message ${chat.sender === "User" ? "user-message" : "bot-message"}`}>
//               <strong>{chat.sender}:</strong> {chat.message}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Describe the issue with your crop..."
//           className="text-input"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSend} className="send-btn">Send</button>
//       </div>

//       {userChoice === "request_details" && (
//         <div className="crop-details">
//           <h2>Provide Crop Details</h2>
//           <input
//             type="text"
//             placeholder="Crop Name"
//             className="detail-input"
//             value={cropDetails.cropName}
//             onChange={(e) => setCropDetails({ ...cropDetails, cropName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Symptoms"
//             className="detail-input"
//             value={cropDetails.symptoms}
//             onChange={(e) => setCropDetails({ ...cropDetails, symptoms: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="detail-input"
//             value={cropDetails.location}
//             onChange={(e) => setCropDetails({ ...cropDetails, location: e.target.value })}
//           />
//           <button onClick={handleCropDetailsSubmit} className="submit-btn">Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planty;




// import React, { useState } from "react";
// import "./styles/Planty.css";
// import ReactMarkdown from "react-markdown";

// <ReactMarkdown>{botResponse}</ReactMarkdown>


// const Planty = () => {
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userChoice, setUserChoice] = useState(null);
//   const [cropDetails, setCropDetails] = useState({ cropName: "", symptoms: "", location: "" });

//   const sendMessageToBackend = async (message) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch response from backend");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error sending message:", error);
//       return { response: "Sorry, something went wrong. Please try again later." };
//     }
//   };

//   const sendDiagnosisToBackend = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/diagnose", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cropDetails),
//       });

//       if (!response.ok) throw new Error("Failed to fetch diagnosis from backend");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error sending diagnosis:", error);
//       return { response: "Diagnosis service is currently unavailable." };
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     setChatHistory([...chatHistory, { sender: "User", message: inputText }]);

//     let botResponse = "";
//     if (inputText.toLowerCase().includes("disease") || inputText.toLowerCase().includes("problem")) {
//       setUserChoice("request_details");
//       botResponse = "Please provide:\n1. Crop Name 🌾\n2. Symptoms 🍂\n3. Location 🌍";
//     } else {
//       const data = await sendMessageToBackend(inputText);
//       botResponse = data.response || "Sorry, I didn't understand that.";
//     }

//     setChatHistory((prev) => [...prev, { sender: "Planty", message: botResponse }]);
//     setInputText("");
//   };

//   const handleCropDetailsSubmit = async () => {
//     if (!cropDetails.cropName || !cropDetails.symptoms || !cropDetails.location) return;

//     setChatHistory([...chatHistory, { sender: "User", message: `Crop: ${cropDetails.cropName}, Symptoms: ${cropDetails.symptoms}, Location: ${cropDetails.location}` }]);

//     const data = await sendDiagnosisToBackend();
//     setChatHistory((prev) => [...prev, { sender: "Planty", message: data.response }]);

//     setUserChoice(null);
//     setCropDetails({ cropName: "", symptoms: "", location: "" });
//   };

//   return (
//     <div className="planty-container">
//       <h1 className="planty-title">🤖🌳 Planty - AI Crop Care Assistant</h1>
//       <p className="planty-subtitle">Ask me how to take care of your crops! 🌿</p>

//       <div className="chat-box">
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className={`chat-message ${chat.sender === "User" ? "user-message" : "bot-message"}`}>
//               <strong>{chat.sender}:</strong> {chat.message}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Describe the issue with your crop..."
//           className="text-input"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSend} className="send-btn">Send</button>
//       </div>

//       {userChoice === "request_details" && (
//         <div className="crop-details">
//           <h2>Provide Crop Details</h2>
//           <input
//             type="text"
//             placeholder="Crop Name"
//             className="detail-input"
//             value={cropDetails.cropName}
//             onChange={(e) => setCropDetails({ ...cropDetails, cropName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Symptoms"
//             className="detail-input"
//             value={cropDetails.symptoms}
//             onChange={(e) => setCropDetails({ ...cropDetails, symptoms: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="detail-input"
//             value={cropDetails.location}
//             onChange={(e) => setCropDetails({ ...cropDetails, location: e.target.value })}
//           />
//           <button onClick={handleCropDetailsSubmit} className="submit-btn">Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planty;



import React, { useState } from "react";
import "./styles/Planty.css";
import ReactMarkdown from "react-markdown";

const Planty = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userChoice, setUserChoice] = useState(null);
  const [cropDetails, setCropDetails] = useState({ cropName: "", symptoms: "", location: "" });

  const sendMessageToBackend = async (message) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to fetch response from backend");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      return { response: "Sorry, something went wrong. Please try again later." };
    }
  };

  const sendDiagnosisToBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cropDetails),
      });

      if (!response.ok) throw new Error("Failed to fetch diagnosis from backend");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending diagnosis:", error);
      return { response: "Diagnosis service is currently unavailable." };
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setChatHistory([...chatHistory, { sender: "User", message: inputText }]);

    let botResponse = "";
    if (inputText.toLowerCase().includes("disease") || inputText.toLowerCase().includes("problem")) {
      setUserChoice("request_details");
      botResponse = "Please provide:\n1. Crop Name 🌾\n2. Symptoms 🍂\n3. Location 🌍";
    } else {
      const data = await sendMessageToBackend(inputText);
      botResponse = data.response || "Sorry, I didn't understand that.";
    }

    setChatHistory((prev) => [...prev, { sender: "Planty", message: botResponse }]);
    setInputText("");
  };

  const handleCropDetailsSubmit = async () => {
    if (!cropDetails.cropName || !cropDetails.symptoms || !cropDetails.location) return;

    setChatHistory([...chatHistory, { sender: "User", message: `Crop: ${cropDetails.cropName}, Symptoms: ${cropDetails.symptoms}, Location: ${cropDetails.location}` }]);

    const data = await sendDiagnosisToBackend();
    setChatHistory((prev) => [...prev, { sender: "Planty", message: data.response }]);

    setUserChoice(null);
    setCropDetails({ cropName: "", symptoms: "", location: "" });
  };

  return (
    <div className="planty-container">
      <h1 className="planty-title">🤖🌳 Planty - AI Crop Care Assistant</h1>


      <div className="chat-box">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender === "User" ? "user-message" : "bot-message"}`}>
              <strong>{chat.sender}:</strong>
              {chat.sender === "Planty" ? (
                <ReactMarkdown>{chat.message}</ReactMarkdown> // Rendering Markdown properly
              ) : (
                <span>{chat.message}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Describe the issue with your crop..."
          className="text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleSend} className="send-btn">Send</button>
      </div>

      {userChoice === "request_details" && (
        <div className="crop-details">
          <h2>Provide Crop Details</h2>
          <input
            type="text"
            placeholder="Crop Name"
            className="detail-input"
            value={cropDetails.cropName}
            onChange={(e) => setCropDetails({ ...cropDetails, cropName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Symptoms"
            className="detail-input"
            value={cropDetails.symptoms}
            onChange={(e) => setCropDetails({ ...cropDetails, symptoms: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="detail-input"
            value={cropDetails.location}
            onChange={(e) => setCropDetails({ ...cropDetails, location: e.target.value })}
          />
          <button onClick={handleCropDetailsSubmit} className="submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Planty;
