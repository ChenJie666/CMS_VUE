<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="菜品类型:" label-width="200px" prop="menuType">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.menuType"
          placeholder="请输入设备类型"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-button type="success" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
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
        imgUrl:""
      },
    };
  },
  created() {},
  methods: {
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
          fm = JSON.stringify(fm);
          console.log(fm);
          let config = {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
          };
          let url = "/api/menu/addMenuType";
          this.$axios.post(url, fm, config).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$router.push({ path: "/type/typeList" });
            } else {
              console.log("error submit!!");
              return false;
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
.hxr-typeUp{
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
