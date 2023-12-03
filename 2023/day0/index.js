export const part1 = ({ input }) => {
    const stringToMatch = input[0];
    const up = (stringToMatch.match(/\(/g) || []).length;
    const down = (stringToMatch.match(/\)/g) || []).length;
    const result = up - down;
    return result;
};

export const part2 = ({ input }) => {
    const stringArray = input[0].split('');
    let level = 0;
    for(const [index, char] of stringArray.entries()) {
        if (char === '(') {
            level += 1; 
        } else {
            level -= 1; 
        }
        if (level === -1) {
            return index + 1;
        }
    };
    // error not found
    return -1;
};