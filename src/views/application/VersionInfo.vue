<template>
    <div class="versionInfo">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-cloudy"/> 应用云
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <i class="el-icon-document"/> 版本信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div>
                <el-button type="primary" @click="dialogFormVisible = true">添加版本信息</el-button>
                <el-button type="success" @click="getInfoList(1)" style="margin-left: 70px">查询信息</el-button>
                <el-button type="info" @click="clearSearchFactor">清空条件</el-button>

                <el-input style="margin-right: 10px;width: 150px" placeholder="输入型号" v-model="searchFactor.model" clearable/>
                <el-input style="margin-right: 10px;width: 150px" placeholder="输入版本" v-model="searchFactor.version" clearable/>

            </div>

            <el-dialog :title="getTitle" :visible.sync="dialogFormVisible" @close="resetObj">
                <el-form ref="form" :model="versionInfoVO">

                    <el-input
                            placeholder="请输入设备类型"
                            v-model="versionInfoVO.model"
                            clearable>
                    </el-input>
                    <el-input
                            placeholder="请输入版本号"
                            v-model="versionInfoVO.version"
                            clearable>
                    </el-input>
                    <el-input
                            type="textarea"
                            rows="3"
                            placeholder="请输入版本信息"
                            v-model="versionInfoVO.content"
                            clearable>
                    </el-input>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelOperation">取 消</el-button>
                    <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
                </div>
            </el-dialog>

            <div style="margin: 20px;"></div>

            <el-table
                    :data="records"
                    style="width: 100%"
                    :header-cell-style="{background: '#F6F7FB'}"
                    border>
                <el-table-column align="center" fixed label="序号" prop="index" width="70px"/>
                <el-table-column align="center" label="型号" prop="model"/>
                <el-table-column align="center" label="版本" prop="version"/>
                <el-table-column align="center" label="内容" prop="content"/>
                <el-table-column align="center" label="创建时间" prop="createTime"/>
                <el-table-column align="center" label="修改时间" prop="updateTime"/>
                <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="setObj(scope.row.id)" type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button
                                @click="deleteById(scope.row.id)"
                                type="text"
                                icon="el-icon-delete"
                                style="color: red">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <br/>

            <!-- 分页功能 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageCurrent"
                    :page-sizes="[15,30,50,100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<style scoped src="../../assets/css/application/application.css"/>

<script>
    import versioninfo from "../../api/application/versioninfo";

    export default {
        name: "",
        data() {
            return {
                pageCurrent: 1,
                pageSize: 15,
                total: 0,
                pages: 0,
                records: [],
                versionInfoVO: {
                    id: null,
                    model: '',
                    version: '',
                    content: ''
                },
                dialogFormVisible: false,
                searchFactor: {
                    model: '',
                    version: ''
                }
            };
        },
        created() {
            this.getInfoList(1);
        },
        methods: {
            getInfoList(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.searchFactor.pageCurrent=this.pageCurrent;
                this.searchFactor.pageSize=this.pageSize;
                versioninfo
                    .getInfoList(this.searchFactor)
                    .then((response) => {
                        let data = response.data;
                        this.records = data.records;
                        this.total = data.total;
                        this.pages = data.pages;
                        this.current = data.current;
                        this.size = data.size;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            addOrUpdate() {
                if (this.versionInfoVO.id == null) {
                    this.addInfo();
                } else {
                    this.updateInfo();
                }
            },
            setObj(id) {
                let list = this.records.filter((record) => {
                    return record.id === id;
                });
                let data = list.pop();
                this.versionInfoVO.id = data.id;
                this.versionInfoVO.model = data.model;
                this.versionInfoVO.version = data.version;
                this.versionInfoVO.content = data.content;

                this.dialogFormVisible = true;
            },
            resetObj() {
                this.versionInfoVO = {
                    id: null,
                    model: '',
                    version: '',
                    content: ''
                };
            },
            cancelOperation() {
                this.resetObj();
                this.dialogFormVisible = false;
            },
            addInfo() {
                versioninfo
                    .addInfo(this.versionInfoVO)
                    .then((response) => {
                        this.getInfoList(this.pageCurrent);
                        this.$message({
                            type: "success",
                            message: "添加自定义时钟成功!",
                        });
                        this.dialogFormVisible = false;
                        this.resetObj();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            updateInfo() {
                versioninfo
                    .updateInfo(this.versionInfoVO)
                    .then((response) => {
                        this.getInfoList(this.pageCurrent);
                        this.$message({
                            type: "success",
                            message: "更新记录成功!",
                        });
                        this.dialogFormVisible = false;
                        this.resetObj();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteById(id) {
                this.$confirm("确认删除该记录？", "提示", {
                    confirmButtonClass: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        versioninfo
                            .deleteInfo(id)
                            .then((response) => {
                                this.getInfoList(this.pageCurrent);
                                this.$message({
                                    type: "success",
                                    message: "删除当前记录成功!",
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //分页功能
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getInfoList(this.pageCurrent);
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getInfoList(this.pageCurrent);
            },
            //清空查询条件
            clearSearchFactor() {
                this.searchFactor = {model:'',version:''};
                this.getInfoList(1)
            }
        },
        computed: {
            getTitle() {
                if (this.versionInfoVO.id == null) {
                    return "添加版本信息";
                } else {
                    return "修改版本信息";
                }
            }
        },
        watch: {
            records() {
                let p = 0;
                let base = (this.pageCurrent - 1) * this.pageSize;
                this.records.map(record => {
                    record.index = base + ++p;
                })
            }
        }
    };
</script>
