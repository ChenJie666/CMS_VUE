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
      <el-form-item label="产品型号:" label-width="200px" prop="productModel">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.productModel"
          placeholder="请输入产品型号"
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
import { addDeviceItem } from "../../api/device/deviceList";
export default {
  data() {
    return {
      rules: {
        deviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" },
        ],
        productModel: [
          { required: true, message: "请输入产品型号", trigger: "blur" },
        ],
        version: [
          { required: true, message: "请输入对应版本", trigger: "blur" },
        ],
      },
      formMenu: {
        deviceType: "",
        productModel: "",
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
          addDeviceItem(fm).then((response) => {
            console.log(response);
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.$router.push({ path: "/device/deviceList" });
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
</style>
