<template>
  <div class="hxr-main">
    <my-bread level1="菜谱管理" level2="首页推荐菜谱管理" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu()" size="small" type="success">{{MenuDataList.length>0?"重选菜谱":"添加菜谱"}}</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcCover" @click="dialogVisible = true">
        <i class="el-icon-caret-right" />
      </div>
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%" ref="multipleTable">
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column v-if="ctr.id" align="center" label="ID" min-width="10" prop="id"></el-table-column>
          <el-table-column
            v-if="ctr.menuId"
            align="center"
            label="菜谱ID"
            min-width="10"
            prop="menuId"
          ></el-table-column>
          <el-table-column v-if="ctr.name" align="center" label="菜谱名称" min-width="20" prop="name"></el-table-column>
          <el-table-column
            v-if="ctr.subscribePoints"
            align="center"
            label="收藏量"
            min-width="10"
            prop="subscribePoints"
            sortable
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
            v-if="ctr.createTime"
            align="center"
            label="创建时间"
            min-width="10"
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
            v-if="ctr.forKitchenElectric"
            align="center"
            label="烹饪方式"
            min-width="10"
            prop="forKitchenElectric"
          ></el-table-column>
          <el-table-column
            v-if="ctr.deviceType"
            align="center"
            label="关联设备"
            min-width="10"
            prop="deviceType"
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
                  <el-dropdown-item @click.native="toLook(scope.row.menuId)">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="设置表头" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="hxr-dialogChange">
        <template>
          <el-checkbox-group v-model="checkList">
            <el-checkbox border style="margin-bottom:10px" label="id">id</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="menuId">菜谱id</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="name">菜谱名称</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="subscribePoints">菜谱收藏量</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="menuUrl">图片</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="createTime">创建时间</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="menuType">菜谱分类</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="forKitchenElectric">烹饪方式</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="deviceType">关联设备</el-checkbox>
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
import {arrToMap} from "../../utils/main";
import {
  getMenuTypeList,
  getForKitchenElectricList,
  getStatusList,
} from "../../api/dataList";
import {getIndexRecommendMenuListInfo} from "../../api/appmananger/indexRecommend";

export default {
  data() {
    return {
      MenuDataList: [],
      forKitchenElectricList: [],
      menuTypeList: [],
      statusList:[],
      dialogVisible: false,
      ctr: {
        id: true,
        menuId: true,
        name: true,
        subscribePoints: true,
        menuUrl: true,
        createTime: false,
        menuType: true,
        forKitchenElectric: true,
        deviceType: true,
        publishStatus: true,
      },
      checkList: [],
    };
  },
  created() {
    this.forKitchenElectricList = getForKitchenElectricList();
    this.statusList = getStatusList();
    this.typeListInt();
    this.listInt();
    this.checkListInt();
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
    checkListInt() {
      var ls = [];
      for (var i in this.ctr) {
        if (this.ctr[i]) {
          ls.push(i);
        }
      }
      this.checkList = ls;
    },
    listInt() {
      getIndexRecommendMenuListInfo().then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data;
        } else {
          this.$message.error("数据请求异常");
        }
      });
    },
    addMenu() {
      this.$router.push({
        path: "/menu/common",
        query: {
          from: "app",
        },
      });
    },
    toLook(id) {
      this.$router.push({
        path: "/menu/menulook",
        query: {
          id: id,
        },
      });
    },
    isPublishStatus(val) {
      var lsmap = arrToMap(this.statusList, 'value', 'label');
      return lsmap.get(val.publishStatus);
    },
    isMenuStatus(val) {
      var lsmap = arrToMap(this.menuTypeList, 'value', 'label');
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

.hxr-currentChange {
  padding-top: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
</style>
