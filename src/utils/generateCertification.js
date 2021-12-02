module.exports = (initialCharacter) => {
    return `${initialCharacter}${Math.floor(Math.random() * (999999 - 100000)) + 100000}`;
}