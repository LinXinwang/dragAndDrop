<template>
  <div id="content" class="contentBox drop_area_one" @drop="outerDrop($event);" @dragover="allowDrop($event);">
    <div id="area1" class="drag_items_one" :style="{height: height_1+ 'px'}" draggable="true" @dragstart="dragStart($event);" @dragend="outerDragEnd($event)">
      <div class="border_top"></div>
      <div class="item_content">
        <div id="p1" class="drop_area_two" :style="{width: width_1+ 'px',height: height_1+ 'px'}" @drop="innerDrop($event);" @dragover="allowDrop($event);">
          <div class="border_left"></div>
          <div class="item_content">
            <div v-for="(item,index) in container_1" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
              v-html="item.innerHtml">
            </div>
          </div>
          <div class="border_right"></div>
        </div>
        <div id="centerArea" :style="{width: width_2+ 'px',height: height_1+ 'px'}">
          <div class="border_left"></div>
          <div class="item_content">主题内容展示区域</div>
          <div class="border_right"></div>
        </div>
        <div id="p2" class="drop_area_two" :style="{width: width_3+ 'px',height: height_1+ 'px'}" @drop="innerDrop($event);" @dragover="allowDrop($event);">
          <div class="border_left"></div>
          <div class="item_content">
            <div v-for="(item,index) in container_2" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
              v-html="item.innerHtml">
            </div>
          </div>
          <div class="border_right"></div>
        </div>
      </div>
      <div class="border_bottom"></div>
    </div>
    <div id="area2" class="drag_items_one" :style="{height: height_2+ 'px'}" draggable="true" @dragstart="dragStart($event);" @dragend="outerDragEnd($event)" @drop="outerDrop($event);"
      @dragover="allowDrop($event);">
      <div class="border_top"></div>
      <div class="item_content">
        <div v-for="(item,index) in container_3" :key="index" class="drag_items_two" @dragstart="dragStart($event);" @dragend="innerDragEnd($event)" :id="item.id" draggable='true'
          v-html="item.innerHtml">
        </div>
      </div>
      <div class="border_bottom"></div>
    </div>
  </div>
</template>

<script>
import { allViews, useViews, viewStyle } from '../assets/js/view.js'
export default {
  name: 'Demo_3',
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
    this.registerMoveEvents(); // 注册拖拽事件
  },
  methods: {
    pageInit () {
      // console.log("lxw pageInit", allViews, useViews);
      this.initWH();// 初始化容器宽高
      this.initViews();// 初始化窗口位置
    },
    registerMoveEvents () {
      this.addMouseEventForLeft();//鼠标拖动左边线事件
      this.addMouseEventForRight();//鼠标拖动右边线事件
      this.addMouseEventForTop();//鼠标拖动上边线事件
      this.addMouseEventForBottom();//鼠标拖动下边线事件
      // 拖拽行为一定要记得解绑mousemove事件
      window.onmouseup = function () {
        document.onmousemove = null;
      }
    },
    // 初始化容器宽高
    initWH () {
      if (window.localStorage.getItem("wh")) {//本地有缓存容器宽高数据
        let localWH = window.localStorage.getItem("wh");
        localWH = JSON.parse(localWH);
        // console.log("lxw initWH", localWH);
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
    //Inner/outer
    outerDragEnd (ev) {
      console.log("lxw outerDragEnd----", ev.target.id);
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

          let boxScrollTop = document.getElementById("area2").getElementsByClassName("item_content")[0].scrollTop;
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
            $("#area2").find(".item_content")[0].append(document.getElementById(data));
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
        $("#" + targetId).find(".item_content")[0].append(document.getElementById(data));
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
    addMouseEventForLeft () {
      let that = this;
      let leftDoms = document.querySelectorAll('.border_left');
      // 左边线的拖动事件
      for (let i = 0; i < leftDoms.length; i++) {
        leftDoms[i].onmousedown = function () {
          console.log("lxw 鼠标点击了左边线");
          let e = window.event;
          e.stopPropagation();// 左边线上按下鼠标键后防止事件冒泡
          e.preventDefault();

          let x1 = e.screenX; // 记录初始x位移
          let startWidth_1 = that.width_1; // 子容器一初始宽度
          let startWidth_2 = that.width_2; // 子容器二初始宽度
          let startWidth_3 = that.width_3; // 子容器三初始宽度
          let parentid = window.event.target.parentElement.id;
          // 绑定移动事件
          document.onmousemove = function () {
            var e = window.event;
            var x2 = e.screenX; // 移动后的x位移
            var l = x2 - x1; // 产生的位移
            // 产生的位移 不能超过容器最小宽度和最大宽度
            let realWidth_1, realWidth_2, realWidth_3;
            if (parentid == "p1") {
              // 不响应容器一的左边线的移动事件
            } else if (parentid == "centerArea") {
              realWidth_2 = Number(startWidth_2) - Number(l);
              realWidth_1 = Number(startWidth_1) + Number(l);
              // x1<x<x2;y1<y<y2;x+y=固定值，求x的取值范围，同此理；
              let minNUm = Math.max(viewStyle.minWidth_2, startWidth_1 + startWidth_2 - viewStyle.maxWidth_1);
              let maxNum = Math.min(viewStyle.maxWidth_2, startWidth_1 + startWidth_2 - viewStyle.minWidth_1);
              if (realWidth_2 < minNUm) {
                realWidth_2 = minNUm;
              }
              if (realWidth_2 > maxNum) {
                realWidth_2 = maxNum;
              }
              realWidth_1 = startWidth_1 + startWidth_2 - realWidth_2;
              that.width_1 = realWidth_1;
              that.width_2 = realWidth_2;
            } else if (parentid == "p2") {
              realWidth_3 = Number(startWidth_3) - Number(l);
              realWidth_2 = Number(startWidth_2) + Number(l);
              let minNUm = Math.max(viewStyle.minWidth_3, startWidth_2 + startWidth_3 - viewStyle.maxWidth_2);
              let maxNum = Math.min(viewStyle.maxWidth_3, startWidth_2 + startWidth_3 - viewStyle.minWidth_2);
              if (realWidth_3 < minNUm) {
                realWidth_3 = minNUm;
              }
              if (realWidth_3 > maxNum) {
                realWidth_3 = maxNum;
              }
              realWidth_2 = startWidth_2 + startWidth_3 - realWidth_3;
              that.width_2 = realWidth_2;
              that.width_3 = realWidth_3;
            }
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      }
    },
    addMouseEventForRight () {
      let that = this;
      let rightDoms = document.querySelectorAll('.border_right');
      for (let j = 0; j < rightDoms.length; j++) {
        rightDoms[j].onmousedown = function () {
          console.log("lxw 鼠标点击了右边线");
          let e = window.event;  //接收事件对象
          e.stopPropagation();// 左边线上按下鼠标键后防止事件冒泡
          e.preventDefault();
          // 获取鼠标在当前事件源的位置
          let x1 = e.screenX; // 记录初始x位移
          let startWidth_1 = that.width_1; // 子容器一初始宽度
          let startWidth_2 = that.width_2; // 子容器二初始宽度
          let startWidth_3 = that.width_3; // 子容器三初始宽度
          let parentid = window.event.target.parentElement.id;
          // 绑定移动事件
          document.onmousemove = function () {
            // 获取鼠标在浏览器中的位置 - 每个事件都有自己独特的事件对象
            var e = window.event;
            var x2 = e.screenX; // 移动后的x位移
            var l = x2 - x1; // 产生的位移
            // 产生的位移 不能超过容器最小宽度和最大宽度
            let realWidth_1, realWidth_2, realWidth_3;
            if (parentid == "p1") {
              realWidth_1 = Number(startWidth_1) + Number(l);
              realWidth_2 = Number(startWidth_2) - Number(l);

              let minNUm = Math.max(viewStyle.minWidth_1, startWidth_1 + startWidth_2 - viewStyle.maxWidth_2);
              let maxNum = Math.min(viewStyle.maxWidth_1, startWidth_1 + startWidth_2 - viewStyle.minWidth_2);
              if (realWidth_1 < minNUm) {
                realWidth_1 = minNUm;
              }
              if (realWidth_1 > maxNum) {
                realWidth_1 = maxNum;
              }
              realWidth_2 = startWidth_1 + startWidth_2 - realWidth_1;
              that.width_1 = realWidth_1;
              that.width_2 = realWidth_2;
            } else if (parentid == "centerArea") {
              realWidth_2 = Number(startWidth_2) + Number(l);
              realWidth_3 = Number(startWidth_3) - Number(l);

              let minNUm = Math.max(viewStyle.minWidth_2, startWidth_2 + startWidth_3 - viewStyle.maxWidth_3);
              let maxNum = Math.min(viewStyle.maxWidth_2, startWidth_2 + startWidth_3 - viewStyle.minWidth_3);
              if (realWidth_2 < minNUm) {
                realWidth_2 = minNUm;
              }
              if (realWidth_2 > maxNum) {
                realWidth_2 = maxNum;
              }
              realWidth_3 = startWidth_2 + startWidth_3 - realWidth_2;
              that.width_2 = realWidth_2;
              that.width_3 = realWidth_3;
            } else if (parentid == "p3") {
              // 暂时不响应子容器三的右边线的移动事件
            }
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      }
    },
    addMouseEventForTop () {
      let that = this;
      let topDoms = document.querySelectorAll('.border_top');
      for (let i = 0; i < topDoms.length; i++) {
        topDoms[i].onmousedown = function () {
          console.log("lxw 鼠标点击了上边线");
          let e = window.event;  //接收事件对象
          e.stopPropagation();// 左边线上按下鼠标键后防止事件冒泡
          e.preventDefault();
          // 获取鼠标在当前事件源的位置
          let y1 = e.screenY; // 记录初始y位移
          let startHeight_1 = that.height_1; // 容器一初始高度
          let startHeight_2 = that.height_2; // 容器二初始高度
          let parentid = window.event.target.parentElement.id;
          // 绑定移动事件
          document.onmousemove = function () {
            let e = window.event;
            let y2 = e.screenY; // 移动后的y位移
            let t = y2 - y1; // 产生的位移
            // 产生的位移 不能超过容器最小高度和最大高度
            let realHeight_1, realHeight_2;
            if (parentid == "area1") {
              // 容器一的上边距，暂时不做响应
            } else if (parentid == "area2") {
              realHeight_1 = Number(startHeight_1) + Number(t);
              realHeight_2 = Number(startHeight_2) - Number(t);

              let minNUm = Math.max(viewStyle.minHeight_2, startHeight_1 + startHeight_2 - viewStyle.maxHeight_1);
              let maxNum = Math.min(viewStyle.maxHeight_2, startHeight_1 + startHeight_2 - viewStyle.minHeight_1);

              if (realHeight_2 < minNUm) {
                realHeight_2 = minNUm;
              }
              if (realHeight_2 > maxNum) {
                realHeight_2 = maxNum;
              }
              realHeight_1 = startHeight_1 + startHeight_2 - realHeight_2;
              that.height_1 = realHeight_1;
              that.height_2 = realHeight_2;
            }
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      }
    },
    addMouseEventForBottom () {
      let that = this;
      let bottomDoms = document.querySelectorAll('.border_bottom');
      for (let i = 0; i < bottomDoms.length; i++) {
        bottomDoms[i].onmousedown = function () {
          console.log("lxw 鼠标点击了下边线");
          let e = window.event;  //接收事件对象
          e.stopPropagation();// 左边线上按下鼠标键后防止事件冒泡
          e.preventDefault();
          // 获取鼠标在当前事件源的位置
          let y1 = e.screenY; // 记录初始y位移
          let startHeight_1 = that.height_1; // 容器一初始高度
          let startHeight_2 = that.height_2; // 容器二初始高度
          let parentid = window.event.target.parentElement.id;
          // 绑定移动事件
          document.onmousemove = function () {
            let e = window.event;
            let y2 = e.screenY; // 移动后的y位移
            let t = y2 - y1; // 产生的位移
            // 产生的位移 不能超过容器最小高度和最大高度
            let realHeight_1, realHeight_2;
            if (parentid == "area1") {
              realHeight_1 = Number(startHeight_1) + Number(t);
              realHeight_2 = Number(startHeight_2) - Number(t);

              let minNUm = Math.max(viewStyle.minHeight_1, startHeight_1 + startHeight_2 - viewStyle.maxHeight_2);
              let maxNum = Math.min(viewStyle.maxHeight_1, startHeight_1 + startHeight_2 - viewStyle.minHeight_2);

              if (realHeight_1 < minNUm) {
                realHeight_1 = minNUm;
              }
              if (realHeight_1 > maxNum) {
                realHeight_1 = maxNum;
              }
              realHeight_2 = startHeight_1 + startHeight_2 - realHeight_1;
              that.height_1 = realHeight_1;
              that.height_2 = realHeight_2;
            } else if (parentid == "area2") {
              // 容器二的下边距，暂时不做响应
            }
            window.localStorage.setItem("wh", JSON.stringify({
              height_1: that.height_1, // 容器一的高度
              height_2: that.height_2, // 容器二的高度 （容器一二值允许改变高度）
              width_1: that.width_1, // 子容器一的宽度
              width_2: that.width_2, // 子容器二的宽度
              width_3: that.width_3, // 子容器三的宽度
            }));
          }
        }
      }
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
  #p2 {
    position: relative;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
  }
  ::v-deep .drag_items_two {
    width: 100%;
    height: 180px;
    line-height: 180px;
    font-size: 64px;
    background-color: red;
    margin: 2px 10px;
    position: relative;
    /* display: inline-block; */
  }
  #centerArea {
    position: relative;
    width: 400px;
    display: inline-block;
    overflow: auto;
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
  ::v-deep #area1 {
    font-size: 64px;
  }
  ::v-deep #area2 {
    line-height: 300px;
    font-size: 64px;
    overflow: hidden;
  }
  .border_top,
  .border_bottom {
    position: absolute;
    display: inline-block;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 2;
  }
  .border_left,
  .border_right {
    position: absolute;
    display: inline-block;
    background-color: rgba(255, 255, 255, 1);
    top: 0;
    width: 2px;
    height: 100%;
    z-index: 2;
  }
  .border_top:hover,
  .border_bottom:hover,
  .border_left:hover,
  .border_right:hover {
    background-color: rgba(255, 0, 255, 1);
  }
  .border_top {
    top: 0;
  }
  .border_bottom {
    bottom: 0;
  }
  .border_left {
    left: 0;
  }
  .border_right {
    right: 0;
  }
  .item_content {
    position: relative;
    display: inline-block;
    width: 100%;
    z-index: 1;
  }
  #area2 .item_content {
    height: 100%;
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