export function arrToMap(arr, k, v) {
    var ms = new Map();
    for (var i = 0; i < arr.length; i++) {
        ms.set(arr[i][k], arr[i][v]);
    }
    return ms
}
export function bUrl() {
    //var ls = "http://121.41.68.248:8002"
    //var ls = "http://192.168.32.128"
    var ls = "/api"
    return ls
}