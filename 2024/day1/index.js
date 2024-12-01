export const part1 = ({ input }) => {
    // trasformiamo l'input in due liste
    const firstArray = [];
    const secondArray = [];
    for (const row of input) {
        const [firstValue, secondValue] = row.split('   ');
        firstArray.push(firstValue);
        secondArray.push(secondValue);
    }
    // ordiniamo la prima in ordine crescente
    firstArray.sort();
    secondArray.sort();
    return firstArray.reduce((prev, curr, index) => prev + Math.abs(secondArray[index] - curr), 0);
};

export const part2 = ({ input }) => {
    const firstArray = [];
    const secondArray = [];
    for (const row of input) {
        const [firstValue, secondValue] = row.split('   ');
        firstArray.push(firstValue);
        secondArray.push(secondValue);
    }
    return firstArray.reduce((prev, curr, index) => {
        // contiamo le occorrenze di ogni elemento nella seconda lista
        const occurencies = secondArray.filter((el) => el === curr).length;
        return prev + curr * occurencies;
    }, 0);
};