<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="设备类型:" label-width="200px" prop="deviceType">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.deviceType"
          placeholder="请输入设备类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜谱版本:" label-width="200px" prop="version">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.version"
          placeholder="请输入版本"
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
        deviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        version: [
          { required: true, message: "请输入对应版本", trigger: "blur" },
        ],
      },
      formMenu: {
        deviceType: "",
        version: "",
      },
    };
  },
  created() {},
  methods: {
    addMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          var fm = JSON.parse(JSON.stringify(this.formMenu));
          fm = JSON.stringify(fm);
          console.log(fm);
          let config = {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
          };
          let url = "/api/menu/addMenuInDeviceVersion";
          this.$axios.post(url, fm, config).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$router.push({ path: "/version/versionList" });
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
</style>
