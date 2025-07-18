const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const micBtn = document.getElementById("mic-btn");

// --- 1. Speech Recognition (Voice to Text) ---
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false; // Stop listening after a pause
  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    if (micBtn.classList.contains("recording")) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  recognition.onstart = () => {
    micBtn.classList.add("recording");
  };

  recognition.onend = () => {
    micBtn.classList.remove("recording");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    // Automatically trigger form submission
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  };
} else {
  console.log("Speech Recognition not supported.");
  micBtn.style.display = "none"; // Hide mic button if not supported
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  input.value = "";

  // Add a "thinking" message, and keep a reference to it
  const thinkingMessage = appendMessage("bot", "Gemini is thinking...");
  thinkingMessage.classList.add("thinking");

  // Send user message to the backend
  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((res) => {
      if (!res.ok) {
        // Handle HTTP errors like 400 or 500
        return res.json().then((errData) => {
          throw new Error(
            errData.error || `Server responded with status: ${res.status}`
          );
        });
      }
      return res.json();
    })
    .then((data) => {
      // Update the "thinking" message with the actual reply
      thinkingMessage.classList.remove("thinking");
      thinkingMessage.textContent = data.reply;

      // --- 3. Text to Speech (Read the reply aloud) ---
      speak(data.reply);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      // Update the "thinking" message with an error
      thinkingMessage.classList.remove("thinking");
      thinkingMessage.textContent = `Sorry, an error occurred: ${error.message}`;
    });
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  // Return the message element so we can update it later
  return msg;
}

// --- 2. Speech Synthesis (Text to Voice) ---
function speak(text) {
  if ("speechSynthesis" in window) {
    // Stop any previous speech before starting a new one
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}
