<template>
  <div class="hxr-main">
    <my-bread level1="菜谱APP管理" level2="APP栏目菜谱" />
    <div class="hxr-tabChange">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.menuTitle"
          :name="item.codeId"
          v-for="(item,index) in columnList"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu()" size="small" type="success">选择添加</el-button>
        </div>
        <div class="hxr-bgCell">
          <el-button @click="delMenu()" size="small" type="danger">批量删除</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcCover" @click="dialogVisible = true">
        <i class="el-icon-caret-right" />
      </div>
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%" ref="multipleTable">
          <el-table-column min-width="10" type="selection"></el-table-column>
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column
            v-if="ctr.titleId"
            align="center"
            label="ID"
            min-width="10"
            prop="titleId"
          ></el-table-column>
          <el-table-column
            v-if="ctr.menuId"
            align="center"
            label="菜谱ID"
            min-width="10"
            prop="menuId"
          ></el-table-column>
          <el-table-column v-if="ctr.name" align="center" label="菜谱名称" min-width="20" prop="name"></el-table-column>
          <el-table-column
            v-if="ctr.menuType"
            :formatter="isMenuStatus"
            align="center"
            label="菜谱分类"
            min-width="10"
            prop="menuType"
          ></el-table-column>
          <el-table-column
            v-if="ctr.forKitchenElectric"
            align="center"
            label="烹饪方式"
            min-width="10"
            prop="forKitchenElectric"
          ></el-table-column>
          <el-table-column align="center" label="图片" min-width="20" v-if="ctr.menuUrl">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.menuUrl]"
                :src="scope.row.menuUrl"
                style="width: 90px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            v-if="ctr.deviceType"
            align="center"
            label="关联设备型号"
            min-width="10"
            prop="deviceType"
          ></el-table-column>
          <el-table-column
            v-if="ctr.subscribePoints"
            align="center"
            label="收藏量"
            min-width="10"
            prop="subscribePoints"
          ></el-table-column>
          <el-table-column align="center" label="置顶" min-width="10">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.hasTop"
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
                  <el-dropdown-item @click.native="toLook(scope.row.menuId)">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="hxr-currentChange">
      <el-pagination
        :current-page="currentPage"
        :page-size="limit"
        :page-sizes="[10,20,40,80]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
    <el-dialog title="设置表头" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="hxr-dialogChange">
        <template>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="titleId">Id</el-checkbox>
            <el-checkbox label="menuId">菜谱id</el-checkbox>
            <el-checkbox label="name">菜谱名称</el-checkbox>
            <el-checkbox label="menuType">菜谱分类</el-checkbox>
            <el-checkbox label="forKitchenElectric">烹饪方式</el-checkbox>
            <el-checkbox label="menuUrl">图片</el-checkbox>
            <el-checkbox label="deviceType">关联设备型号</el-checkbox>
            <el-checkbox label="subscribePoints">收藏量</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="sureConfig()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { arrToMap } from "../../utils/main";
import {
  getColumnMenuList,
  getColumnMenu,
  postColumnMenuItem,
  delColumnMenuItem,
} from "../../api/appmananger/columnMenu";
import { getForKitchenElectricList, getMenuTypeList } from "../../api/dataList";

export default {
  data() {
    return {
      MenuDataList: [],
      limit: 10, // 每页显示的条数
      total: 0, // 总条数
      currentPage: 1, // 当前页
      forKitchenElectricList: [],
      menuTypeList: [],
      mapMenuTypeList: new Map(),
      deviceList: [],
      dialogVisible: false,
      ctr: {
        titleId: true,
        menuId: true,
        name: true,
        menuType: true,
        forKitchenElectric: true,
        menuUrl: true,
        deviceType: true,
        subscribePoints: true,
        hasTop: true,
      },
      checkList: [],
      columnList: [],
      activeName: "",
    };
  },
  created() {
    this.forKitchenElectricList = getForKitchenElectricList();
    this.typeListInt();
    this.columnListInt();
    this.checkListInt();
  },
  methods: {
    typeListInt() {
      getMenuTypeList().then((response) => {
        console.log(response);
        if (response.status === 200) {
          var ms = new Map();
          for (var i = 0; i < response.data.length; i++) {
            var ls = {
              value: response.data[i].codeId,
              label: response.data[i].menuType,
            };
            ms.set(response.data[i].codeId, response.data[i].menuType);
            this.menuTypeList.push(ls);
          }
          this.mapMenuTypeList = ms;
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    checkListInt() {
      var ls = [];
      for (var i in this.ctr) {
        if (this.ctr[i]) {
          ls.push(i);
        }
      }
      this.checkList = ls;
    },
    columnListInt() {
      getColumnMenu().then((response) => {
        if (response.status === 200) {
          var ls = response.data;
          for (var i = 0; i < ls.length; i++) {
            ls[i].codeId = ls[i].codeId.toString();
          }
          this.columnList = ls;
          this.activeName = ls[0].codeId;
          this.findCheckMenuList();
        } else {
          this.$message.error("栏目列表请求异常");
        }
      });
    },
    findCheckMenuList() {
      var dataModule = {
        codeId: this.activeName,
        page: this.currentPage,
        pageSize: this.limit,
      };
      getColumnMenuList(dataModule).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data.records;
          this.total = response.data.total;
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    handleClick(tab, event) {
      this.page = 1;
      this.findCheckMenuList();
    },
    addMenu() {
      this.$router.push({
        path: "/menu/common",
        query: {
          from: "column",
          titleId: parseInt(this.activeName),
        },
      });
    },
    delMenu() {
      if (this.$refs.multipleTable.selection.length > 0) {
        var dataModule = {
          menuIds: [],
        };
        for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
          dataModule.menuIds.push(this.$refs.multipleTable.selection[i].menuId);
        }
        delColumnMenuItem(dataModule, {titleId:parseInt(this.activeName)}).then((response) => {
          if (response.status === 200) {
            this.$message.success("删除成功");
            this.findCheckMenuList();
          } else {
            this.$message.error(response.data);
          }
        });
      } else {
        this.$message.error("至少选中一条数据");
      }
    },

    switchChange(v) {
      postColumnMenuItem({
        menuId: v.menuId,
        titleId: v.titleId,
        hasTop: v.hasTop,
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.currentPage = 1;
          this.findCheckMenuList();
          this.$message.success("设置成功");
        } else {
          this.$message.error(response.data);
        }
      });
    },

    handleEdit(id) {
      this.$router.push({
        path: "/menu/menuDetail",
        query: {
          id: id,
        },
      });
    },
    toLook(id) {
      this.$router.push({
        path: "/menu/menuLook",
        query: {
          id: id,
        },
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.findCheckMenuList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.findCheckMenuList();
    },
    isMenuStatus(val) {
      var lsmap = arrToMap(this.menuTypeList, "value", "label");
      return lsmap.get(val.menuType);
    },
    handleClose() {
      this.checkListInt();
      this.dialogVisible = false;
    },
    sureConfig() {
      var ls = JSON.parse(JSON.stringify(this.ctr));
      for (let key in ls) {
        console.log(key);
        ls[key] = false;
      }
      for (var i = 0; i < this.checkList.length; i++) {
        ls[this.checkList[i]] = true;
      }
      this.ctr = ls;
      this.dialogVisible = false;
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
  margin-top: 10px;
}
.hxr-tabChange {
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
