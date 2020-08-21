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
import { addDeviceItem ,getDeviceDetailInfo ,postDeviceDetailInfo } from "../../api/device/deviceList";
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
  created() {
     this.detailInt()
  },
  methods: {
    detailInt() {
      getDeviceDetailInfo({deviceTypeId:this.$route.query.id}).then((response) => {
        console.log(response)
        if (response.status === 200) {
          this.formMenu = response.data
        } else {
          this.$message({
            type: "error",
            message: response.data,
          });
        }
      });
    },
    addMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          var fm = JSON.parse(JSON.stringify(this.formMenu));
          postDeviceDetailInfo(fm).then((response) => {
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: "更改成功!",
              });
              this.$router.push({ path: "/device/deviceList" });
            } else {
              this.$message({
                type: "error",
                message: "更改失败",
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
