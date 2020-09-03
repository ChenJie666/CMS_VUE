<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="栏目名称:" label-width="200px" prop="menuTitle">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.menuTitle"
          placeholder="请输入设备类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="栏目位置:" label-width="200px" prop="sort">
        <el-input
          v-model.number="formMenu.sort"
          oninput="if(value.length>3)value=value.slice(0,3)"
          type="number"
          clearable
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
import { postColumnListItem, getColumnListItem } from "../../api/appmananger/columnList";
export default {
  data() {
    return {
      rules: {
        menuTitle: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入栏目位置", trigger: "blur" }],
      },
      formMenu: {
        menuTitle: "",
        sort: "",
      },
    };
  },
  created() {
    this.detailInt();
  },
  methods: {
    detailInt() {
      getColumnListItem({codeId:this.$route.query.id}).then((response) => {
        if (response.status === 200) {
          this.formMenu = response.data
        } else {
          this.$message.error(response.data);
        }
      });
    },
    addMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          var fm = JSON.parse(JSON.stringify(this.formMenu));
          postColumnListItem(fm).then((response) => {
            if (response.status === 200) {
              this.$message.success("修改成功");
              this.$router.push({ path: "/appmananger/columnList" });
            } else {
              this.$message.error(response.data);
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
