<template>
  <div class="hxr-main">
    <my-bread level1="回收站" level2="回收站列表" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="delMenu()" size="small" type="danger">批量清空</el-button>
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
          <el-table-column v-if="ctr.id" align="center" label="菜谱ID" min-width="10" prop="id"></el-table-column>
          <el-table-column v-if="ctr.name" align="center" label="菜谱名称" min-width="20" prop="name"></el-table-column>
          <el-table-column
            v-if="ctr.authorName"
            align="center"
            label="菜谱著作人"
            min-width="20"
            prop="authorName"
          ></el-table-column>
          <el-table-column
            v-if="ctr.subscribePoints"
            align="center"
            label="收藏量"
            min-width="10"
            prop="subscribePoints"
            sortable
          ></el-table-column>
          <el-table-column align="center" label="首图" min-width="20" v-if="ctr.headImg">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.headImg]"
                :src="scope.row.headImg"
                style="width: 60px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="0.6比例图" min-width="20" v-if="ctr.middleImg">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.middleImg]"
                :src="scope.row.middleImg"
                style="width: 36px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="1.5比例图" min-width="20" v-if="ctr.menuUrl">
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
          <el-table-column v-if="ctr.vd" align="center" label="视频" min-width="10" prop="vd"></el-table-column>
          <el-table-column
            v-if="ctr.description"
            align="center"
            label="菜谱介绍"
            min-width="10"
            prop="description"
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
            v-if="ctr.forKitchenElectric"
            align="center"
            label="烹饪方式"
            min-width="10"
            prop="forKitchenElectric"
          ></el-table-column>
          <el-table-column v-if="ctr.tm" align="center" label="烹饪用时" min-width="10" prop="tm"></el-table-column>
          <el-table-column v-if="ctr.deg" align="center" label="烹饪难度" min-width="10" prop="deg"></el-table-column>
          <el-table-column
            v-if="ctr.nutritionalIngredient"
            align="center"
            label="营养成分"
            min-width="10"
            prop="nutritionalIngredient"
          ></el-table-column>
          <el-table-column v-if="ctr.fl" align="center" label="食材清单" min-width="10" prop="fl"></el-table-column>
          <el-table-column
            v-if="ctr.cookSteps"
            align="center"
            label="烹饪步骤"
            min-width="10"
            prop="cookSteps"
          ></el-table-column>
          <el-table-column v-if="ctr.tip" align="center" label="小贴士" min-width="10" prop="tip"></el-table-column>
          <el-table-column
            v-if="ctr.deviceType"
            align="center"
            label="关联设备"
            min-width="10"
            prop="deviceType"
          ></el-table-column>
          <el-table-column
            v-if="ctr.isOfficial"
            :formatter="isOfficialStatus"
            align="center"
            label="菜谱属性"
            min-width="10"
            prop="isOfficial"
          ></el-table-column>
          <el-table-column
            v-if="ctr.publishStatus"
            :formatter="isPublishStatus"
            align="center"
            label="状态"
            min-width="10"
            prop="publishStatus"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools" style="font-size:20px;color:#409EFF"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="toRestore(scope.row.id)">还原</el-dropdown-item>
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
            <el-checkbox border style="margin-bottom:10px" label="id">菜谱id</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="name">菜谱名称</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="authorName">菜谱著作人</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="subscribePoints">菜谱收藏量</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="headImg">首图</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="middleImg">0.6比例图</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="menuUrl">1.5比例图</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="vd">菜谱视频</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="description">菜谱介绍</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="menuType">菜谱分类</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="forKitchenElectric">烹饪方式</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="tm">烹饪用时</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="deg">烹饪难度</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="nutritionalIngredient">营养成分</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="fl">食材清单</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="cookSteps">烹饪步骤</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="tip">小贴士</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="deviceType">关联设备</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="isOfficial">菜谱属性</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="publishStatus">状态</el-checkbox>
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
import PublishStatusEnums from "../../enums/PublishStatusEnums";
import OfficialStatusEnums from "../../enums/OfficialStatusEnums";
import {
  getMenuListInfo,
  delCompleteMenuList,
  restoreMenuInfo,
  getMenuRecycleListInfo,
} from "../../api/menus/menuList";
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
      cookMethod: null, //烹饪方式
      menuType: null,
      deviceType: null,
      forKitchenElectricList: ["蒸", "烤", "蒸+烤"],
      menuTypeList: [],
      deviceList: [],
      dialogVisible: false,
      ctr: {
        id: true,
        name: true,
        authorName: true,
        subscribePoints: true,
        headImg: false,
        middleImg: false,
        menuUrl: true,
        vd: false,
        description: false,
        menuType: true,
        forKitchenElectric: true,
        tm: true,
        deg: true,
        nutritionalIngredient: false,
        fl: false,
        cookSteps: false,
        tip: false,
        deviceType: false,
        isOfficial: false,
        publishStatus: false,
      },
      checkList: [],
      mapMenuTypeList: new Map(),
    };
  },
  created() {
    this.findCheckMenuList();
    this.deviceInt();
    this.typeListInt();
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
              value: response.data[i].mark,
              label: response.data[i].menuType,
            };
            ms.set(response.data[i].mark, response.data[i].menuType);
            this.menuTypeList.push(ls);
          }
          this.mapMenuTypeList = ms;
        } else {
          this.$message.error("设备列表请求异常");
        }
      });
    },
    deviceInt() {
      getDeviceList().then((response) => {
        console.log(response);
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            var ls = response.data[i].productModel;
            this.deviceList.push(ls);
          }
        } else {
          this.$message.error("设备列表请求异常");
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
    findCheckMenuList() {
      var dataModule = {
        page: this.currentPage,
        pageSize: this.limit,
      };
      getMenuRecycleListInfo(dataModule).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data.records;
          this.total = response.data.total;
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    delMenu() {
      if (this.$refs.multipleTable.selection.length > 0) {
        var dataModule = {
          menuIds: [],
        };
        for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
          dataModule.menuIds.push(this.$refs.multipleTable.selection[i].id);
        }
        delCompleteMenuList(dataModule).then((response) => {
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
    toRestore(id) {
      restoreMenuInfo({ menuIds: id }).then((response) => {
        if (response.status === 200) {
          this.$message.success("还原成功");
          this.findCheckMenuList();
        } else {
          this.$message.error("还原请求异常");
        }
      });
      this.findCheckMenuList();
    },
    toLook(id) {
      this.$router.push({
        path: "/menu/menulook",
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
      return PublishStatusEnums.isPublishStatus(val.publishStatus);
    },
    isOfficialStatus(val) {
      return OfficialStatusEnums.isOfficialStatus(val.isOfficial);
    },
    isMenuStatus(val) {
      return this.mapMenuTypeList.get(val.menuType);
    },
    handleClose() {
      this.checkListInt();
      this.dialogVisible = false;
    },
    sureConfig() {
      var ls = JSON.parse(JSON.stringify(this.ctr));
      for (let key in ls) {
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

.hxr-currentChange {
  padding-top: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
</style>
