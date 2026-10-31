import { identifyTask } from "./router.js";

const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const status = document.getElementById("status");

let engine = null;
let loading = false;

let conversation = [
    {
        role: "system",
        content: "You are AI7, a helpful AI assistant. Give clear and simple answers."
    }
];

function addMessage(message, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.textContent = message;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

async function loadAI() {
    if (engine) return;

    if (!navigator.gpu) {
        throw new Error("WebGPU is not supported. Try an updated Chrome browser on a compatible device.");
    }

    status.textContent = "Loading AI model...";

    const { CreateMLCEngine } =
        await import("https://esm.run/@mlc-ai/web-llm");

    engine = await CreateMLCEngine(
        "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
        {
            initProgressCallback: (progress) => {
                status.textContent = progress.text;
            }
        }
    );
}

async function sendMessage() {
    const question = userInput.value.trim();

    if (!question || loading) return;

    addMessage(question, "user");
    userInput.value = "";

    loading = true;
    sendButton.disabled = true;

    const selectedAI = identifyTask(question);

    const reply = addMessage("AI7 is thinking...", "bot");

    try {
        await loadAI();

        conversation.push({
            role: "user",
            content: question
        });

        const result = await engine.chat.completions.create({
            messages: conversation,
            temperature: 0.7,
            max_tokens: 700
        });

        const answer = result.choices[0].message.content;

        reply.textContent = answer;

        conversation.push({
            role: "assistant",
            content: answer
        });

        status.textContent = "AI7 Ready | " + selectedAI;

    } catch (error) {
        reply.textContent = "AI7 Error: " + error.message;
        status.textContent = "Something went wrong. Check your browser.";
        console.error(error);
    }

    loading = false;
    sendButton.disabled = false;
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

status.textContent = "AI7 Ready";
