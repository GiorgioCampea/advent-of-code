export const part1 = ({ input }) => {
    return input.reduce((acc, curr) => {
        const match      = curr.match(/\d/gi);
        const firstIndex = curr.indexOf(match[0]);
        const lastDigit  = curr.lastIndexOf(match[match.length-1]);
        return acc + +`${curr[firstIndex]}${curr[lastDigit]}`;
    }, 0);
};

export const part2 = ({ input }) => {
    const digits = [
        ['one', 'o1e'],
        ['two', 't2o'],
        ['three', 't3e'],
        ['four', '4'],
        ['five', '5e'],
        ['six', '6'],
        ['seven', '7n'],
        ['eight', 'e8'],
        ['nine', '9']
      ];
      return input.reduce((acc, curr) => {
        digits.forEach(digit => { curr = curr.replaceAll(digit[0], digit[1]) });
        const match      = curr.match(/\d/gi);
        const firstIndex = curr.indexOf(match[0]);
        const lastDigit  = curr.lastIndexOf(match[match.length-1]);
        return acc + +`${curr[firstIndex]}${curr[lastDigit]}`;
    }, 0);
};