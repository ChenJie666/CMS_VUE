<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="名称:" label-width="200px" prop="name">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.name"
          placeholder="请输入文章名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章标头:" label-width="200px" prop="header">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.header"
          placeholder="请输入展示标头"
        ></el-input>
      </el-form-item>
      <el-form-item label="链接:" label-width="200px" prop="articleUrl">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.articleUrl"
          placeholder="请输入链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章图片:" label-width="200px" prop="articleImg">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">图片</div>
            <div class="hxr-ugcBottom">
              <el-upload
                class="avatar-uploader"
                :action="upUrl()"
                :show-file-list="false"
                :on-success="function(res,file){return handleImgSuccess(res,file,'articleImg','')}"
                :before-upload="beforeImgUpload"
                :limit="1"
              >
                <img v-if="formMenu.articleImg" :src="formMenu.articleImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="hxr-upAim">支持png格式图片，大小限制在500k以内</div>
      </el-form-item>
      <el-form-item label="文章内容:" label-width="200px" prop="richText">
        <div>
          <quill-editor v-model="formMenu.richText" ref="myQuillEditor"></quill-editor>
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
  addArticleDetailInfo,
  getArticleDetailInfo,
  postArticleDetailInfo,
} from "../../api/article/articleList";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
        header: [
          { required: true, message: "请输入文章标头", trigger: "blur" },
        ],
        articleUrl: [
          { required: true, message: "请输入链接", trigger: "blur" },
        ],
        articleImg: [
          { required: true, message: "请上传菜谱图片", trigger: "blur" },
        ],
        richText: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
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
  components: {
    quillEditor,
  },
  created() {
    this.getMenuDetail();
  },
  methods: {
    upUrl() {
      return this.baseUrl + "/menu/uploadFile";
    },
    getMenuDetail() {
      getArticleDetailInfo({
        articleId: this.$route.query.id,
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.formMenu = response.data;
        } else {
          this.$message.error("菜谱详情请求异常");
        }
      });
    },
    checkImg(s, t) {
      var s = s / 1024 / 1024;
      if (s > 0.5) {
        this.$message.error("文件大小不能超过 500k!");
        return false;
      } else if (t == "image/jpeg" || t == "image/png") {
        return true;
      } else {
        this.$message.error("上传图片格式为png或jpeg");
        return false;
      }
    },
    beforeImgUpload(file) {
      return this.checkImg(file.size, file.type);
    },
    handleImgSuccess(res, file, index, type) {
      this.formMenu[index] = res.data;
    },
    addMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          var fm = JSON.parse(JSON.stringify(this.formMenu));
          postArticleDetailInfo(fm).then((response) => {
            console.log(response);
            if (response.status === 200) {
              this.$message.success("上传成功");
              this.$router.push({ path: "/article/articleList" });
            } else {
              this.$message.error("上传请求异常");
            }
          });
        }
      });
    },
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
