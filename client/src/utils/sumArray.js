export default function sumArray (arr = []) {
    let sum = 0;

    arr.forEach(el => {
        sum += el
    })

    return sum;
}