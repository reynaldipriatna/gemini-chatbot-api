# Gemini AI Chatbot

A modern, interactive chatbot web application built with Node.js, Express, and Vanilla JavaScript, powered by the Google Gemini API. This project features a clean, iMessage-like interface with both text and voice interaction capabilities.

## Features

- **Real-time AI Responses:** Integrates with the Google Gemini API for intelligent and conversational replies.
- **Modern UI:** Aesthetically pleasing iMessage-style chat interface.
- **Voice-to-Text:** Use your microphone to speak your messages, which are transcribed into text using the browser's Web Speech API.
- **Text-to-Speech:** The chatbot's replies are read aloud for a more engaging user experience.
- **Intuitive Controls:** The microphone icon transforms into a stop icon during recording, providing clear visual feedback.
- **User Feedback:** A "Gemini is thinking..." indicator lets the user know when the AI is processing a response.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI:** Google Gemini API (`@google/generative-ai`)
- **Environment Variables:** `dotenv`

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/reynaldipriatna/gemini-chatbot-api.git
cd gemini-chatbot-api
```

### 2. Install Dependencies

Install the required npm packages for the backend server.

```bash
npm install
```

### 3. Set Up Environment Variables

You need a Google Gemini API key to use this application.

1.  Create a `.env` file in the root of the project directory by copying the example file: `cp .env.example .env`
2.  Add your API key to the `.env` file:

    ```env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

    You can get your API key from Google AI Studio.

### 4. Run the Application

Start the Node.js server.

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoint

The application uses a single API endpoint to handle chat interactions:

- `POST /api/chat`
  - **Request Body:** `{ "message": "Your message here" }`
  - **Success Response:** `{ "reply": "Gemini's response here" }`
  - **Error Response:** `{ "error": "Error message" }`

## Important Note: Gemini SDK

This project uses the `@google/generative-ai` SDK, which is now considered a **legacy package** and will stop receiving support on **August 31st, 2025**. For new projects, it is highly recommended to use the new, official **Google Generative AI SDK for JavaScript** to ensure access to the latest features and long-term support.
