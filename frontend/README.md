# Grammar Correction Tool

This project is a **Grammar Correction Tool** that identifies issues in the text and provides corrections for them. The tool allows users to input a block of text, checks it for grammar errors using the **LanguageTool API**, and highlights the problematic areas directly within the text. Additionally, it lists the suggested corrections to improve the text.

## Features

- **Real-time Grammar Correction**: Highlights errors directly in the text and provides suggestions.
- **Interactive Text Input**: Users can enter their own text or insert a sample text to test the tool.
- **Responsive Design**: The app is responsive and styled using **TailwindCSS**.
- **API-Driven**: Utilizes the **LanguageTool API** for grammar checking.

## Technologies Used

- **React**: For building the user interface and managing state.
- **TailwindCSS**: For responsive design and easy styling.
- **Python** and **Flask**: Backend server handling requests to the LanguageTool API.
- **LanguageTool API**: Provides grammar suggestions and corrections for the text.

## Installation and Running the Project

### Frontend Setup

1. **Navigate to the `frontend/` directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run start
   ```

The app will be running locally at `http://localhost:3000`.

### Backend Setup (Optional)

If you need to run the Flask server locally:

1. **Navigate to the `backend/` directory**.
2. **Create a virtual environment** and install dependencies:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Start the Flask server**:
   ```bash
   flask run
   ```

## How It Works

1. **Enter Text**: Input your text in the text area, or use the sample text.
2. **Submit for Grammar Check**: Press the "Check Grammar" button to analyze the text.
3. **View Results**:
   - The text with errors will be **underlined** in the original text.
   - Suggestions for corrections will be listed below the text input.
