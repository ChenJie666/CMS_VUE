<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" :rules="rules">
      <el-form-item label="菜谱名称:" label-width="200px" prop="name">
        <el-input
          maxlength="255"
          show-word-limit
          clearable
          v-model="formMenu.name"
          placeholder="请输入菜谱名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜谱著作人:" label-width="200px" prop="authorName">
        <el-input
          maxlength="100"
          show-word-limit
          clearable
          v-model="formMenu.authorName"
          placeholder="请输入菜谱著作人"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜谱收藏量:" label-width="200px" prop="subscribePoints">
        <el-input
          v-model.number="formMenu.subscribePoints"
          oninput="if(value.length>7)value=value.slice(0,7)"
          type="number"
          style="width:100px"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜谱图片:" label-width="200px">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">首图</div>
            <div class="hxr-ugcBottom">
              <el-upload
                class="avatar-uploader"
                :action="upUrl()"
                :show-file-list="false"
                :on-success="function(res,file){return handleImgSuccess(res,file,'headImg','banner')}"
                :before-upload="beforeImgUpload"
                :limit="1"
              >
                <img v-if="formMenu.headImg" :src="formMenu.headImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">0.6比例</div>
            <div class="hxr-ugcBottom">
              <el-upload
                class="avatar-uploader"
                :action="upUrl()"
                :show-file-list="false"
                :on-success="function(res,file){return handleImgSuccess(res,file,'middleImg','banner')}"
                :before-upload="beforeImgUpload"
                :limit="1"
              >
                <img v-if="formMenu.middleImg" :src="formMenu.middleImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">1.5比例</div>
            <div class="hxr-ugcBottom">
              <el-upload
                class="avatar-uploader"
                :action="upUrl()"
                :show-file-list="false"
                :on-success="function(res,file){return handleImgSuccess(res,file,'menuUrl','banner')}"
                :before-upload="beforeImgUpload"
                :limit="1"
              >
                <img v-if="formMenu.menuUrl" :src="formMenu.menuUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="hxr-upAim">支持png格式图片，大小限制在500k以内</div>
      </el-form-item>
      <el-form-item label="菜谱视频:" label-width="200px">
        <div class="hxr-upVideo">
          <div class="hxr-uvLeft">
            <el-upload
              class="avatar-uploader"
              :action="upUrl()"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
              :before-upload="beforeVideoUpload"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="hxr-upAim">支持mp4格式，大小限制在xx以内</div>
            </el-upload>
          </div>
          <div class="hxr-uvCenter" v-if="formMenu.vd">
            <div class="hxr-uvcBack">无法预览视频{{formMenu.vd}}</div>
            <div class="hxr-uvcVideo">
              <video :src="formMenu.vd" controls="controls"></video>
            </div>
          </div>
          <div class="hxr-uvRight" v-if="formMenu.vd">
            <el-button size="small" type="danger" @click="clearVideo()">删除</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="菜谱介绍:" label-width="200px" prop="description">
        <el-input v-model="formMenu.description" type="textarea" rows="2" placeholder="请输入菜谱介绍"></el-input>
      </el-form-item>
      <el-form-item label="菜谱分类:" label-width="200px" prop="menuType">
        <el-select v-model="formMenu.menuType" placeholder="请选择菜谱分类">
          <el-option
            v-for="item in menuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="烹饪方式:" label-width="200px" prop="forKitchenElectric">
        <el-select v-model="formMenu.forKitchenElectric" placeholder="请选择烹饪方式">
          <el-option v-for="item in forKitchenElectricList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="烹饪用时:" label-width="200px" prop="tm">
        <el-input
          v-model.number="formMenu.tm"
          oninput="if(value.length>7)value=value.slice(0,7)"
          type="number"
          style="width:167px"
        >
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="烹饪难度:" label-width="200px" prop="deg">
        <el-select v-model="formMenu.deg" placeholder="请选择菜谱难度">
          <el-option v-for="item in degList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营养成分:" label-width="200px" prop="nutritionalIngredient">
        <div
          class="hxr-addCell"
          v-for="(item,index) in formMenu.nutritionalIngredient"
          :key="index"
        >
          <div class="hxr-acLeft">
            <el-select v-model="item.value" placeholder="请选类别" style="width:120px">
              <el-option
                v-for="x in nutritionalList"
                :key="x.value"
                :label="x.label"
                :value="x.value"
              ></el-option>
            </el-select>
          </div>
          <div class="hxr-acCenter">
            <el-input
              placeholder="请输入量"
              v-model.number="item.weight"
              oninput="if(value.length>9)value=value.slice(0,9)"
              type="number"
              style="width:220px"
            >
              <template slot="append">{{item.value?nutritionalList[item.value-1].end:'无'}}</template>
            </el-input>
          </div>
          <div class="hxr-acDel">
            <el-button type="danger" @click="delNutritionalRow(item,index)">删除</el-button>
          </div>
        </div>
        <el-button type="primary" @click="addNutritionRow()">添加一行</el-button>
      </el-form-item>
      <el-form-item label="食材清单：" label-width="200px" prop="fl">
        <div class="hxr-addPan" v-for="(item,index) in formMenu.fl" :key="index">
          <div class="hxr-apLeft">
            <el-upload
              class="avatar-uploader"
              :action="upUrl()"
              :show-file-list="false"
              :on-success="function(res,file){return handleImgSuccess(res,file,index,'food')}  "
              :before-upload="beforeImgUpload"
              :limit="1"
            >
              <img v-if="item.img" :src="item.img" class="cpfood" />
              <i v-else class="el-icon-plus cpfood-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="hxr-apRight">
            <div class="hxr-aprTop">
              <el-input v-model="item.name" placeholder="请输入食材名称" style="width:220px"></el-input>
            </div>
            <div class="hxr-aprBottom">
              <el-input v-model.number="item.weight"
              oninput="if(value.length>9)value=value.slice(0,9)"
              type="number" placeholder="请输入食材重量" style="width:220px">
                <template slot="append">克</template>
              </el-input>
            </div>
          </div>
          <div class="hxr-apDel">
            <el-button type="danger" @click="delFoodRow(item,index)">删除</el-button>
          </div>
        </div>
        <el-button type="primary" @click="addFoodRow()">添加一行</el-button>
      </el-form-item>
      <el-form-item label="烹饪步骤：" label-width="200px" prop="cookSteps">
        <div class="hxr-addPan" v-for="(item,index) in formMenu.cookSteps" :key="index">
          <div class="hxr-apLeft">
            <el-upload
              class="avatar-uploader"
              :action="upUrl()"
              :show-file-list="false"
              :on-success="function(res,file){return handleImgSuccess(res,file,index,'cook')}  "
              :before-upload="beforeImgUpload"
              :limit="1"
            >
              <img v-if="item.stepUrl" :src="item.stepUrl" class="cpfood" />
              <i v-else class="el-icon-plus cpfood-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="hxr-apRight">
            <div class="hxr-aprTop">
              <el-input v-model="item.step" placeholder="请输入菜谱步骤" style="width:220px"></el-input>
            </div>
            <div class="hxr-aprBottom">
              <el-input v-model="item.description" placeholder="请输入菜谱介绍" style="width:220px"></el-input>
            </div>
          </div>
          <div class="hxr-apDel">
            <el-button type="danger" @click="delStepRow(item,index)">删除</el-button>
          </div>
        </div>
        <el-button type="primary" @click="addStepRow()">添加一行</el-button>
      </el-form-item>
      <el-form-item label="小贴士:" label-width="200px" prop="tip">
        <el-input
          v-model="formMenu.tip"
          placeholder="请输入小贴士"
          rows="2"
          type="textarea"
          maxlength="200"
          show-word-limit
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="支持设备:" label-width="200px">
        <el-select v-model="formMenu.deviceType" multiple placeholder="请选择">
          <el-option v-for="item in deviceList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="200px">
        <div v-if="formMenu.deviceType.length>0">
          <div class="hxr-addExpend">
            <el-select v-model="formMenu.specificationsType" placeholder="请选规格" @change="specificationsChange">
              <el-option
                v-for="x in parameterList"
                :key="x.value"
                :label="x.label"
                :value="x.value"
              ></el-option>
            </el-select>
          </div>
          <div class="hxr-addWell" v-for="(item,index) in formMenu.menuParameterS" :key="index">
            <div class="hxr-awHead">
              <div class="hxr-awhLeft">规格设置</div>
              <div class="hxr-awhCenter">
                <div class="hxr-awhcCell">
                  <el-select v-model="item.parameterEnum" placeholder="请选择规格参数" >
                    <el-option
                      v-for="x in parameterValueList"
                      :key="x.value"
                      :label="x.label"
                      :value="x.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="hxr-awhRight">
                <el-button
                  :disabled="item.defaultChecked==1?true:false"
                  @click="defaultClick(item)"
                >{{item.defaultChecked==1?"已设为默认":"设为默认"}}</el-button>
              </div>
              <div class="hxr-awhRight">
                <el-button type="danger" @click="delWellRow(item,index)">删除</el-button>
              </div>
            </div>
            <div class="hxr-awBody" v-for="(x,index) in item.arithmeticS" :key="index">
              <div class="hxr-awbTop">
                <div class="hxr-awbtLeft">参数设置</div>
                <div class="hxr-awbtCenter">(阶段{{index+1}})</div>
                <div class="hxr-awbtRight">
                  <el-button type="danger" @click="delArithmeticRow(item,index)">删除</el-button>
                </div>
              </div>
              <div class="hxr-awbBottom">
                <div class="hxr-awbbCell">
                  <div>模式：</div>
                  <div>
                    <el-select v-model="x.mode" placeholder="请选择模式">
                      <el-option
                        v-for="y in modeList"
                        :key="y.value"
                        :label="y.label"
                        :value="y.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>温度：</div>
                  <div>
                    <el-input
                      placeholder="请输入内容"
                      v-model.number="x.temp"
                      type="number"
                      oninput="if(value.length>5)value=value.slice(0,5)"
                      clearable
                    >
                      <template slot="append">℃</template>
                    </el-input>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>时间：</div>
                  <div>
                    <el-input
                      placeholder="请输入内容"
                      v-model.number="x.time"
                      type="number"
                      oninput="if(value.length>5)value=value.slice(0,5)"
                      clearable
                    >
                      <template slot="append">分钟</template>
                    </el-input>
                  </div>
                </div>
              </div>
              <div class="hxr-awbTop">
                <div class="hxr-awbtLeft">辅助参数设置</div>
              </div>
              <div class="hxr-awbBottom">
                <div class="hxr-awbbCell">
                  <div>注水：</div>
                  <div>
                    <el-input
                      placeholder="请输入内容"
                      v-model.number="x.waterTime"
                      type="number"
                      oninput="if(value.length>5)value=value.slice(0,5)"
                      clearable
                    >
                      <template slot="append">秒</template>
                    </el-input>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>侧面风机时间：</div>
                  <div>
                    <el-input
                      placeholder="请输入内容"
                      v-model.number="x.fanTime"
                      type="number"
                      oninput="if(value.length>5)value=value.slice(0,5)"
                      clearable
                    >
                      <template slot="append">分钟</template>
                    </el-input>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>蒸汽盘外圈：</div>
                  <div>
                    <el-input
                      placeholder="请输入内容"
                      v-model.number="x.steamTime"
                      type="number"
                      oninput="if(value.length>5)value=value.slice(0,5)"
                      clearable
                    >
                      <template slot="append">分钟</template>
                    </el-input>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>是否暂停：</div>
                  <div>
                    <el-checkbox v-model="x.hasRemind">暂停</el-checkbox>
                  </div>
                </div>
                <div class="hxr-awbbCell">
                  <div>信息提醒：</div>
                  <div>
                    <el-input placeholder="请输入内容" v-model="x.remindText" clearable></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="hxr-awFoot">
              <el-button type="primary" @click="addArithmeticRow(item)">添加一行</el-button>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="addWellRow()">添加一行</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="状态:" label-width="200px" prop="publishStatus">
        <el-select v-model="formMenu.publishStatus" placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-checkbox v-model="formMenu.isOfficial" disabled>是否发布为官方菜谱</el-checkbox>
      </el-form-item>
      <el-form-item label-width="200px">
        <el-button type="success" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getDeviceList,
  getMenuTypeList,
  getNutritionalList,
  getForKitchenElectricList,
  getParameterList,
  getParameterValueList,
  getModeList,
  getDegList,
  getStatusList,
} from "../../api/dataList";
import { addMenuDetailInfo } from "../../api/menus/menuList";

export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value > 10000000) {
          callback(new Error("数字不大于9999999"));
        } else {
          callback();
        }
      }
    };
    return {
      rules: {
        name: [{ required: true, message: "请输入菜谱名称", trigger: "blur" }],
        authorName: [
          { required: true, message: "请输入菜谱著作人", trigger: "blur" },
        ],
        subscribePoints: [
          { required: true, message: "请输入菜谱收藏量", trigger: "blur" },
          { validator: checkNum, trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入菜谱介绍", trigger: "blur" },
        ],
        nutritionalIngredient: [
          { required: true, message: "请添加营养成分", trigger: "blur" },
        ],
        fl: [{ required: true, message: "请添加食材清单", trigger: "blur" }],
        cookSteps: [
          { required: true, message: "请添加烹饪步骤", trigger: "blur" },
        ],
        menuType: [
          { required: true, message: "请选择菜谱分类", trigger: "blur" },
        ],
        forKitchenElectric: [
          { required: true, message: "请选择烹饪方式", trigger: "blur" },
        ],
        tm: [{ required: true, message: "请输入烹饪时间", trigger: "blur" }],
        deg: [{ required: true, message: "请选择烹饪难度", trigger: "blur" }],
        tip: [{ required: true, message: "请输入小贴士", trigger: "blur" }],
        publishStatus: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
      },
      formMenu: {
        name: "",
        authorName: "",
        subscribePoints: 0,
        browsePoints: 0,
        headImg: "",
        middleImg: "",
        menuUrl: "",
        vd: "",
        description: "",
        menuType: "",
        forKitchenElectric: "",
        tm: 0,
        deg: "",
        nutritionalIngredient: [],
        fl: [],
        cookSteps: [],
        tip: "",
        deviceType: "",
        menuParameterS: [],
        defaultParameter: 0,
        isOfficial: true,
        publishStatus: "", //状态
        supportPoints: 0, //点赞数
        voice: "暂不支持",
        specificationsType: 1,
      },
      menuTypeList: [],
      nutritionalList: [],
      forKitchenElectricList: [],
      parameterList: [],
      parameterValueList: [],
      modeList: [],
      degList: [],
      statusList: [],
      deviceList: [],
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      value1: "",
    };
  },
  created() {
    this.typeListInt();
    this.deviceInt();
    this.modeListInt();
    this.parameterListInt();
    this.nutritionalList = getNutritionalList();
    this.forKitchenElectricList = getForKitchenElectricList();
    this.degList = getDegList();
    this.statusList = getStatusList();
  },
  methods: {
    upUrl() {
      return this.baseUrl + "/menu/uploadFile";
    },
    parameterListInt() {
      var that = this;
      getParameterList().then((response) => {
        console.log(response);
        if (response.status === 200) {
          function lsf(stid, num) {
            getParameterValueList({
              specificationsType: stid,
            }).then((response) => {
              var lls = [];
              for (var i = 0; i < response.data.length; i++) {
                var llscell = {
                  value: response.data[i].parameterEnum,
                  label: response.data[i].parameter,
                };
                lls.push(llscell);
              }
              that.parameterList[num].children = lls;
              if (that.formMenu.specificationsType == stid) {
                that.parameterValueList = lls;
                console.log(that.parameterValueList);
              }
            });
          }
          for (var i = 0; i < response.data.length; i++) {
            lsf(response.data[i].specificationsType, i);
            var ls = {
              value: response.data[i].specificationsType,
              label: response.data[i].name,
              children: [],
            };
            this.parameterList.push(ls);
          }
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
    modeListInt() {
      getModeList().then((response) => {
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            var ls = {
              value: response.data[i].mark,
              label: response.data[i].name,
            };
            this.modeList.push(ls);
          }
        } else {
          this.$message.error("列表请求异常");
        }
      });
    },
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
    checkImg(s, t) {
      var s = s / 1024 / 1024;
      if (s > 0.5) {
        this.$message.error("文件大小不能超过 500k!");
        return false;
      } else if (t == "image/jpeg" || t == "image/png") {
        return true;
      } else {
        this.$message.error("上传图片格式为png或jpeg");
        return false;
      }
    },
    checkVideo(s, t) {
      var s = s / 1024 / 1024;
      if (s > 50) {
        this.$message.error("文件大小不能超过 50M!");
        return false;
      } else if (t == "video/mp4") {
        return true;
      } else {
        this.$message.error("上传视频格式为MP4");
        return false;
      }
    },
    beforeImgUpload(file) {
      return this.checkImg(file.size, file.type);
    },
    handleImgSuccess(res, file, index, type) {
      console.log(res);
      if (type == "banner") {
        this.formMenu[index] = res.data;
      } else if (type == "food") {
        this.formMenu.fl[index].img = res.data;
      } else if (type == "cook") {
        this.formMenu.cookSteps[index].stepUrl = res.data;
      } else {
        console.log(type);
      }
    },
    beforeVideoUpload(file) {
      return this.checkVideo(file.size, file.type);
    },
    handleVideoSuccess(res, file) {
      this.formMenu.vd = res.data;
    },
    clearVideo() {
      this.formMenu.vd = "";
    },
    addWellRow() {
      this.formMenu.menuParameterS.push({
        arithmeticS: [
          {
            fanTime: 0,
            hasRemind: true,
            mode: 1,
            no: "",
            remindText: "",
            steamTime: 0,
            temp: 0,
            time: 0,
            waterTime: 0,
          },
        ],
        parameter: "",
        parameterEnum: 1,
        defaultChecked: 0,
      });
    },
    delWellRow(item, index) {
      this.formMenu.menuParameterS.splice(index, 1);
    },
    addArithmeticRow(item) {
      item.arithmeticS.push({
        fanTime: 0,
        hasRemind: true,
        mode: 0,
        no: "",
        remindText: "string",
        steamTime: 0,
        temp: 0,
        time: 0,
        waterTime: 0,
      });
    },
    delArithmeticRow(item, index) {
      item.arithmeticS.splice(index, 1);
    },

    addNutritionRow() {
      this.formMenu.nutritionalIngredient.push({
        value: "",
        name: "",
        weight: "",
      });
    },
    delNutritionalRow(item, index) {
      this.formMenu.nutritionalIngredient.splice(item, 1);
    },
    addFoodRow() {
      this.formMenu.fl.push({
        name: "",
        weight: "",
      });
    },
    delFoodRow(item, index) {
      this.formMenu.fl.splice(item, 1);
    },
    addStepRow() {
      this.formMenu.cookSteps.push({
        step: "",
        stepUrl: "",
        description: "",
      });
    },
    delStepRow(item, index) {
      this.formMenu.cookSteps.splice(item, 1);
    },
    defaultClick(item) {
      for (var i = 0; i < this.formMenu.menuParameterS.length; i++) {
        this.formMenu.menuParameterS[i].defaultChecked = 0;
      }
      item.defaultChecked = 1;
      this.formMenu.defaultParameter = item.parameterEnum;
    },
    specificationsChange(value){
      for (var i=0 ; i<this.parameterList.length ; i++){
        console.log(this.parameterList[i].value)
        if (value == this.parameterList[i].value){
          this.parameterValueList = this.parameterList[i].children
        }
      }
      for (var i=0 ; i<this.formMenu.menuParameterS.length ; i++){
        this.formMenu.menuParameterS[i].parameter = ""
        this.formMenu.menuParameterS[i].parameterEnum = 1
      }
    },
    addMenuForm() {
      var that = this
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          var fm = JSON.parse(JSON.stringify(this.formMenu));
          if (fm.nutritionalIngredient.length > 0) {
            for (var i = 0; i < fm.nutritionalIngredient.length; i++) {
              for (var j = 0; j < this.nutritionalList.length; j++) {
                if (
                  fm.nutritionalIngredient[i].value ==
                  this.nutritionalList[i].value
                ) {
                  fm.nutritionalIngredient[i].name = this.nutritionalList[
                    i
                  ].label;
                }
              }
              var ls1 =
                fm.nutritionalIngredient[i].weight +
                this.nutritionalList[fm.nutritionalIngredient[i].value - 1].end;
              fm.nutritionalIngredient[i].weight = ls1;
            }
          }
          if (fm.fl.length > 0) {
            for (var i = 0; i < fm.fl.length; i++) {
              var ls1 = fm.fl[i].weight + "克";
              fm.fl[i].weight = ls1;
            }
          }
          fm.fl = JSON.stringify(fm.fl);
          if (fm.menuParameterS.length > 0) {
            var lscs = 0;
            for (var i = 0; i < fm.menuParameterS.length; i++) {
              for (var j =0 ; j<that.parameterValueList.length; j++){
                if (fm.menuParameterS[i].parameterEnum == that.parameterValueList[j].value){
                  fm.menuParameterS[i].parameter = that.parameterValueList[j].label
                }
              }
              if (fm.menuParameterS[i].defaultChecked == 1) {
                lscs = 1;
              }
            }
            if (lscs == 0) {
              fm.menuParameterS[0].defaultChecked = 1;
              fm.defaultParameter = fm.menuParameterS[0].parameterEnum;
            }
          }
          if (fm.deviceType.length > 0) {
            fm.deviceType = fm.deviceType.join(";");
          } else {
            fm.deviceType = "";
          }
          fm.nutritionalIngredient = JSON.stringify(fm.nutritionalIngredient);
          if (fm.headImg && fm.middleImg && fm.middleImg) {
            console.log(JSON.stringify(fm));
            addMenuDetailInfo(fm).then((response) => {
              console.log(response);
              if (response.status === 200) {
                this.$message.success("上传成功");
                this.$router.push({ path: "/menu/menuList" });
              } else {
                this.$message.error("上传请求异常");
              }
            });
          } else {
            this.$message.error("请确保三张菜谱图片已成功上传");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.hxr-addExpend {
  padding-bottom: 10px;
}
.hxr-addCell {
  display: flex;
  display: -webkit-flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}
.hxr-addCell > .hxr-acCenter {
  padding-left: 10px;
}
.hxr-addCell > .hxr-acRight {
  padding-left: 10px;
  width: 50px;
}
.hxr-addCell > .hxr-acDel {
  padding-left: 10px;
}
.hxr-addPan {
  display: flex;
  display: -webkit-flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}
.hxr-addPan > .hxr-apLeft {
  width: 75px;
  height: 75px;
  border: 1px dotted #999;
  border-radius: 2px;
  overflow: hidden;
}
.hxr-addPan > .hxr-apRight {
  padding-left: 10px;
}
.hxr-addPan > .hxr-apRight > .hxr-aprTop {
  padding-bottom: 10px;
}
.hxr-addPan > .hxr-apDel {
  padding-left: 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.hxr-addWell {
  background: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px;
}
.hxr-addWell > .hxr-awHead {
  display: flex;
  display: -webkit-flex;
}
.hxr-addWell > .hxr-awHead > .hxr-awhLeft {
  font-weight: 600;
  width: 100px;
}
.hxr-addWell > .hxr-awHead > .hxr-awhCenter {
  padding-left: 10px;
  display: flex;
  display: -webkit-flex;
  flex: 1;
}
.hxr-addWell > .hxr-awHead > .hxr-awhCenter > .hxr-awhcCell {
  padding-right: 10px;
}
.hxr-addWell > .hxr-awHead > .hxr-awhRight {
  width: 100px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.hxr-addWell > .hxr-awBody {
  background: #fff;
  border-radius: 4px;
  padding: 0px 20px 20px 20px;
  margin-top: 20px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop {
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  display: -webkit-flex;
  padding: 5px 0px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtLeft {
  font-weight: 600;
  width: 100px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtCenter {
  flex: 1;
}
.hxr-addWell > .hxr-awBody > .hxr-awbTop > .hxr-awbtRight {
  width: 100px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
}
.hxr-addWell > .hxr-awBody > .hxr-awbBottom {
  padding-top: 10px;
}
.hxr-addWell > .hxr-awBody > .hxr-awbBottom > .hxr-awbbCell {
  padding-bottom: 10px;
  display: flex;
  display: -webkit-flex;
}
.hxr-addWell > .hxr-awFoot {
  padding-top: 20px;
}
.el-form-item {
  margin: 20px 20px;
}
.hxr-upGroup {
  display: flex;
  display: -webkit-flex;
}
.hxr-upGroup > .hxr-ugCell {
  padding-right: 20px;
}
.hxr-upGroup > .hxr-ugCell > .hxr-ugcTop {
  text-align: center;
  color: #999;
}
.hxr-upGroup > .hxr-ugCell > .hxr-ugcBottom {
  border: 1px dotted #999;
  border-radius: 4px;
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.hxr-upVideo {
  display: flex;
  display: -webkit-flex;
}
.hxr-upVideo > .hxr-uvLeft {
  width: 220px;
}
.hxr-upVideo > .hxr-uvCenter {
  width: 150px;
  padding-left: 20px;
  position: relative;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcBack {
  position: absolute;
  width: 150px;
  height: 75px;
  background-color: #f5f5f5;
  border-radius: 4px;
  line-height: 75px;
  overflow: hidden;
  text-align: center;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcVideo {
  position: absolute;
  width: 150px;
  height: 75px;
  overflow: hidden;
}
.hxr-upVideo > .hxr-uvCenter > .hxr-uvcVideo > video {
  width: 150px;
  height: 75px;
}
.hxr-upVideo > .hxr-uvRight {
  padding-left: 20px;
}

.hxr-upAim {
  color: #999;
  padding-top: 10px;
}

.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.cpfood-uploader-icon {
  font-size: 26px;
  color: #8c939d;
  width: 75px;
  height: 75px;
  line-height: 75px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.cpfood {
  width: 75px;
  height: 75px;
  display: block;
}
</style>
