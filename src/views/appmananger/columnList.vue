<template>
  <div class="hxr-main">
    <my-bread level1="菜谱APP管理" level2="APP栏目管理" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu()" size="small" type="success">添加栏目</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%">
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column align="center" label="id" min-width="10" prop="codeId"></el-table-column>
          <el-table-column align="center" label="栏目类型" min-width="20" prop="menuTitle"></el-table-column>
          <el-table-column align="center" label="位置" min-width="20" prop="sort"></el-table-column>
          <el-table-column align="center" label="更新" min-width="20">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.publishStatus"
                :active-value="1"
                :inactive-value="0"
                @change="switchChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools" style="font-size:20px;color:#409EFF"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row.codeId)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="delMenu(scope.row.codeId)">删除</el-dropdown-item>
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
import { getColumnList, delColumnListItem,postColumnListItem } from "../../api/appmananger/columnList";
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
      getColumnList().then((response) => {
        if (response.status === 200) {
          this.MenuDataList = response.data;
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    addMenu() {
      this.$router.push({
        path: "/appmananger/columnAdd",
      });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/appmananger/columnDetail",
        query: {
          id: id,
        },
      });
    },
    delMenu(id) {
      delColumnListItem({codeTitleId:id}).then((response) => {
        if (response.status === 200) {
          this.$message.success("删除成功");
          this.deviceInt()
        } else {
          this.$message.error(response.data);
        }
      });
    },
    switchChange(v) {
      postColumnListItem(v).then((response) => {
        if (response.status === 200) {
          this.$message.success("修改成功");
          this.deviceInt()
        } else {
          this.$message.error(response.data);
        }
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
