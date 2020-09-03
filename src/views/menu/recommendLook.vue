<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu">
      <el-form-item label="菜谱名称:" label-width="200px" prop="name">
        {{formMenu.name}}
      </el-form-item>
      <el-form-item label="Q6设备图片:" label-width="200px" prop="deviceUrl">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcBottom">
                <img v-if="formMenu.deviceUrl" :src="formMenu.deviceUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="菜谱介绍:" label-width="200px" prop="introduce">
        {{formMenu.introduce}}
      </el-form-item>
      <el-form-item label="食材清单:" label-width="200px" prop="baseFood">
        {{formMenu.baseFood}}
      </el-form-item>
      <el-form-item label="烹饪步骤:" label-width="200px" prop="steps">
        {{formMenu.steps}}
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getRecommendDetailInfo,
} from "../../api/menus/recommendMenu";
export default {
  data() {
    return {
      formMenu: {
        name: "",
        deviceUrl: "",
        introduce: "",
        baseFood: "",
        steps: ""
      }
    };
  },
  created() {
    this.getMenuDetail();
  },
  methods: {
    getMenuDetail() {
      getRecommendDetailInfo({
        deviceRecommendId: this.$route.query.id,
      }).then((response) => {
        if (response.status === 200) {
          this.formMenu = response.data;
        } else {
          this.$alert("查询菜谱详情失败");
        }
      });
    }
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
