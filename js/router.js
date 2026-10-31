export function identifyTask(question) {

    const text = question.toLowerCase();

    if (/image|photo|picture/.test(text)) {
        return "Image AI";
    }

    if (/video|movie/.test(text)) {
        return "Video AI";
    }

    if (/code|coding|program|python|javascript|java|debug/.test(text)) {
        return "Coding AI";
    }

    if (/math|calculate|solve|equation/.test(text)) {
        return "Mathematics AI";
    }

    if (/pdf|document/.test(text)) {
        return "Document AI";
    }

    if (/science|physics|chemistry/.test(text)) {
        return "Science AI";
    }

    return "General AI";
}
