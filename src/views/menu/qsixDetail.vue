<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="菜谱名称:" label-width="200px" prop="name">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.name"
          placeholder="请输入菜谱名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜谱分类:" label-width="200px" prop="menuType">
        <el-select v-model="formMenu.menuType" placeholder="请选择菜谱分类">
          <el-option
            v-for="item in menuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备端位置:" label-width="200px" prop="location">
        <el-input
          v-model.number="formMenu.location"
          oninput="if(value.length>3)value=value.slice(0,3)"
          type="number"
          style="width:167px"
        ></el-input>
      </el-form-item>
      <el-form-item label="Q6设备图片:" label-width="200px" prop="deviceUrl">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcBottom">
              <el-upload
                class="avatar-uploader"
                :action="upUrl()"
                :show-file-list="false"
                :on-success="function(res,file){return handleImgSuccess(res,file,'deviceUrl','Q6')}"
                :before-upload="beforeImgUpload"
                :limit="1"
              >
                <img v-if="formMenu.deviceUrl" :src="formMenu.deviceUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="hxr-upAim">支持png格式图片，大小限制在100k以内</div>
      </el-form-item>
      <el-form-item label="菜谱介绍:" label-width="200px" prop="introduce">
        <el-input
          v-model="formMenu.introduce"
          placeholder="请输入菜谱介绍"
          rows="2"
          type="textarea"
          maxlength="200"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="食材清单:" label-width="200px" prop="baseFood">
        <el-input
          v-model="formMenu.baseFood"
          placeholder="请输入食材清单"
          rows="2"
          type="textarea"
          maxlength="200"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="烹饪步骤:" label-width="200px" prop="steps">
        <el-input
          v-model="formMenu.steps"
          placeholder="请输入烹饪步骤"
          rows="2"
          type="textarea"
          maxlength="200"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入版本号:" label-width="200px" prop="menuVersion">
        <el-input
          placeholder="请输入版本号:"
          v-model="formMenu.menuVersion"
          type="text"
          auto-complete="off"
          oninput="value=value.replace(/[^0-9.]/g,'')"
          style="width:167px"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-button type="success" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getMenuTypeList } from "../../api/dataList";
import {
  getQsixDetailInfo,
  postQsixDetailInfo,
} from "../../api/menus/qsixMenu";
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入菜谱名称", trigger: "blur" }],
        menuType: [
          { required: true, message: "请选择菜谱分类", trigger: "blur" },
        ],
        location: [
          { required: true, message: "请输入菜谱分类排序", trigger: "blur" },
        ],
        deviceUrl: [
          { required: true, message: "请上传Q6图片", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入菜谱介绍", trigger: "blur" },
        ],
        baseFood: [
          { required: true, message: "请输入菜谱介绍", trigger: "blur" },
        ],
        steps: [
          { required: true, message: "请输入所有菜谱步骤", trigger: "blur" },
        ],
        menuVersion: [
          { required: true, message: "请输入版本号", trigger: "blur" },
        ],
      },
      formMenu: {
        name: "",
        menuType: "",
        location: 0,
        deviceUrl: "",
        introduce: "",
        baseFood: "",
        steps: "",
        menuVersion: 0,
      },
      menuTypeList: [],
    };
  },
  created() {
    this.typeListInt();
    this.getMenuDetail();
  },
  methods: {
    upUrl() {
      return this.baseUrl + "/menu/uploadFile";
    },
    typeListInt() {
      getMenuTypeList().then((response) => {
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            var ls = {
              value: response.data[i].mark,
              label: response.data[i].menuType,
            };
            this.menuTypeList.push(ls);
          }
        } else {
          this.$message.error("设备列表请求异常");
        }
      });
    },
    getMenuDetail() {
      getQsixDetailInfo({
        deviceMenuId: this.$route.query.id,
      }).then((response) => {
        if (response.status === 200) {
          this.formMenu = response.data;
        } else {
          this.$alert("查询菜谱详情失败");
        }
      });
    },
    checkImg(s, t) {
      var s = s / 1024 / 1024;
      if (s > 0.1) {
        this.$message.error("文件大小不能超过 100k!");
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
          postQsixDetailInfo(fm).then((response) => {
            if (response.status === 200) {
              this.$message.success("修改成功");
              this.$router.push({
                path: "/menu/qsix",
              });
            } else {
              this.error("修改Q6菜谱详情失败");
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

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
