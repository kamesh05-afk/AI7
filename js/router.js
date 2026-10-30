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
