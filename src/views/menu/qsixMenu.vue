<template>
  <div class="hxr-main">
    <my-bread level1="菜谱管理" level2="Q6本机端菜谱" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="7" justify="end">
        <div>
          <el-input
            @clear="loadMenuDataList()"
            maxlength="20"
            show-word-limit
            clearable
            placeholder="请输入菜谱名称"
            v-model="menuName"
          >
            <template slot="prepend">菜谱名称</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-select
            v-model="menuType"
            placeholder="请选择菜谱分类"
            style="width:100%"
            clearable
            @clear="loadMenuDataList()"
          >
            <el-option
              v-for="item in menuTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="10">
        <div class="hxr-searchBtn">
          <el-button @click="search()" size="small" type="primary">搜索</el-button>
        </div>
      </el-col>
    </el-row>
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
          <el-table-column v-if="ctr.id" align="center" label="Q6ID" min-width="10" prop="id"></el-table-column>
          <el-table-column
            v-if="ctr.menuId"
            align="center"
            label="菜谱ID"
            min-width="10"
            prop="menuId"
          ></el-table-column>
          <el-table-column v-if="ctr.name" align="center" label="菜谱名称" min-width="20" prop="name"></el-table-column>
          <el-table-column
            v-if="ctr.createTime"
            align="center"
            label="创建时间"
            min-width="20"
            prop="createTime"
          ></el-table-column>
          <el-table-column
            v-if="ctr.menuType"
            :formatter="isMenuStatus"
            align="center"
            label="菜谱分类"
            min-width="10"
            prop="menuType"
          ></el-table-column>
          <el-table-column
            v-if="ctr.location"
            align="center"
            label="菜谱位置"
            min-width="10"
            prop="location"
          ></el-table-column>
          <el-table-column v-if="ctr.deviceUrl" align="center" label="Q6设备图" min-width="20">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.deviceUrl]"
                :src="scope.row.deviceUrl"
                style="width: 60px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            v-if="ctr.introduce"
            align="center"
            label="菜谱介绍"
            min-width="20"
            prop="introduce"
          ></el-table-column>
          <el-table-column
            v-if="ctr.baseFood"
            align="center"
            label="食材清单"
            min-width="20"
            prop="baseFood"
          ></el-table-column>
          <el-table-column v-if="ctr.steps" align="center" label="烹饪步骤" min-width="20" prop="steps"></el-table-column>
          <el-table-column
            v-if="ctr.menuVersion"
            align="center"
            label="版本号"
            min-width="20"
            prop="menuVersion"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools" style="font-size:20px;color:#409EFF"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row.id)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="toLook(scope.row.id)">详情</el-dropdown-item>
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
            <el-checkbox label="id">Q6ID</el-checkbox>
            <el-checkbox label="menuId">菜谱id</el-checkbox>
            <el-checkbox label="name">菜谱名称</el-checkbox>
            <el-checkbox label="createTime">创建时间</el-checkbox>
            <el-checkbox label="menuType">菜谱分类</el-checkbox>
            <el-checkbox label="location">菜谱位置</el-checkbox>
            <el-checkbox label="deviceUrl">Q6设备图</el-checkbox>
            <el-checkbox label="introduce">菜谱介绍</el-checkbox>
            <el-checkbox label="baseFood">食材清单</el-checkbox>
            <el-checkbox label="steps">烹饪步骤</el-checkbox>
            <el-checkbox label="menuVersion">版本号</el-checkbox>
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
import { getQsixMenuListInfo, delQsixMenuList } from "../../api/menus/qsixMenu";
import { getDeviceList, getMenuTypeList } from "../../api/dataList";
export default {
  name: "Menu",
  data() {
    return {
      MenuDataList: [],
      limit: 10, // 每页显示的条数
      total: 0, // 总条数
      currentPage: 1, // 当前页
      menuName: null, // 搜索菜名
      menuType: null,
      forKitchenElectricList: [],
      menuTypeList: [],
      dialogVisible: false,
      ctr: {
        id: true,
        menuId: true,
        name: true,
        createTime: true,
        menuType: true,
        location: true,
        deviceUrl: true,
        introduce: true,
        baseFood: false,
        steps: false,
        menuVersion: true,
      },
      checkList: [],
    };
  },
  created() {
    this.findCheckMenuList();
    this.checkListInt();
    this.typeListInt();
  },
  methods: {
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
    findCheckMenuList() {
      var dataModule = {
        page: this.currentPage,
        pageSize: this.limit,
        name: this.menuName,
        menuType: this.menuType,
      };
      getQsixMenuListInfo(dataModule).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data.records;
          this.total = response.data.total;
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
    loadMenuDataList() {
      this.findCheckMenuList();
    },
    search() {
      this.currentPage = 1;
      this.findCheckMenuList();
    },
    addMenu() {
      this.$router.push({
        path: "/menu/common",
        query: {
          from: "qsix",
        },
      });
    },
    delMenu() {
      if (this.$refs.multipleTable.selection.length > 0) {
        var dataModule = {
          deviceMenuIds: [],
        };
        for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
          dataModule.deviceMenuIds.push(this.$refs.multipleTable.selection[i].id);
        }
        delQsixMenuList(dataModule).then((response) => {
          if (response.status === 200) {
            this.$message.success("删除成功");
            this.findCheckMenuList();
          } else {
            this.$message.error("删除请求异常");
          }
        });
      } else {
        this.$message.error("至少选中一条数据");
      }
    },
    handleEdit(id) {
      this.$router.push({
        path: "/menu/qsixDetail",
        query: {
          id: id,
        },
      });
    },
    toLook(id) {
      this.$router.push({
        path: "/menu/qsixLook",
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
    isPublishStatus(val) {
      var lsmap = arrToMap(this.statusList, "value", "label");
      return lsmap.get(val.publishStatus);
    },
    isOfficialStatus(val) {
      var lsmap = arrToMap(this.isOfficialList, "value", "label");
      return lsmap.get(val.isOfficial);
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
