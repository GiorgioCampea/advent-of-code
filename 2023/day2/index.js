export const part1 = ({ input }) => {
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;
    // leaving only the impossible games
    return input.reduce((total, game) => {
        const [tag, sets] = game.split(": ");
        const id = parseInt(tag.split(" ")[1]);
        const isValid = getMaxPerColor(sets, 'blue') <= maxBlue && getMaxPerColor(sets, 'green') <= maxGreen && getMaxPerColor(sets, 'red') <= maxRed;
        return isValid ? total + id : total;
    }, 0);
};

export const part2 = ({ input }) => {
    return input.reduce((total, game) => {
        const maxBlue = getMaxPerColor(game, 'blue');
        const maxGreen = getMaxPerColor(game, 'green');
        const maxRed = getMaxPerColor(game, 'red');
        return total + (maxBlue * maxGreen * maxRed);
    }, 0);
};

const getMaxPerColor = (sets, color) => {
    const re = new RegExp(`\\d+(\\.\\d)* ${color}+`, 'g');
    return Math.max(...(sets.match(re).map(match => match.split(" ")[0])));
}