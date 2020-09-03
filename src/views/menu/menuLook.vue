<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu">
      <el-form-item label="菜谱名称:" label-width="200px" prop="name">{{formMenu.name}}</el-form-item>
      <el-form-item label="菜谱著作人:" label-width="200px" prop="authorName">{{formMenu.authorName}}</el-form-item>
      <el-form-item
        label="菜谱收藏量:"
        label-width="200px"
        prop="subscribePoints"
      >{{formMenu.subscribePoints}}</el-form-item>
      <el-form-item label="菜谱图片:" label-width="200px">
        <div class="hxr-upGroup">
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">首图</div>
            <div class="hxr-ugcBottom">
              <img v-if="formMenu.headImg" :src="formMenu.headImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">0.6比例</div>
            <div class="hxr-ugcBottom">
              <img v-if="formMenu.middleImg" :src="formMenu.middleImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
          <div class="hxr-ugCell">
            <div class="hxr-ugcTop">1.5比例</div>
            <div class="hxr-ugcBottom">
              <img v-if="formMenu.menuUrl" :src="formMenu.menuUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="菜谱视频:" label-width="200px">
        <div class="hxr-upVideo">
          <div class="hxr-uvCenter" v-if="formMenu.vd">
            <div class="hxr-uvcBack">无法预览视频{{formMenu.vd}}</div>
            <div class="hxr-uvcVideo">
              <video :src="formMenu.vd" controls="controls"></video>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="菜谱介绍:" label-width="200px" prop="description">{{formMenu.description}}</el-form-item>
      <el-form-item
        label="菜谱分类:"
        label-width="200px"
        prop="menuType"
      >{{formMenu.menuType | listFilter(menuTypeList)}}</el-form-item>
      <el-form-item
        label="烹饪方式:"
        label-width="200px"
        prop="forKitchenElectric"
      >{{formMenu.forKitchenElectric}}</el-form-item>
      <el-form-item label="烹饪用时:" label-width="200px" prop="tm">{{formMenu.tm}}分钟</el-form-item>
      <el-form-item label="烹饪难度:" label-width="200px" prop="deg">{{formMenu.deg}}</el-form-item>
      <el-form-item label="营养成分:" label-width="200px">
        <div
          class="hxr-addCell"
          v-for="(item,index) in formMenu.nutritionalIngredient"
          :key="index"
        >
          <div class="hxr-acLeft">{{item.value | listFilter(nutritionalList)}}</div>
          <div
            class="hxr-acCenter"
          >{{item.weight}}{{item.value?nutritionalList[item.value-1].end:'无'}}</div>
        </div>
      </el-form-item>
      <el-form-item label="食材清单：" label-width="200px">
        <div class="hxr-addPan" v-for="(item,index) in formMenu.fl" :key="index">
          <div class="hxr-apLeft">
            <img v-if="item.img" :src="item.img" class="cpfood" />
            <i v-else class="el-icon-plus cpfood-uploader-icon"></i>
          </div>
          <div class="hxr-apRight">
            <div class="hxr-aprTop">{{item.name}}</div>
            <div class="hxr-aprBottom">{{item.weight}}克</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="烹饪步骤：" label-width="200px">
        <div class="hxr-addPan" v-for="(item,index) in formMenu.cookSteps" :key="index">
          <div class="hxr-apLeft">
            <img v-if="item.stepUrl" :src="item.stepUrl" class="cpfood" />
            <i v-else class="el-icon-plus cpfood-uploader-icon"></i>
          </div>
          <div class="hxr-apRight">
            <div class="hxr-aprTop">{{item.step}}</div>
            <div class="hxr-aprBottom">{{item.description}}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="小贴士:" label-width="200px" prop="tip">{{formMenu.tip}}</el-form-item>
      <el-form-item label="支持设备:" label-width="200px">{{formMenu.deviceType}}</el-form-item>
      <el-form-item label-width="200px">
        <div v-if="formMenu.deviceType.length>0">
          <div class="hxr-addExpend">{{formMenu.specificationsType | listFilter(parameterList)}}</div>
          <div class="hxr-addWell" v-for="(item,index) in formMenu.menuParameterS" :key="index">
            <div class="hxr-awHead">
              <div class="hxr-awhLeft">规格设置</div>
              <div class="hxr-awhCenter">
                <div
                  class="hxr-awhcCell"
                  v-if="formMenu.specificationsType==1"
                >{{item.parameterEnum | listFilter(parameterValueList1)}}克</div>
                <div
                  class="hxr-awhcCell"
                  v-if="formMenu.specificationsType==2"
                >{{item.parameterEnum | listFilter(parameterValueList2)}}</div>
                <div
                  class="hxr-awhcCell"
                  v-if="formMenu.specificationsType==3"
                >{{item.parameterEnum | listFilter(parameterValueList3)}}</div>
              </div>
              <div class="hxr-awhRight">{{item.defaultChecked==1?"已设为默认":"非默认"}}</div>
            </div>
            <div class="hxr-awBody" v-for="(x,index) in item.arithmeticS" :key="index">
              <div class="hxr-awbTop">
                <div class="hxr-awbtLeft">参数设置</div>
                <div class="hxr-awbtCenter">(阶段{{index+1}})</div>
                <div class="hxr-awbtRight"></div>
              </div>
              <div class="hxr-awbBottom">
                <div class="hxr-awbbCell">{{x.mode | listFilter(modeList)}}</div>
                <div class="hxr-awbbCell">
                  <div>温度：</div>
                  <div>{{x.temp}}</div>
                  <div>℃</div>
                </div>
                <div class="hxr-awbbCell">
                  <div>时间：</div>
                  <div>{{x.time}}</div>
                  <div>分钟</div>
                </div>
              </div>
              <div class="hxr-awbTop">
                <div class="hxr-awbtLeft">辅助参数设置</div>
              </div>
              <div class="hxr-awbBottom">
                <div class="hxr-awbbCell">
                  <div>注水：</div>
                  <div>{{x.waterTime}}</div>
                  <div>秒</div>
                </div>
                <div class="hxr-awbbCell">
                  <div>侧面风机时间：</div>
                  <div>{{x.fanTime}}</div>
                  <div>分钟</div>
                </div>
                <div class="hxr-awbbCell">
                  <div>蒸汽盘外圈：</div>
                  <div>{{x.steamTime}}</div>
                  <div>分钟</div>
                </div>
                <div class="hxr-awbbCell">
                  <div>是否暂停：</div>
                  <div>{{x.hasRemind?"是":"否"}}</div>
                </div>
                <div class="hxr-awbbCell">
                  <div>信息提醒：</div>
                  <div>{{x.remindText}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="状态:"
        label-width="200px"
        prop="publishStatus"
      >{{formMenu.publishStatus | listFilter(statusList)}}</el-form-item>
      <el-form-item label-width="200px">{{formMenu.isOfficial | listFilter(isOfficialList)}}</el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { arrToMap } from "../../utils/main";
import {
  getDeviceList,
  getMenuTypeList,
  getNutritionalList,
  getForKitchenElectricList,
  getParameterList,
  getParameterValueList1,
  getParameterValueList2,
  getParameterValueList3,
  getIsOfficialList,
  getModeList,
  getDegList,
  getStatusList,
} from "../../api/dataList";
import {
  getMenuDetailInfo,
  postMenuDetailInfo,
} from "../../api/menus/menuList";

export default {
  data() {
    return {
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
      parameterValueList1: [],
      parameterValueList2: [],
      parameterValueList3: [],
      modeList: [],
      degList: [],
      statusList: [],
      deviceList: [],
      isOfficialList: [],
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      value1: "",
    };
  },
  filters: {
    listFilter: function (value, list) {
      var ls = value;
      if (list) {
        var lsmap = arrToMap(list, "value", "label");
        ls = lsmap.get(value);
      }
      return ls;
    },
  },
  created() {
    this.typeListInt();
    this.deviceInt();
    this.getMenuDetail();
    this.modeListInt();
    this.parameterListInt();
    this.nutritionalList = getNutritionalList();
    this.forKitchenElectricList = getForKitchenElectricList();
    this.parameterValueList1 = getParameterValueList1();
    this.parameterValueList2 = getParameterValueList2();
    this.parameterValueList3 = getParameterValueList3();
    this.isOfficialList = getIsOfficialList();
    this.degList = getDegList();
    this.statusList = getStatusList();
  },
  methods: {
    parameterListInt() {
      getParameterList().then((response) => {
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            var ls = {
              value: response.data[i].specificationsType,
              label: response.data[i].name,
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
    getMenuDetail() {
      // 查询菜谱详情
      getMenuDetailInfo({
        menuId: this.$route.query.id,
        userId: "",
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          var ls = response.data;
          ls.nutritionalIngredient = JSON.parse(ls.nutritionalIngredient);
          for (var i = 0; i < ls.nutritionalIngredient.length; i++) {
            ls.nutritionalIngredient[i].weight = parseFloat(
              ls.nutritionalIngredient[i].weight
            );
            if (ls.nutritionalIngredient[i].value) {
            } else {
              ls.nutritionalIngredient[i].value = i + 1;
            }
          }
          if (ls.fl) {
            ls.fl = JSON.parse(ls.fl);
            for (var i = 0; i < ls.fl.length; i++) {
              ls.fl[i].weight = parseFloat(ls.fl[i].weight);
            }
          }
          this.formMenu = ls;
        } else {
          this.$message.error("菜谱详情请求异常");
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
  height: 75px;
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
