export default class MenuTypeEnums {
    static isMenuStatus(val) {
        const map = new Map();
        map.set(1, '蔬菜');
        map.set(2, '肉类');
        map.set(3, '水产');
        map.set(4, '面点');
        map.set(5, '烘焙');
        map.set(6, '其它');
        return map.get(val);
    }
}
