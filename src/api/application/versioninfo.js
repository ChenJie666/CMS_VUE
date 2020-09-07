import request from '@/utils/request.js'

export default {

    getInfoList(searchFactor) {
        return request({
            url: `/application/version/infoList`,
            method: 'post',
            data: searchFactor
        })
    },

    addInfo(versionInfo){
        return request({
            url: '/application/version/addInfo',
            method: 'post',
            data: versionInfo
        })
    },

    updateInfo(versionInfo){
        return request({
            url: '/application/version/updateInfo',
            method: 'post',
            data: versionInfo
        })
    },

    deleteInfo(id){
        return request({
            url: `/application/version/deleteInfo/${id}`,
            method: 'delete'
        })
    }

}
