export function arrToMap(arr, k, v) {
    var ms = new Map();
    for (var i = 0; i < arr.length; i++) {
        ms.set(arr[i][k], arr[i][v]);
    }
    return ms
}