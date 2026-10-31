import { CreateMLCEngine } from
"https://esm.run/@mlc-ai/web-llm";

import { identifyTask } from "./router.js";

const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const status = document.getElementById("status");

const MODEL = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";

let engine = null;
let loading = false;

let conversation = [
    {
        role: "system",
        content: "You are AI7, a helpful AI assistant. Give clear, accurate and easy-to-understand answers."
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
        throw new Error(
            "WebGPU is not supported by this browser or device. Try an updated Chrome or Edge browser."
        );
    }

    status.textContent = "Loading AI model... Please wait.";

    engine = await CreateMLCEngine(
        MODEL,
        {
            initProgressCallback: (progress) => {

                const percent = Math.round(
                    (progress.progress || 0) * 100
                );

                status.textContent =
                    progress.text || `Loading AI: ${percent}%`;
            }
        }
    );

    status.textContent = "AI7 is ready!";
}

async function sendMessage() {

    const question = userInput.value.trim();

    if (!question || loading) return;

    addMessage(question, "user");

    userInput.value = "";

    loading = true;
    sendButton.disabled = true;

    const selectedAI = identifyTask(question);

    const replyBox = addMessage(
        "AI7 is preparing your answer...",
        "bot"
    );

    status.textContent = "Selected: " + selectedAI;

    try {

        await loadAI();

        conversation.push({
            role: "user",
            content: question
        });

        const response =
            await engine.chat.completions.create({

                messages: conversation,

                temperature: 0.7,

                max_tokens: 700
            });

        const answer =
            response.choices[0].message.content;

        replyBox.textContent = answer;

        conversation.push({
            role: "assistant",
            content: answer
        });

        // Keep conversation history manageable.
        if (conversation.length > 11) {
            conversation.splice(1, 2);
        }

        status.textContent =
            "AI7 Ready | Selected: " + selectedAI;

    } catch (error) {

        replyBox.textContent =
            "AI7 Error: " + error.message;

        status.textContent = "AI loading or generation failed.";

        console.error(error);
    }

    loading = false;
    sendButton.disabled = false;
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
