export const convertToTitleCase = (input: string): string => {
    const trimmedInput = input.trim();
    const words = trimmedInput.split(/\s+/);
    const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const titleCaseString = titleCaseWords.join(' ');
    return titleCaseString;
};
