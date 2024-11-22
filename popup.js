// Set the worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "libs/pdf.worker.min.js";

// Handle PDF Upload
document.getElementById("uploadResume").addEventListener("click", () => {
    const fileInput = document.getElementById("resumeFile");
    fileInput.click();
});

document.getElementById("resumeFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const typedArray = new Uint8Array(e.target.result);
            try {
                const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    text += content.items.map(item => item.str).join(" ");
                }
                saveToStorage({ resumeContent: text });
                displayResumeContent(text);
            } catch (error) {
                console.error("Error reading PDF:", error);
                alert("Failed to read the PDF file.");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("No file selected.");
    }
});

// Save data to storage
function saveToStorage(data) {
    chrome.storage.local.set(data, () => {
        console.log("Data saved:", data);
    });
}

// Load data from storage
function loadFromStorage(keys, callback) {
    chrome.storage.local.get(keys, callback);
}

// Display Resume Content
function displayResumeContent(content) {
    const container = document.getElementById("resumeContentContainer");
    container.textContent = content;
    container.style.display = "block";
}

// Save ChatGPT API Key
document.getElementById("saveApiKey").addEventListener("click", () => {
    const apiKey = document.getElementById("apiKeyInput").value.trim();
    if (apiKey) {
        saveToStorage({ apiKey });
        alert("API key saved successfully!");
    } else {
        alert("Please enter a valid API key.");
    }
});

// Clear Data
document.getElementById("clearData").addEventListener("click", () => {
    chrome.storage.local.clear(() => {
        console.log("Data cleared.");
        alert("All saved data has been cleared.");
        location.reload();
    });
});

// Analyze with ChatGPT
document.getElementById("analyzeText").addEventListener("click", async () => {
    const jobDescription = document.getElementById("jobDescriptionInput").value.trim();
    if (!jobDescription) {
        alert("Please paste the job description in the text box.");
        return;
    }

    loadFromStorage(["apiKey", "resumeContent"], async (data) => {
        if (!data.apiKey || !data.resumeContent) {
            alert("Missing API Key or Resume. Please upload the resume and save the API Key.");
            return;
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            "role": "system",
                            "content": "You are an ATS system analyzing resumes. Your task is to evaluate the alignment between a resume and a job description based on keywords, experience, and role-specific requirements. Present your findings in a structured and readable format."
                        },
                        {
                            "role": "user",
                            "content": `Compare the following resume with the given job description. Analyze the strengths, missing keywords, and suggest improvements. Provide the response in the following format:
                        
                            1. **Score**: Provide a score out of 100 based on keyword matching, experience alignment, and job role requirements.
                            2. **Strengths**: Highlight the key strengths of the resume (skills, experiences, and alignment with job description).
                            3. **Missing Keywords**: List any keywords from the job description that are missing in the resume. Pay attention to skills, tools, or qualifications mentioned in the job description.
                            4. **Suggestions**: Provide actionable suggestions to improve the alignment with the job description. For example, adding missing keywords, rephrasing, or reorganizing content for better clarity.
                            
                            Also, consider the importance of the job description's core requirements (e.g., "5+ years experience with Python," "Proven leadership skills," etc.)."
                        
                        Resume:
                        ${data.resumeContent}
                        
                        Job Description:
                        ${jobDescription}
                        ` }
                    ]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error Response:", errorText);
                alert("Failed to analyze the resume. Please try again.");
                return;
            }

            const result = await response.json();
            const analysisContent = result.choices[0].message.content;
            saveToStorage({ analysisResult: analysisContent });
            showModal(analysisContent);
        } catch (error) {
            console.error("Error communicating with ChatGPT:", error);
            alert("Failed to communicate with ChatGPT. Check your API key.");
        }
    });
});

// Show Modal with Results
function showModal(content) {
    const modal = document.getElementById("resultModal");
    const resultContainer = document.getElementById("analysisResult");
    resultContainer.innerHTML = formatAnalysis(content);
    modal.style.display = "flex";
}

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("resultModal").style.display = "none";
});

// Format Analysis
function formatAnalysis(content) {
    return content
        .replace(/(?:\*\*([^*]+)\*\*)/g, "<strong>$1</strong>") // Format **bold**
        .replace(/\n/g, "<br>"); // Convert newlines to <br>
}

// Restore saved data on popup load
document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage(["resumeContent", "apiKey", "analysisResult", "jobDescription"], (data) => {
        if (data.resumeContent) {
            displayResumeContent(data.resumeContent);
        }
        if (data.apiKey) {
            document.getElementById("apiKeyInput").value = data.apiKey;
        }
        if (data.analysisResult) {
            showModal(data.analysisResult);
        }
        if (data.jobDescription) {
            document.getElementById("jobDescriptionInput").value = data.jobDescription;
        }
    });

    const jobDescriptionInput = document.getElementById("jobDescriptionInput");
    jobDescriptionInput.addEventListener("input", () => {
        saveToStorage({ jobDescription: jobDescriptionInput.value });
    });
});
