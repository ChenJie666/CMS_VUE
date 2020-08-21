<template>
  <div class="hxr-main">
    <my-bread level1="菜谱品类管理" level2="轮播图" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu('wz')" size="small" type="success">添加文章</el-button>
        </div>
        <div class="hxr-bgCell">
          <el-button @click="addMenu('hd')" size="small" type="success">添加活动</el-button>
        </div>
        <div class="hxr-bgCell">
          <el-button @click="addMenu('cp')" size="small" type="success">添加菜谱</el-button>
        </div>
        <div class="hxr-bgCell">
          <el-button @click="delMenu()" size="small" type="danger">批量删除</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hxr-tableChange">
      <div class="hxr-tcMain">
        <el-table :data="MenuDataList" border style="width: 100%" ref="multipleTable">
          <el-table-column min-width="10" type="selection"></el-table-column>
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column align="center" label="id" min-width="10" prop="carouselId"></el-table-column>
          <el-table-column align="center" label="对应库id" min-width="10" prop="libraryId"></el-table-column>
          <el-table-column align="center" label="名称" min-width="20" prop="name"></el-table-column>
          <el-table-column align="center" label="链接" min-width="20" prop="carouselUrl"></el-table-column>
          <el-table-column align="center" label="展示标头" min-width="20" prop="header"></el-table-column>
          <el-table-column align="center" label="图片" min-width="20" prop="carouselImg">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.carouselImg]"
                :src="scope.row.carouselImg"
                style="width: 60px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="类型" min-width="20" prop="type"></el-table-column>
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
                  <el-dropdown-item @click.native="toLook(scope.row)">详情</el-dropdown-item>
                  <el-dropdown-item @click.native="handleEdit(scope.row)">编辑</el-dropdown-item>
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
  </div>
</template>
<script>
import {
  getBannerListInfo,
  delBannerList,
  postBannerItemInfo
} from "../../api/appmananger/bannerList";

export default {
  data() {
    return {
      limit: 10, // 每页显示的条数
      total: 0, // 总条数
      currentPage: 1, // 当前页
      MenuDataList: [],
    };
  },
  created() {
    this.listInt();
  },
  methods: {
    listInt() {
      var dataModule = {
        page: this.currentPage,
        pageSize: this.limit,
      };
      getBannerListInfo(dataModule).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.MenuDataList = response.data.records;
          this.total = response.data.total;
        } else {
          this.$message.error(response.records);
        }
      });
    },
    addMenu(t) {
      if (t == "cp") {
        this.$router.push({
          path: "/menu/common",
          query: {
            from: "banner",
          },
        });
      } else if (t == "wz") {
        this.$router.push({
          path: "/article/common",
          query: {
            from: "banner",
          },
        });
      } else if (t == "hd") {
        this.$router.push({
          path: "/activity/common",
          query: {
            from: "banner",
          },
        });
      }
    },
    delMenu() {
      if (this.$refs.multipleTable.selection.length > 0) {
        var dataModule = {
          carouselId: [],
        };
        for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
          dataModule.carouselId.push(
            this.$refs.multipleTable.selection[i].carouselId
          );
        }
        delBannerList(dataModule).then((response) => {
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
    handleEdit(r) {
      if (r.type == 1) {
        this.$router.push({
          path: "/menu/menuDetail",
          query: {
            id: r.libraryId,
          },
        });
      } else if (r.type == 2) {
        this.$router.push({
          path: "/article/articleDetail",
          query: {
            id: r.libraryId,
          },
        });
      } else if (r.type == 3) {
        this.$router.push({
          path: "/activity/activityDetail",
          query: {
            id: r.libraryId,
          },
        });
      }
    },
    toLook(r) {
      if (r.type == 1) {
        this.$router.push({
          path: "/menu/menulook",
          query: {
            id: r.libraryId,
          },
        });
      } else if (r.type == 2) {
        this.$router.push({
          path: "/article/articlelook",
          query: {
            id: r.libraryId,
          },
        });
      } else if (r.type == 3) {
        this.$router.push({
          path: "/activity/activitylook",
          query: {
            id: r.libraryId,
          },
        });
      }
    },
    switchChange(v) {
      postBannerItemInfo(v).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.currentPage =1
          this.listInt();
           this.$message.success("开启更新");
        } else {
          this.$message.error(response.data);
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.listInt();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listInt();
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
