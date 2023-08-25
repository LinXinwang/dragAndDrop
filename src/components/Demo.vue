<template>
  <div id="content" class="contentBox drop_area_one">
    <div id="area1" class="drag_items_one" :style="{height: height_1+ 'px'}" v-dragresize="dragConfig_area1_bottom">
      <div id="p1" class="drop_area_two" :style="{width: width_1+ 'px',height: height_1+ 'px'}" @drop="innerDrop($event);" @dragover="allowDrop($event);" v-dragresize="dragConfig_p1_right">
        <div v-for="(item,index) in container_1" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
          v-html="item.innerHtml">
        </div>
      </div>
      <div id="centerArea" :style="{width: width_2+ 'px',height: height_1+ 'px',left:width_1+'px'}">
        主题内容展示区域
      </div>
      <div id="p2" class="drop_area_two" :style="{width: width_3+ 'px',height: height_1+ 'px'}" @drop="innerDrop($event);" @dragover="allowDrop($event);" v-dragresize="dragConfig_p2_left">
        <div v-for="(item,index) in container_2" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
          v-html="item.innerHtml">
        </div>
      </div>
    </div>
    <div id="area2" class="drag_items_one" :style="{height: height_2+ 'px'}" @drop="outerDrop($event);" @dragover="allowDrop($event);">
      <div v-for="(item,index) in container_3" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
        v-html="item.innerHtml">
      </div>
    </div>
  </div>
</template>

<script>
import { allViews, useViews, viewStyle } from '../assets/js/view.js'
export default {
  name: 'Demo',
  props: {
    msg: String
  },
  data () {
    return {
      container_1: [], // 可拖拽窗口容器一
      container_2: [], // 可拖拽窗口容器二
      container_3: [], // 可拖拽窗口容器三
      curDragClass: '',// 记录当前拖放对象的class
      height_1: 500, // 容器一的默认高度
      height_2: 300, // 容器二的默认高度 （容器一二只允许改变高度）
      width_1: 400, // 子容器一的默认宽度
      width_2: 400, // 子容器二的默认宽度
      width_3: 400, // 子容器三的默认宽度（子容器一二三只允许改变宽度；高度跟着父容器高度变化） 
    }
  },
  mounted () {
    this.pageInit(); // 页面初始化
  },
  computed: {
    dragConfig_p1_right () {
      let that = this;
      let startWidth_1 = that.width_1; // 子容器一初始宽度
      let startWidth_2 = that.width_2; // 子容器二初始宽度
      let minNum = Math.max(viewStyle.minWidth_1, startWidth_1 + startWidth_2 - viewStyle.maxWidth_2);
      let maxNum = Math.min(viewStyle.maxWidth_1, startWidth_1 + startWidth_2 - viewStyle.minWidth_2);
      return [
        {
          dragBorder: "right",
          setCssProperty: "width",
          frequencyThrottleNum: 0, //0-不节流,其他数字表示几次执行一次
          // memoryPositionKey: 'p1', // 缓存该拉伸对象的数据
          min: minNum,
          max: maxNum,
          log: false,
          resizeHandle: (x, p) => {
            // 自定义一些操作
            console.log("lxw resizeHandle", x, p);
            let realWidth_1 = Number(startWidth_1) + Number(x);
            let realWidth_2 = Number(startWidth_2) - Number(x);
            console.log("lxw resizeHandle---1", realWidth_1, minNum, maxNum);
            if (realWidth_1 < minNum) {
              realWidth_1 = minNum;
            }
            if (realWidth_1 > maxNum) {
              realWidth_1 = maxNum;
            }
            console.log("lxw resizeHandle---2", realWidth_1);
            realWidth_2 = startWidth_1 + startWidth_2 - realWidth_1;
            console.log("lxw resizeHandle---3", realWidth_1, realWidth_2);
            that.width_1 = realWidth_1;
            that.width_2 = realWidth_2;

            that.$forceUpdate();
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        },
      ];
    },
    dragConfig_p2_left () {
      let that = this;
      let startWidth_2 = that.width_2; // 子容器一初始宽度
      let startWidth_3 = that.width_3; // 子容器二初始宽度
      let minNum = Math.max(viewStyle.minWidth_3, startWidth_2 + startWidth_3 - viewStyle.maxWidth_2);
      let maxNum = Math.min(viewStyle.maxWidth_3, startWidth_2 + startWidth_3 - viewStyle.minWidth_2);
      return [
        {
          dragBorder: "left",
          setCssProperty: "width",
          frequencyThrottleNum: 0, //0-不节流,其他数字表示几次执行一次
          // memoryPositionKey: 'p1', // 缓存该拉伸对象的数据
          min: minNum,
          max: maxNum,
          log: false,
          resizeHandle: (x, p) => {
            console.log("lxw resizeHandle", x, p);
            let realWidth_2 = Number(startWidth_2) - Number(x);
            let realWidth_3 = Number(startWidth_3) + Number(x);
            if (realWidth_3 < minNum) {
              realWidth_3 = minNum;
            }
            if (realWidth_3 > maxNum) {
              realWidth_3 = maxNum;
            }
            realWidth_2 = startWidth_2 + startWidth_3 - realWidth_3;
            that.width_2 = realWidth_2;
            that.width_3 = realWidth_3;

            that.$forceUpdate();
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        },
      ];
    },
    dragConfig_area1_bottom () {
      let that = this;
      let startHeight_1 = that.height_1; // 容器一初始高度
      let startHeight_2 = that.height_2; // 容器二初始高度
      let minNum = Math.max(viewStyle.minHeight_1, startHeight_1 + startHeight_2 - viewStyle.maxHeight_2);
      let maxNum = Math.min(viewStyle.maxHeight_1, startHeight_1 + startHeight_2 - viewStyle.minHeight_2);
      return [
        {
          dragBorder: "bottom",
          setCssProperty: "height",
          frequencyThrottleNum: 0, //0-不节流,其他数字表示几次执行一次
          // memoryPositionKey: 'area1', // 缓存该拉伸对象的数据
          min: minNum,
          max: maxNum,
          log: false,
          resizeHandle: (y, p) => {
            let realHeight_1 = Number(startHeight_1) + Number(y);
            let realHeight_2 = Number(startHeight_2) - Number(y);
            console.log("lxw resizeHandle", y, p);
            if (realHeight_1 < minNum) {
              realHeight_1 = minNum;
            }
            if (realHeight_1 > maxNum) {
              realHeight_1 = maxNum;
            }
            realHeight_2 = startHeight_1 + startHeight_2 - realHeight_1;
            that.height_1 = realHeight_1;
            that.height_2 = realHeight_2;

            that.$forceUpdate();
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      ]
    },
    dragConfig_area2_top () {
      let that = this;
      let startHeight_1 = that.height_1; // 容器一初始高度
      let startHeight_2 = that.height_2; // 容器二初始高度
      let minNum = Math.max(viewStyle.minHeight_2, startHeight_1 + startHeight_2 - viewStyle.maxHeight_1);
      let maxNum = Math.min(viewStyle.maxHeight_2, startHeight_1 + startHeight_2 - viewStyle.minHeight_1);
      return [
        {
          dragBorder: "top",
          setCssProperty: "height",
          frequencyThrottleNum: 0, //0-不节流,其他数字表示几次执行一次
          // memoryPositionKey: 'area1', // 缓存该拉伸对象的数据
          min: minNum,
          max: maxNum,
          log: false,
          resizeHandle: (y, p) => {
            console.log("lxw resizeHandle", y, p);

            let realHeight_1 = Number(startHeight_1) - Number(y);
            let realHeight_2 = Number(startHeight_2) + Number(y);

            if (realHeight_2 < minNum) {
              realHeight_2 = minNum;
            }
            if (realHeight_2 > maxNum) {
              realHeight_2 = maxNum;
            }
            realHeight_1 = startHeight_1 + startHeight_2 - realHeight_2;
            that.height_1 = realHeight_1;
            that.height_2 = realHeight_2;

            that.$forceUpdate();
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      ]
    }
  },
  methods: {
    pageInit () {
      // console.log("lxw pageInit", allViews, useViews);
      this.initWH();// 初始化容器宽高
      this.initViews();// 初始化窗口位置
    },
    // 初始化容器宽高
    initWH () {
      if (window.localStorage.getItem("wh")) {//本地有缓存容器宽高数据
        let localWH = window.localStorage.getItem("wh");
        localWH = JSON.parse(localWH);
        console.log("lxw initWH", localWH);
        this.height_1 = localWH.height_1;
        this.height_2 = localWH.height_2;
        this.width_1 = localWH.width_1;
        this.width_2 = localWH.width_2;
        this.width_3 = localWH.width_3;
      }
    },
    //  初始化窗口位置
    initViews () {
      let curViews = useViews; // 默认数组

      if (window.localStorage.getItem("useViews")) {//本地有缓存窗口位置数据
        let localViews = window.localStorage.getItem("useViews");
        localViews = JSON.parse(localViews);
        if (localViews && localViews.length > 0) {
          curViews = localViews;
        }
      }
      // 最初版本，只在两个区域拖放
      // 通过使用窗口的id找到对应的innerHtml
      for (let i = 0; i < curViews.length; i++) {
        for (let j = 0; j < allViews.length; j++) {
          if (allViews[j].id == curViews[i].id) {
            curViews[i].innerHtml = allViews[j].innerHtml;
          }
        }
      }
      // 使用窗口进行分类
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      for (let k = 0; k < curViews.length; k++) {
        if (curViews[k].parentid == "p1") {
          arr1.push(curViews[k]);
        } else if (curViews[k].parentid == "p2") {
          arr2.push(curViews[k]);
        } else if (curViews[k].parentid == "area2") {
          arr3.push(curViews[k]);
        }
      }
      // 数组排序"
      let newArray1 = (arr1.length > 1) ? arr1.sort(this.compareByIndex) : arr1;
      let newArray2 = (arr2.length > 1) ? arr2.sort(this.compareByIndex) : arr2;
      let newArray3 = (arr3.length > 1) ? arr3.sort(this.compareByIndex) : arr3;

      this.container_1 = newArray1;
      this.container_2 = newArray2;
      this.container_3 = newArray3;
    },
    allowDrop (ev) {
      ev.stopPropagation();// 阻止冒泡事件
      ev.preventDefault(); // 阻止默认事件
      console.log("lxw allowDrop", this.curDragClass, "1:" + ev.target.id, "2:" + ev.target.parentElement.id, "3:" + ev.target.parentElement.parentElement.id);
      if (this.curDragClass == "drag_items_two") {
        // 拖放窗口

      } else if (ev.target.id == "drag_items_one") {
        // 拖放外层容器
      }
    },
    dragStart (ev) {
      ev.stopPropagation();
      ev.dataTransfer.setData("Text", ev.target.id);
      // 记录当前class名和id，用于做拖放对象的判断
      this.curDragClass = ev.target.className;
      this.viewId = ev.target.id;
    },
    innerDragEnd (ev) {
      console.log("lxw innerDragEnd----", ev.target.id);
    },
    // 外层的拖放
    outerDrop (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      console.log("lxw outerDrop---- 鼠标在的高度", ev.y, ev.target.className, this.curDragClass, ev.target.id);
      console.log("lxw outerDrop---- className", ev.target.className, this.curDragClass);
      console.log("lxw outerDrop---- id ", ev.target.id, ev.target.parentElement.id, ev.target.parentElement.parentElement.id);

      if (this.curDragClass == "drag_items_one") {
        console.log("lxw 外层的拖放");
        let data = ev.dataTransfer.getData("Text");
        // 通过鼠标所在位置和子元素相对于父元素的实际宽高，计算插入的位置
        let boxScrollTop = document.getElementById("content").scrollTop;
        let childLength = $("#content").find(".drag_items_one").length;
        let insetIndex = -1;
        if (childLength > 0) {
          for (let i = 0; i < childLength; i++) {
            let itemTop = $("#content").find(".drag_items_one").eq(i)[0].offsetTop;
            let areaTop = $("#content").offset().top;
            // console.log("lxw ", i, boxScrollTop, ev.y, itemTop, areaTop);
            if (itemTop + areaTop > ev.y + boxScrollTop) {
              insetIndex = i;
              break;
            }
          }
        }
        console.log("lxw 需要插入的位置", insetIndex);
        if (insetIndex == -1) {
          // 没找到满足条件的，添加到父元素最后面
          $("#content").append(document.getElementById(data));
        } else if (insetIndex == 0) {
          // 添加到父元素最前面
          $("#content").prepend(document.getElementById(data));
        } else {
          // 添加到指定元素后面
          $("#content").find(".drag_items_one").eq(insetIndex - 1)[0].after(document.getElementById(data));
        }
      } else if (this.curDragClass == "drag_items_two") {
        if (ev.target.id == "area2" || ev.target.parentElement.id == "area2" || ev.target.parentElement.parentElement.id == "area2") {
          // 内层的拖+外层的放，可视为将窗口放入底部容器
          let data = ev.dataTransfer.getData("Text");

          let boxScrollTop = document.getElementById("area2").scrollTop;
          let childLength = $("#area2").find(".drag_items_two").length;
          let insetIndex = -1;
          if (childLength > 0) {
            for (let i = 0; i < childLength; i++) {
              let itemTop = $("#area2").find(".drag_items_two").eq(i)[0].offsetTop;
              let areaTop = $("#area2").offset().top;
              // console.log("lxw ", i, boxScrollTop, ev.y, itemTop, areaTop);
              if (itemTop + areaTop > ev.y + boxScrollTop) {
                insetIndex = i;
                break;
              }
            }
          }
          console.log("lxw 需要插入的位置", insetIndex);
          if (insetIndex == -1) {
            // 没找到满足条件的，添加到父元素第一个
            $("#area2").append(document.getElementById(data));
          } else if (insetIndex == 0) {
            // 添加到父元素最前面
            $("#area2").find(".drag_items_two").eq(0)[0].before(document.getElementById(data));
          } else {
            // 添加到指定元素后面
            $("#area2").find(".drag_items_two").eq(insetIndex - 1)[0].after(document.getElementById(data));
          }
          // 读取变更后的容器内数据，缓存起来。
          this.saveViewsData();
        }
      }
    },
    // 内层的拖放
    innerDrop (ev) {
      ev.preventDefault();
      console.log("lxw innerDrop---- 鼠标在的高度", this.curDragClass, ev.target.className.indexOf('drop_area_two'));
      // 外层的拖+内层的放，不响应；
      if (this.curDragClass == "drag_items_one") {
        return
      }
      ev.stopPropagation();
      let targetId = '';
      if (ev.target.className.indexOf('drop_area_two') != -1) {
        // 如果放置的位置是.drop_area_two元素
        targetId = ev.target.id;
      } else if (ev.target.parentElement.className.indexOf('drop_area_two') != -1) {
        // 如果放置的位置是drop_area_two下的子元素
        targetId = ev.target.parentElement.id;
      } else if (ev.target.parentElement.parentElement.className.indexOf('drop_area_two') != -1) {
        // 如果放置的位置是drop_area_two的子元素的子元素
        targetId = ev.target.parentElement.parentElement.id;
      } else {
        // 不满足要求，
        return
      }
      console.log("lxw targetId", targetId);

      var data = ev.dataTransfer.getData("Text");

      let boxScrollTop = document.getElementById(targetId).scrollTop;
      let childLength = $("#" + targetId).find(".drag_items_two").length;
      let insetIndex = -1;
      if (childLength > 0) {
        for (let i = 0; i < childLength; i++) {
          let itemTop = $("#" + targetId).find(".drag_items_two").eq(i)[0].offsetTop;
          let areaTop = $("#" + targetId).offset().top;
          console.log("lxw ", i, boxScrollTop, ev.y, itemTop, areaTop);
          if (itemTop + areaTop > ev.y + boxScrollTop) {
            insetIndex = i;
            break;
          }
        }
      }
      console.log("lxw 需要插入的位置", insetIndex);
      if (insetIndex == -1) {
        // 没找到满足条件的，添加到父元素第一个
        $("#" + targetId).append(document.getElementById(data));
      } else if (insetIndex == 0) {
        // 添加到父元素最前面
        $("#" + targetId).find(".drag_items_two").eq(0)[0].before(document.getElementById(data));
        $("#" + targetId).find(".view_border_top").eq(0).css("background-color", "black");
      } else {
        // 添加到指定元素后面
        $("#" + targetId).find(".drag_items_two").eq(insetIndex - 1)[0].after(document.getElementById(data));
        $("#" + targetId).find(".view_border_bottom").eq(insetIndex - 1).css("background-color", "black");
      }
      // 读取变更后的容器内数据，缓存起来。
      this.saveViewsData();

      // 在父级最后面追加一个子元素
      // $("#wrap").append("<p class='three'>我是子元素append</p>");
      // 在父级最前面追加一个子元素
      // $("#wrap").prepend("<p class='three'>我是子元素prepend</p>");
      // 在当前元素之后追加
      // $("#wrap").after("<p class='siblings'>我是同级元素after</p>");
      // 在当前元素之前追加（是同级关系）
      // $("#wrap").before("<p class='siblings'>我是同级元素before</p>");
    },
    // 缓存更新后的窗口数据。
    saveViewsData () {
      let childrenLength_p1 = $("#p1").find(".drag_items_two").length;
      let childrenLength_p2 = $("#p2").find(".drag_items_two").length;
      let childrenLength_area2 = $("#area2").find(".drag_items_two").length;

      let saveViews = [];
      if (childrenLength_p1 > 0) {
        for (let j = 0; j < childrenLength_p1; j++) {
          for (let k = 0; k < useViews.length; k++) {
            if (useViews[k].id == $("#p1").find(".drag_items_two")[j].id) {
              useViews[k].parentid = "p1";
              useViews[k].index = j;
              saveViews.push(useViews[k]);
            }
          }
        }
      }
      if (childrenLength_p2 > 0) {
        for (let j = 0; j < childrenLength_p2; j++) {
          for (let k = 0; k < useViews.length; k++) {
            if (useViews[k].id == $("#p2").find(".drag_items_two")[j].id) {
              useViews[k].parentid = "p2";
              useViews[k].index = j;
              saveViews.push(useViews[k]);
            }
          }
        }
      }
      if (childrenLength_area2 > 0) {
        for (let j = 0; j < childrenLength_area2; j++) {
          for (let k = 0; k < useViews.length; k++) {
            if (useViews[k].id == $("#area2").find(".drag_items_two")[j].id) {
              useViews[k].parentid = "area2";
              useViews[k].index = j;
              saveViews.push(useViews[k]);
            }
          }
        }
      }
      // console.log("lxw 变更后的存储数据", saveViews);
      window.localStorage.setItem("useViews", JSON.stringify(saveViews));
    },
    // 对象数组排序
    compareByIndex (a, b) {
      let comparison = 0;
      if (a.index > b.index) {
        comparison = 1;
      } else if (a.index < b.index) {
        comparison = -1;
      }
      return comparison;
    }
  },
  beforeDestroy () {
  }
}
</script>
<style scoped>
  .contentBox {
    background-color: aqua;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  #p1,
  #p2,
  #centerArea {
    position: absolute;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #p1,
  #p2 {
    top: 0;
    background-color: black;
  }
  #p1 {
    left: 0;
  }
  #p2 {
    right: 0;
  }
  #centerArea {
    line-height: 500px;
    font-size: 32px;
  }
  ::v-deep .drag_items_one {
    position: relative;
    display: inline-block;
    width: 1200px;
    background-color: antiquewhite;
    overflow: hidden;
  }
  ::v-deep .drag_items_two {
    width: calc(100% - 20px);
    height: 180px;
    line-height: 180px;
    font-size: 64px;
    background-color: red;
    margin: 2px 10px;
    position: relative;
  }
  ::v-deep #area1 {
    font-size: 64px;
  }
  ::v-deep #area2 {
    line-height: 300px;
    font-size: 64px;
    overflow: auto;
  }
  ::v-deep .view_border_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    /* background-color: black; */
  }
  ::v-deep .view_border_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    /* background-color: black; */
  }
</style>