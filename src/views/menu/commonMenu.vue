<template>
  <div class="hxr-main">
    <my-bread level1="菜谱管理" level2="从菜谱库中选择" />
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
            v-model="deviceType"
            placeholder="请选择关联设备"
            style="width:100%"
            clearable
            @clear="loadMenuDataList()"
          >
            <el-option v-for="item in deviceList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-select
            v-model="cookMethod"
            placeholder="请选择烹饪方式"
            style="width:100%"
            clearable
            @clear="loadMenuDataList()"
          >
            <el-option
              v-for="item in forKitchenElectricList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
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
      <el-col :span="2">
        <div class="hxr-searchBtn">
          <el-button @click="search()" size="small" type="primary">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="sureAdd()" size="small" type="success">确认添加</el-button>
        </div>
        <div class="hxr-bgCell">
          <el-button @click="goBack()" size="small" type="danger">取消返回</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcCover" @click="dialogVisible = true">
        <i class="el-icon-caret-right" />
      </div>
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%" ref="multipleTable">
          <el-table-column label="单选" v-if="from=='app'" width="50">
            <template scope="scope">
              <el-radio
                :disabled="scope.row.publishStatus==2?false:true"
                :label="scope.$index"
                v-model="radio"
                @change.native="getCurrentRow(scope.row)"
              >{{''}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column v-if="from!='app'" min-width="10" type="selection"></el-table-column>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureConfig()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { arrToMap } from "../../utils/main";
import { getMenuListInfo } from "../../api/menus/menuList";
import { addQsixItem } from "../../api/menus/qsixMenu";
import { addRecommendItem } from "../../api/menus/recommendMenu";
import { addIndexRecommendItem } from "../../api/appmananger/indexRecommend";
import { addBannerItemInfo } from "../../api/appmananger/bannerList";
import { addColumnMenuItem } from "../../api/appmananger/columnMenu";
import {
  getDeviceList,
  getMenuTypeList,
  getForKitchenElectricList,
  getStatusList,
  getIsOfficialList,
} from "../../api/dataList";

export default {
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
      forKitchenElectricList: [],
      statusList: [],
      isOfficialList: [],
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
        publishStatus: true,
      },
      checkList: [],
      radio: "",
      from: "",
      choosedId: "",
    };
  },
  created() {
    this.forKitchenElectricList = getForKitchenElectricList();
    this.statusList = getStatusList();
    this.isOfficialList = getIsOfficialList();
    this.findCheckMenuList();
    this.deviceInt();
    this.typeListInt();
    this.checkListInt();
    this.from = this.$route.query.from;
  },
  methods: {
    typeListInt() {
      getMenuTypeList().then((response) => {
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
        name: this.menuName,
        cookMethod: this.cookMethod,
        menuType: this.menuType,
        deviceType: this.deviceType,
      };
      getMenuListInfo(dataModule).then((response) => {
        if (response.status === 200) {
          this.MenuDataList = response.data.records;
          this.total = response.data.total;
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    loadMenuDataList() {
      this.findCheckMenuList();
    },
    search() {
      this.currentPage = 1;
      this.findCheckMenuList();
    },
    getCurrentRow(row) {
      this.choosedId = row.id;
    },
    sureAdd() {
      if (this.$route.query.from == "app") {
        if (this.choosedId) {
          addIndexRecommendItem({
            menuId: this.choosedId,
          }).then((response) => {
            console.log(response);
            if (response.status === 200) {
              this.$message.success("添加成功");
              this.$router.push({
                path: "/appmananger/indexRecommend",
              });
            } else {
              this.$message.error(response.data);
            }
          });
          console.log(this.choosedId);
        } else {
          this.$message.error("请选中一条数据");
        }
      } else {
        if (this.$refs.multipleTable.selection.length > 0) {
          if (this.$route.query.from == "qsix") {
            var fm = [];
            for (
              var i = 0;
              i < this.$refs.multipleTable.selection.length;
              i++
            ) {
              var fmcell = {
                menuId: this.$refs.multipleTable.selection[i].id,
              };
              fm.push(fmcell);
            }
            addQsixItem(fm).then((response) => {
              if (response.status === 200) {
                this.$message.success("添加成功");
                this.$router.push({
                  path: "/menu/qsix",
                });
              } else {
                this.$message.error(response.data);
              }
            });
          } else if (this.$route.query.from == "recommend") {
            var fm = [];
            for (
              var i = 0;
              i < this.$refs.multipleTable.selection.length;
              i++
            ) {
              var fmcell = {
                menuId: this.$refs.multipleTable.selection[i].id,
              };
              fm.push(fmcell);
            }
            addRecommendItem(fm).then((response) => {
              if (response.status === 200) {
                this.$message.success("添加成功");
                this.$router.push({
                  path: "/menu/recommend",
                });
              } else {
                this.$message.error(response.data);
              }
            });
          } else if (this.$route.query.from == "banner") {
            var fm = [];
            for (
              var i = 0;
              i < this.$refs.multipleTable.selection.length;
              i++
            ) {
              var fmcell = {
                libraryId: this.$refs.multipleTable.selection[i].id,
                type: 1,
              };
              fm.push(fmcell);
            }
            addBannerItemInfo(fm).then((response) => {
              if (response.status === 200) {
                this.$message.success("添加成功");
                this.$router.push({
                  path: "/appmananger/bannerList",
                });
              } else {
                this.$message.error(response.data);
              }
            });
          }else if (this.$route.query.from == "column") {
            var fm = [];
            for (
              var i = 0;
              i < this.$refs.multipleTable.selection.length;
              i++
            ) {
              var fmcell = {
                menuId: this.$refs.multipleTable.selection[i].id,
                titleId:this.$route.query.titleId
              };
              fm.push(fmcell);
            }
            addColumnMenuItem(fm).then((response) => {
              if (response.status === 200) {
                this.$message.success("添加成功");
                this.$router.push({
                  path: "/appmananger/columnMenu",
                });
              } else {
                this.$message.error(response.data);
              }
            });
          }
        } else {
          this.$message.error("至少选中一条数据");
        }
      }
    },
    goBack() {
      this.$router.go(-1);
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
