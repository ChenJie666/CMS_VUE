export default class OfficialStatusEnums {
    static isOfficialStatus(val) {
        const map = new Map();
        map.set(true, '火星人实验室');
        map.set(false, '用户');
        return map.get(val);
    }
}
