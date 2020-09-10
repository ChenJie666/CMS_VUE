<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="菜品类型:" label-width="200px" prop="menuType">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.menuType"
          placeholder="请输入菜品类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品类型图片:" label-width="200px" prop="imgUrl">
        <div class="hxr-typeUp">
          <el-upload
            class="avatar-uploader"
            :action="upUrl()"
            :show-file-list="false"
            :on-success="function(res,file){return handleImgSuccess(res,file,'imgUrl','typeup')}"
            :before-upload="beforeImgUpload"
            :limit="1"
          >
            <img v-if="formMenu.imgUrl" :src="formMenu.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="hxr-upAim">支持png格式图片，大小限制在500k以内</div>
      </el-form-item>
      <el-form-item label="菜品类型位置:" label-width="200px" prop="sort">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.sort"
          placeholder="请输入菜谱位置"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-button type="success" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addTypeItem } from "../../api/type/typeList";
export default {
  data() {
    return {
      rules: {
        menuType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入产品型号", trigger: "blur" }],
      },
      formMenu: {
        menuType: "",
        sort: "",
        imgUrl: "",
      },
    };
  },
  created() {},
  methods: {
    upUrl(){
      return this.baseUrl+"/menu/uploadFile"
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
          addTypeItem(fm).then((response) => {
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.$router.push({ path: "/type/typeList" });
            } else {
              this.$message({
                type: "error",
                message: "添加失败",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin: 20px 20px;
}
.hxr-typeUp {
  border: 1px dotted #999;
  border-radius: 4px;
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.hxr-upAim {
  color: #999;
  padding-top: 10px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
