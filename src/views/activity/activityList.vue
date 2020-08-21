<template>
  <div class="hxr-main">
    <my-bread level1="文章管理" level2="文章库" />
    <el-row class="hxr-RowChange" :gutter="20">
      <el-col :span="24" class="hxr-btnGroup">
        <div class="hxr-bgCell">
          <el-button @click="addMenu()" size="small" type="success">添加文章</el-button>
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
          <el-table-column v-if="ctr.articleId" align="center" label="文章ID" min-width="10" prop="articleId"></el-table-column>
          <el-table-column v-if="ctr.name" align="center" label="文章名称" min-width="20" prop="name"></el-table-column>
          <el-table-column
            v-if="ctr.header"
            align="center"
            label="展示标头"
            min-width="20"
            prop="header"
          ></el-table-column>
          <el-table-column
            v-if="ctr.articleUrl"
            align="center"
            label="链接"
            min-width="10"
            prop="articleUrl"
          ></el-table-column>
          <el-table-column align="center" label="图片" min-width="20" v-if="ctr.articleImg">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.articleImg]"
                :src="scope.row.articleImg"
                style="width: 60px; height: 60px"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools" style="font-size:20px;color:#409EFF"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row.articleId)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="toLook(scope.row.articleId)">详情</el-dropdown-item>
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
            <el-checkbox border style="margin-bottom:10px" label="articleId">文章ID</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="name">菜谱名称</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="header">展示标头</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="articleUrl">链接</el-checkbox>
            <el-checkbox border style="margin-bottom:10px" label="articleImg">图片</el-checkbox>
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
import {
  getArticleListInfo,
  delArticleList,
} from "../../api/article/articleList";

export default {
  data() {
    return {
      MenuDataList: [],
      limit: 10, // 每页显示的条数
      total: 0, // 总条数
      currentPage: 1, // 当前页
      dialogVisible: false,
      ctr: {
        articleId:true,
        articleImg: true,
        articleUrl: true,
        header: true,
        name: true,
        richText: true,
        updateTime: true,
      },
      checkList: [],
    };
  },
  created() {
    this.findCheckMenuList();
    this.checkListInt();
  },
  methods: {
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
      getArticleListInfo(dataModule).then((response) => {
        console.log(response);
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
    addMenu() {
      this.$router.push({ path: "/article/articleAdd" });
    },
    delMenu() {
      if (this.$refs.multipleTable.selection.length > 0) {
        var dataModule = {
          articleIds: [],
        };
        for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
          dataModule.articleIds.push(this.$refs.multipleTable.selection[i].articleId);
        }
        delArticleList(dataModule).then((response) => {
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
        path: "/article/articleDetail",
        query: {
          id: id,
        },
      });
    },
    toLook(id) {
      this.$router.push({
        path: "/article/articlelook",
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
