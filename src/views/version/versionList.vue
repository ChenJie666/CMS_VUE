<template>
  <div class="hxr-main">
    <my-bread level1="设备版本管理" level2="设备版本列表" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu()" size="small" type="success">添加设备</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%">
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column align="center" label="id" min-width="10" prop="id"></el-table-column>
          <el-table-column align="center" label="设备类型" min-width="20" prop="deviceType"></el-table-column>
          <el-table-column align="center" label="版本号" min-width="20" prop="version"></el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="changeMenu(scope.row.id)" size="small" type="danger">更改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      MenuDataList: [],
    };
  },
  created() {
    this.deviceInt();
  },
  methods: {
    deviceInt() {
      var url = "/api/menu/findMenuInDifferentDeviceCurrentVersion";
      this.$axios.get(url).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.MenuDataList = res.data.data
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addMenu() {
      this.$router.push({
        path: "/version/versionAdd"
      });
    },
    changeMenu(id){
      console.log(id)
    }
  },
};
</script>

<style scoped>
.hxr-main {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 8px #999;
}
.hxr-searchBtn {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}

.box-card {
  height: 100%;
}

.hxr-RowChange {
  margin-top: 20px;
}
.hxr-btnGroup {
  display: flex;
  display: -webkit-flex;
}
.hxr-btnGroup > .hxr-bgCell {
  padding-right: 20px;
}
.hxr-tableChange {
  position: relative;
  margin-top: 20px;
}
.hxr-tableChange > .hxr-tcCover {
  position: absolute;
  right: 0px;
  width: 20px;
  height: 38px;
  border-left: 1px solid #f5f5f5;
  z-index: 10;
  line-height: 38px;
  text-align: center;
}
.hxr-tableChange > .hxr-tcMain {
}
.hxr-currentChange {
  padding-top: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
</style>
