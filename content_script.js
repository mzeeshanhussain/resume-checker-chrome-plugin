// // Listen for text selection
// document.addEventListener("mouseup", () => {
//     const selectedText = window.getSelection().toString().trim();
//     if (selectedText) {
//         chrome.runtime.sendMessage({ type: "highlightedText", text: selectedText }, (response) => {
//             console.log("Message sent, response:", response);
//         });
//     }
// });
