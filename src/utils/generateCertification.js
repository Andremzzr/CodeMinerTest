module.exports = (initialCharacter) => {
    return `${initialCharacter}${Math.floor(Math.random() * (100000 - 1)) + 1}`;
}