export function arrToMap(arr, k, v) {
    var ms = new Map();
    for (var i = 0; i < arr.length; i++) {
        ms.set(arr[i][k], arr[i][v]);
    }
    return ms
}
export function bUrl() {
    return "http://121.41.68.248:8002"
}