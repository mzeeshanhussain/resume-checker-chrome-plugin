# Resume Checker Chrome Extension

The Resume Checker Chrome Extension is a tool designed to help job seekers analyze their resumes in comparison to a job description. This tool uses AI-powered analysis to evaluate how well a resume aligns with a specific job role, providing a score out of 100, highlighting strengths, identifying missing keywords, and offering actionable suggestions for improvement.

### Features

- Upload Resume: Upload PDF resumes and extract the text.
- Job Description Analysis: Paste a job description and compare it with the uploaded resume.
- AI-Powered Insights: Get a score and actionable suggestions based on OpenAI's GPT model.
- Track API Key: Save and use your own ChatGPT API key for personalized analysis.
- Modal Results: View the analysis results in a clean, readable modal window.

## How to Install on Chrome
Since this extension is not published on the Chrome Web Store yet, follow these steps to install it manually:

### Step 1: Download or Clone the Repository
Download the code or clone this repository to your local machine:
Clone with Git:
``` git clone https://github.com/mzeeshanhussain/resume-checker-chrome-plugin.git ```
### Step 2: Enable Developer Mode in Chrome

1. Open Google Chrome and navigate to the Extensions page:
2. URL: chrome://extensions/
3. Turn on Developer mode by toggling the switch in the top right corner.
4. Click the Load unpacked button.
5. Step 3: Load the Extension
6. After clicking Load unpacked, select the folder where you saved the extension (either cloned or downloaded repository).
Your extension should now appear in the list of installed extensions.

### Step 4: Open the Extension
1. Click on the Extensions icon (top-right corner of Chrome).
2. Click on the Resume Checker icon to open the tool in a popup window.

### Step 5: Use the Tool
1. Upload your resume (PDF) using the "Upload Resume" button.
2. Paste the Job Description in the provided text box.
3. Enter your OpenAI API key.
4. Click the Analyze with ChatGPT button to get insights on how your resume aligns with the job description.
API Key

This extension uses the OpenAI API for analyzing the resume against the job description. You’ll need your ChatGPT API key to use the tool. If you don't have it already:
1. Go to OpenAI API and create an account.
2. Retrieve your API Key from the API dashboard.
3. Paste your API Key in the provided field in the extension for analysis.

### How the Tool Works
**Resume Analysis**: The tool extracts text from a PDF resume and compares it against the provided job description.
**Job Description Comparison**: It identifies missing keywords, highlights strengths, and provides suggestions on how to better align your resume with the job description.
**Scoring:** The analysis gives a score out of 100, based on how well the resume matches the job description in terms of skills, experience, and other key factors.


### Troubleshooting
**Error:** Failed to read the PDF: This could happen if the PDF is not readable or contains unsupported formatting. Ensure the PDF is not encrypted and that it contains readable text.
**API Key Issues:** If you receive an error related to the API key, double-check that it’s entered correctly and that your OpenAI account has sufficient credits or a valid plan.
## Contributing
If you'd like to contribute to this project: 
-- Fork the repository.
-- Create a new branch.
-- Commit your changes.
-- Push the changes and submit a pull request.
## License
This project is open source and available under the MIT License.




