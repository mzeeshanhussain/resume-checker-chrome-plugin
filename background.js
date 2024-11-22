// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "highlightedText") {
//         chrome.storage.local.set({ highlightedText: message.text }, () => {
//             console.log("Highlighted text saved:", message.text);
//         });
//     }
// });