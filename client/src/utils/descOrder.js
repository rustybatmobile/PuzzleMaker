export default function descOrder(arr) {
    const result = [...arr];
    result.sort(function(a, b){return b - a});
    return result;
}