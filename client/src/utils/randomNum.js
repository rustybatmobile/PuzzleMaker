function getRandomNumber (min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function createArrayOfNumbers(start, end) {
    let myArray = [];

    for(let i = start; i <= end; i++) {
        myArray.push(i);
    }

    return myArray;
}


export default function generateNRandomNumbersBetweenGivenRange(min, max, n) {
    let numbersArray = createArrayOfNumbers(min, max);
    let resultantArray = [];
    for(let i = 0; i < n; i++) {
        const randomIndex = getRandomNumber(0, numbersArray.length - 1);
        let randomNumber = numbersArray[randomIndex];
        numbersArray.splice(randomIndex, 1);
        resultantArray.push(randomNumber);
    }

    return resultantArray
}



