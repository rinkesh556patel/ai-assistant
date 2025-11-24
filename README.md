# AI Assistant

A modern, React-based chat application powered by Google's Gemini AI.

## Features

- **Real-time Chat Interface**: Seamless interaction with the AI assistant.
- **Powered by Gemini**: Utilizes Google's Gemini 2.5 Flash model for fast and accurate responses.
- **Markdown Support**: Renders AI responses with rich formatting using React Markdown.
- **Responsive Design**: Clean and modern UI that works across devices.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Styling**: CSS Modules / Vanilla CSS

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your Gemini API key:

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
