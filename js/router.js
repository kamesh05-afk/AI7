function identifyTask(question) {

const text = question.toLowerCase();

if (
    text.includes("image") ||
    text.includes("photo") ||
    text.includes("picture")
) {
    return "Image AI";
}

if (
    text.includes("video") ||
    text.includes("movie")
) {
    return "Video AI";
}

if (
    text.includes("code") ||
    text.includes("coding") ||
    text.includes("program") ||
    text.includes("python") ||
    text.includes("javascript") ||
    text.includes("java") ||
    text.includes("debug")
) {
    return "Coding AI";
}

if (
    text.includes("math") ||
    text.includes("calculate") ||
    text.includes("solve") ||
    text.includes("equation")
) {
    return "Mathematics AI";
}

if (
    text.includes("pdf") ||
    text.includes("document")
) {
    return "Document AI";
}

if (
    text.includes("science") ||
    text.includes("physics") ||
    text.includes("chemistry")
) {
    return "Science AI";
}

return "General AI";

}
