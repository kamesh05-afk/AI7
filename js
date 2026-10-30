function identifyTask(question) {

    const text = question.toLowerCase();

    if (text.includes("image") || text.includes("photo")) {
        return "Image AI";
    }

    if (text.includes("video")) {
        return "Video AI";
    }

    if (
        text.includes("code") ||
        text.includes("program") ||
        text.includes("python") ||
        text.includes("javascript")
    ) {
        return "Coding AI";
    }

    if (
        text.includes("math") ||
        text.includes("calculate") ||
        text.includes("solve")
    ) {
        return "Mathematics AI";
    }

    if (
        text.includes("pdf") ||
        text.includes("document")
    ) {
        return "Document AI";
    }

    return "General AI";
}


const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const status = document.getElementById("status");

function addMessage(message, type) {

    const div = document.createElement("div");

    div.className = "message " + type;
    div.textContent = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {

    const question = userInput.value.trim();

    if (question === "") {
        return;
    }

    addMessage(question, "user");

    const selectedAI = identifyTask(question);

    addMessage(
        "AI7 identified your task. Selected category: " +
        selectedAI +
        ". This is currently a demonstration. Real AI connection will be added next.",
        "bot"
    );

    status.textContent = "Demo Mode | Selected: " + selectedAI;

    userInput.value = "";
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
