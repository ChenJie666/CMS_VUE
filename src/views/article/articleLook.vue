<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu">
      <el-form-item label="名称:" label-width="200px" prop="name">
        {{formMenu.name}}
      </el-form-item>
      <el-form-item label="文章标头:" label-width="200px" prop="header">
        {{formMenu.header}}
      </el-form-item>
      <el-form-item label="链接:" label-width="200px" prop="articleUrl">
        {{formMenu.articleUrl}}
      </el-form-item>
      <el-form-item label="文章图片:" label-width="200px" prop="articleImg">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">图片</div>
            <div class="hxr-ugcBottom">
                <img v-if="formMenu.articleImg" :src="formMenu.articleImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容:" label-width="200px" prop="richText">
        <div v-html="formMenu.richText">
        </div>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-button type="success" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getArticleDetailInfo,
} from "../../api/article/articleList";
export default {
  data() {
    return {
      formMenu: {
        articleImg: "",
        articleUrl: "",
        header: "",
        name: "",
        richText: "",
        updateTime: "",
      },
    };
  },
  created() {
    this.getMenuDetail()
  },
  methods: {
    getMenuDetail() {
      getArticleDetailInfo({
         articleId: this.$route.query.id,
      }).then((response) => {
        if (response.status === 200) {
          this.formMenu = response.data;
        } else {
          this.$message.error("菜谱详情请求异常");
        }
      });
    }
  },
};
</script>

<style scoped>
.hxr-addExpend {
  padding-bottom: 10px;
}
.hxr-addCell {
  display: flex;
  display: -webkit-flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}
.hxr-addCell > .hxr-acCenter {
  padding-left: 10px;
}
.hxr-addCell > .hxr-acRight {
  padding-left: 10px;
  width: 50px;
}
.hxr-addCell > .hxr-acDel {
  padding-left: 10px;
}
.hxr-addPan {
  display: flex;
  display: -webkit-flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}
.hxr-addPan > .hxr-apLeft {
  width: 75px;
  height: 75px;
  border: 1px dotted #999;
  border-radius: 2px;
  overflow: hidden;
}
.hxr-addPan > .hxr-apRight {
  padding-left: 10px;
}
.hxr-addPan > .hxr-apRight > .hxr-aprTop {
  padding-bottom: 10px;
}
.hxr-addPan > .hxr-apDel {
  padding-left: 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.hxr-addWell {
  background: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px;
}
.hxr-addWell > .hxr-awHead {
  display: flex;
  display: -webkit-flex;
}
.hxr-addWell > .hxr-awHead > .hxr-awhLeft {
  font-weight: 600;
  width: 100px;
}
.hxr-addWell > .hxr-awHead > .hxr-awhCenter {
  padding-left: 10px;
  display: flex;
  display: -webkit-flex;
  flex: 1;
}
.hxr-addWell > .hxr-awHead > .hxr-awhCenter > .hxr-awhcCell {
  padding-right: 10px;
}
.hxr-addWell > .hxr-awHead > .hxr-awhRight {
  width: 100px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.hxr-addWell > .hxr-awBody {
  background: #fff;
  border-radius: 4px;
  padding: 0px 20px 20px 20px;
  margin-top: 20px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop {
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  display: -webkit-flex;
  padding: 5px 0px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtLeft {
  font-weight: 600;
  width: 100px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtCenter {
  flex: 1;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtRight {
  width: 100px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
}
.hxr-addWell > .hxr-awBody > .hxr-awbBottom {
  padding-top: 10px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbBottom > .hxr-awbbCell {
  padding-bottom: 10px;
  display: flex;
  display: -webkit-flex;
}
.hxr-addWell > .hxr-awFoot {
  padding-top: 20px;
}
.el-form-item {
  margin: 20px 20px;
}
.hxr-upGroup {
  display: flex;
  display: -webkit-flex;
}
.hxr-upGroup > .hxr-ugCell {
  padding-right: 20px;
}
.hxr-upGroup > .hxr-ugCell > .hxr-ugcTop {
  text-align: center;
  color: #999;
}
.hxr-upGroup > .hxr-ugCell > .hxr-ugcBottom {
  border: 1px dotted #999;
  border-radius: 4px;
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.hxr-upVideo {
  display: flex;
  display: -webkit-flex;
}
.hxr-upVideo > .hxr-uvLeft {
  width: 220px;
}
.hxr-upVideo > .hxr-uvCenter {
  width: 150px;
  padding-left: 20px;
  position: relative;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcBack {
  position: absolute;
  width: 150px;
  height: 75px;
  background-color: #f5f5f5;
  border-radius: 4px;
  line-height: 75px;
  overflow: hidden;
  text-align: center;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcVideo {
  position: absolute;
  width: 150px;
  height: 75px;
  overflow: hidden;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcVideo > video {
  width: 150px;
  height: 75px;
}
.hxr-upVideo > .hxr-uvRight {
  padding-left: 20px;
}

.hxr-upAim {
  color: #999;
  padding-top: 10px;
}

.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.cpfood-uploader-icon {
  font-size: 26px;
  color: #8c939d;
  width: 75px;
  height: 75px;
  line-height: 75px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.cpfood {
  width: 75px;
  height: 75px;
  display: block;
}
</style>
