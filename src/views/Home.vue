<template>
  <el-container class="container">
    <el-header>
      <div class="hxr-top">
        <div class="hxr-topLeft">
          <div class="hxr-headLogo">
            <img src="../assets/img/icon_logo@2x.png" alt />
          </div>
          <div class="hxr-headText">智慧菜谱管理系统</div>
        </div>
        <div class="hxr-topRight">
          <div class="hxr-headUser">
            <div class="hxr-huAva">
              <img src="../assets/img/user.jpg" alt />
            </div>
            <div class="hxr-huName">姓名:{{username}}</div>
          </div>
          <div class="hxr-headBtn">
            <el-button type="info" @click="logout">退出登陆</el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="250px">
        <el-menu :router="true" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-food"></i>
              <span>菜谱管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu/menuList">
                <i class="el-icon-position"></i>
                <span>菜谱列表</span>
              </el-menu-item>
              <el-menu-item index="/menu/qsix">
                <i class="el-icon-position"></i>
                <span>Q6本机端</span>
              </el-menu-item>
              <el-menu-item index="/menu/recommend">
                <i class="el-icon-position"></i>
                <span>Q6本机个性推荐</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/device/deviceList">
                <i class="el-icon-position"></i>
                <span>设备列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-copy-document"></i>
              <span>菜品品类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/type/typeList">
                <i class="el-icon-position"></i>
                <span>新增菜品列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-mobile-phone"></i>
              <span>菜谱APP管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/appmananger/indexRecommend">
                <i class="el-icon-position"></i>
                <span>首页推荐菜谱管理</span>
              </el-menu-item>
              <el-menu-item index="/appmananger/bannerList">
                <i class="el-icon-position"></i>
                <span>轮播图</span>
              </el-menu-item>
              <el-menu-item index="/appmananger/columnMenu">
                <i class="el-icon-position"></i>
                <span>APP栏目菜谱</span>
              </el-menu-item>
              <el-menu-item index="/appmananger/columnList">
                <i class="el-icon-position"></i>
                <span>APP栏目管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-refresh"></i>
              <span>菜谱版本管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/version/versionList">
                <i class="el-icon-position"></i>
                <span>设备版本列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/article/articleList">
              <i class="el-icon-position"></i>
              <span>文章库</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-orange"></i>
              <span>活动管理</span>
            </template>
            <el-menu-item index="/activity/activityList">
              <i class="el-icon-cpu"></i>
              <span>活动库</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/draft/draftList">
            <template slot="title">
              <i class="el-icon-folder-remove"></i>
              <span>草稿箱</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/recycle/recycleList">
            <template slot="title">
              <i class="el-icon-folder-delete"></i>
              <span>回收站</span>
            </template>
          </el-menu-item>
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-cloudy" />
              <span>应用云管理</span>
            </template>
            <el-menu-item index="/application/clock">
              <i class="el-icon-alarm-clock" />
              <span>时钟管理</span>
            </el-menu-item>
            <el-menu-item index="/application/weather">
              <i class="el-icon-sunny" />
              <span>天气管理</span>
            </el-menu-item>
            <el-menu-item index="/application/festival">
              <i class="el-icon-magic-stick" />
              <span>节日列表</span>
            </el-menu-item>
            <el-menu-item index="/application/shortmessage">
              <i class="el-icon-printer" />
              <span>短消息列表</span>
            </el-menu-item>
            <el-menu-item index="/application/voice">
              <i class="el-icon-phone-outline" />
              <span>语音包列表</span>
            </el-menu-item>
            <el-menu-item index="/application/versionInfo">
              <i class="el-icon-document" />
              <span>版本信息列表</span>
            </el-menu-item>
            <el-menu-item index="/application/devicepush">
              <i class="el-icon-s-promotion" />
              <span>物模型推送</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  beforeCreate() {
    // 获取token  vuex中获取  const token = ...
    // 无 进入到登陆页 if (!token)   this.$router.push({path: 'login'})
    // if token 有 -> 继续渲染  if ()
  },
  data() {
    return {
      username: this.$store.state.loginUserName,
    };
  },
  methods: {
    logout() {
      this.$confirm("确认要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message.success("退出成功");
        /*//确认退出，清除token
                    localStorage.removeItem('token')*/
        this.$router.push({ path: "/login" });
      });
    },
  },
};
</script>

<style>
.hxr-top {
  height: 100%;
  display: flex;
  display: -webkit-flex;
}
.hxr-top > .hxr-topLeft {
  height: 100%;
  flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
}
.hxr-top > .hxr-topRight {
  height: 100%;
  flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
.hxr-headLogo {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.hxr-headLogo > img {
  height: 60%;
}
.hxr-headText {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding-left: 20px;
  font-size: 20px;
  font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑,
    STHeiTi;
  font-weight: bold;
}
.hxr-headUser {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  padding-right: 20px;
}
.hxr-headUser > .hxr-huName {
  padding-left: 10px;
  font-size: 16px;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.hxr-headUser > .hxr-huAva {
  font-size: 16px;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.hxr-headUser > .hxr-huAva > img {
  height: 50%;
}
.hxr-headBtn {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
  background-color: black;
}

.header .logo {
  float: left;
  width: 400px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  text-align: left;
  padding-left: 59px;
}

.login-header-img {
  width: 198px;
  height: 43px;
}

.login-header-title {
  font-size: 20px;
  color: #fff;
  font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑,
    STHeiTi;
  font-weight: bold;
}

.login-header-title-split {
  font-size: 24px;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 14px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  height: auto !important;
}

.aside {
  background-color: #d3dce6;
  margin: 10px 0px 0px 0px;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
