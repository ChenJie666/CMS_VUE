<template>
  <div class="hxr-main">
    <my-bread level1="设备管理" level2="设备列表" />
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
          <el-table-column align="center" label="id" min-width="10" prop="deviceTypeId"></el-table-column>
          <el-table-column align="center" label="设备类型" min-width="20" prop="deviceType"></el-table-column>
          <el-table-column align="center" label="产品型号" min-width="20" prop="productModel"></el-table-column>
          <el-table-column align="center" label="版本号" min-width="20" prop="version"></el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools" style="font-size:20px;color:#409EFF"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="delMenu(scope.row.deviceTypeId)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleEdit(scope.row.deviceTypeId)">编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getDeviceListInfo, delDeviceItem } from "../../api/device/deviceList";

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
      getDeviceListInfo().then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data;
        } else {
          this.$message({
            type: "error",
            message: response.data,
          });
        }
      });
    },
    addMenu() {
      this.$router.push({
        path: "/device/deviceAdd",
      });
    },
    delMenu(id) {
      this.$confirm("删除产品时会将该产品关联的所有, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDeviceItem({ deviceTypeId: id }).then((response) => {
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.deviceInt();
            } else {
              this.$message({
                type: "error",
                message: "删除失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/device/deviceDetail",
        query: { id: id },
      });
    },
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
