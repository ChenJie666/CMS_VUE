import Vue from "vue"
import Router from "vue-router"
import App from "../App";

// 路由懒加载
const Login = () => import('../views/Login');
const Home = () => import('../views/Home');
const Index = () => import('../views/Index');
const commonMenu =() => import('../views/menu/commonMenu');
const menuList =() => import('../views/menu/menuList');
const menuAdd =() => import('../views/menu/menuAdd');
const menuDetail =() => import('../views/menu/menuDetail');
const menuLook =() => import('../views/menu/menuLook');
const qsixMenu =() => import('../views/menu/qsixMenu');
const qsixLook =() => import('../views/menu/qsixLook');
const qsixDetail =() => import('../views/menu/qsixDetail');
const recommendMenu =() => import('../views/menu/recommendMenu');
const recommendLook =() => import('../views/menu/recommendLook');
const recommendDetail =() => import('../views/menu/recommendDetail');
const deviceList =() => import('../views/device/deviceList');
const deviceAdd =() => import('../views/device/deviceAdd');
const deviceDetail =() => import('../views/device/deviceDetail');
const typeList =() => import('../views/type/typeList');
const typeAdd =() => import('../views/type/typeAdd');
const typeDetail =() => import('../views/type/typeDetail');
const appIndexRecommend =() => import('../views/appmananger/indexRecommend');
const bannerList =() => import('../views/appmananger/bannerList');
const columnList =() => import('../views/appmananger/columnList');
const columnAdd =() => import('../views/appmananger/columnAdd');
const columnDetail =() => import('../views/appmananger/columnDetail');
const columnMenu =() => import('../views/appmananger/columnMenu');
const versionList =() => import('../views/version/versionList');
const versionAdd =() => import('../views/version/versionAdd');
const commonArticle =() => import('../views/article/commonArticle');
const articleList =() => import('../views/article/articleList');
const articleAdd =() => import('../views/article/articleAdd');
const articleDetail =() => import('../views/article/articleDetail');
const articleLook =() => import('../views/article/articleLook');
const commonActivity =() => import('../views/activity/commonActivity');
const activityList =() => import('../views/activity/activityList');
const activityAdd =() => import('../views/activity/activityAdd');
const activityDetail =() => import('../views/activity/activityDetail');
const activityLook =() => import('../views/activity/activityLook');
const draftList =() => import('../views/draft/draftList');
const recycleList =() => import('../views/recycle/recycleList');
const Clock =() => import('../views/application/Clock.vue');
const Weather =() => import('../views/application/Weather.vue');
const Festival =() => import('../views/application/Festival.vue');
const ShortMessage =() => import('../views/application/ShortMessage.vue');
const Voice =() => import('../views/application/Voice.vue');
const DevicePush =() => import('../views/application/DevicePush.vue');

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            {path: '/', component: Index},
            {path: '/menu/common',component: commonMenu},
            {path: '/menu/menuList',component: menuList},
            {path: '/menu/menuAdd',component: menuAdd},
            {path: '/menu/menuDetail',component: menuDetail},
            {path: '/menu/menulook',component: menuLook},
            {path: '/menu/qsix',component: qsixMenu},
            {path: '/menu/qsixLook',component: qsixLook},
            {path: '/menu/qsixDetail',component: qsixDetail},
            {path: '/menu/recommend',component: recommendMenu},
            {path: '/menu/recommendLook',component: recommendLook},
            {path: '/menu/recommendDetail',component: recommendDetail},
            {path: '/device/deviceList',component: deviceList},
            {path: '/device/deviceAdd',component: deviceAdd},
            {path: '/device/deviceDetail',component: deviceDetail},
            {path: '/type/typeList',component: typeList},
            {path: '/type/typeAdd',component: typeAdd},
            {path: '/type/typeDetail',component: typeDetail},
            {path: '/appmananger/indexRecommend',component: appIndexRecommend},
            {path: '/appmananger/bannerList',component: bannerList},
            {path: '/appmananger/columnList',component: columnList},
            {path: '/appmananger/columnAdd',component: columnAdd},
            {path: '/appmananger/columnDetail',component: columnDetail},
            {path: '/appmananger/columnMenu',component: columnMenu},
            {path: '/version/versionList',component: versionList},
            {path: '/version/versionAdd',component: versionAdd},
            {path: '/article/common',component: commonArticle},
            {path: '/article/articleList',component: articleList},
            {path: '/article/articleAdd',component: articleAdd},
            {path: '/article/articleDetail',component: articleDetail},
            {path: '/article/articlelook',component: articleLook},
            {path: '/activity/common',component: commonActivity},
            {path: '/activity/activityList',component: activityList},
            {path: '/activity/activityAdd',component: activityAdd},
            {path: '/activity/activityDetail',component: activityDetail},
            {path: '/activity/activitylook',component: activityLook},
            {path: '/draft/draftList',component: draftList},
            {path: '/recycle/recycleList',component: recycleList},
            {path: '/application/clock',component: Clock},
            {path: '/application/weather',component: Weather},
            {path: '/application/festival',component: Festival},
            {path: '/application/shortmessage',component: ShortMessage},
            {path: '/application/voice',component: Voice},
            {path: '/application/devicepush',component: DevicePush}
            
        ]
    }
];


export default new Router({
    routes,
})
