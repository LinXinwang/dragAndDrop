<template>
  <div id="content" class="contentBox drop_area_one" @drop="outerDrop($event);" @dragover="allowDrop($event);">
    <div id="area1" class="drag_items_one" draggable="true" @dragstart="firstDragStart($event);">
      <div class="border_top"></div>
      <div class="item_content">
        <div id="p1" class="drop_area_two" @drop="innerDrop($event);" @dragover="allowDrop($event);">
          <div class="border_left"></div>
          <div class="item_content">

          </div>
          <div class="border_right"></div>
        </div>
        <div id="centerArea">
          <div class="border_left"></div>
          <div class="item_content">主题内容展示区域</div>
          <div class="border_right"></div>
        </div>
        <div id="p2" class="drop_area_two" @drop="innerDrop($event);" @dragover="allowDrop($event);">
          <div class="border_left"></div>
          <div class="item_content">

          </div>
          <div class="border_right"></div>
        </div>
      </div>
      <div class="border_bottom"></div>
    </div>
    <div id="area2" class="drag_items_one" draggable="true" @dragstart="firstDragStart($event);" @dragend="outerDragEnd($event)">
      <div class="border_top"></div>
      <div class="item_content">1_2</div>
      <div class="border_bottom"></div>
    </div>
  </div>
</template>

<script>
import { allViews, useViews } from '../assets/js/view.js'
export default {
  name: 'Demo_2',
  props: {
    msg: String
  },
  data () {
    return {
      container_1: [],
      container_2: [],
      curDragClass: '',// 记录当前拖放对象的class
    }
  },
  mounted () {
    this.pageInit();
    this.registerMoveEvents();
  },
  methods: {
    pageInit () {
      console.log("lxw pageInit", allViews, useViews);
      // 最初版本，只在两个区域挪动
      // 通过使用窗口的id找到对应的innerHtml
      for (let i = 0; i < useViews.length; i++) {
        for (let j = 0; j < allViews.length; j++) {
          if (allViews[j].id == useViews[i].id) {
            useViews[i].innerHtml = allViews[j].innerHtml;
          }
        }
      }
      let arr1 = [];
      let arr2 = [];
      for (let k = 0; k < useViews.length; k++) {
        // 父元素是p1
        if (useViews[k].parentid == "p1") {
          arr1.push(useViews[k]);
        } else if (useViews[k].parentid == "p2") {
          arr2.push(useViews[k]);
        }
      }
      let newArray1 = (arr1.length > 1) ? arr1.sort(this.compareByIndex) : arr1;
      let newArray2 = (arr2.length > 1) ? arr2.sort(this.compareByIndex) : arr2;
      console.log("lxw 排序后的数组", newArray1, newArray2);
      let _innerHtml = '';
      if (newArray1.length > 0) {
        for (let j = 0; j < newArray1.length; j++) {
          _innerHtml += newArray1[j].innerHtml;
        }
      }
      document.getElementById("p1").getElementsByClassName("item_content")[0].innerHTML = _innerHtml;

      let _innerHtml2 = '';
      if (newArray2.length > 0) {
        for (let j = 0; j < newArray2.length; j++) {
          _innerHtml2 += newArray2[j].innerHtml;
        }
      }
      document.getElementById("p2").getElementsByClassName("item_content")[0].innerHTML = _innerHtml2;
    },
    registerMoveEvents () {
      let leftDom = document.querySelector('.border_left');
      let rightDom = document.querySelector('.border_right');
      let topDom = document.querySelector('.border_top');
      let bottomDom = document.querySelector('.border_bottom');

      // 左边线的拖动事件
      leftDom.onmousedown = function () {
        console.log("左边线上按下鼠标键");
        // 左边线上按下鼠标键后防止事件冒泡
        var e = window.event;  //接收事件对象
        e.stopPropagation();
        e.preventDefault();
        // 获取鼠标在当前事件源的位置
        var x1 = e.offsetX;
        var y1 = e.offsetY;

        // 绑定移动事件
        document.onmousemove = function () {
          console.log("左边线上按下鼠标键后移动鼠标");
          // 获取鼠标在浏览器中的位置 - 每个事件都有自己独特的事件对象
          var e = window.event;
          var x2 = e.clientX;
          var y2 = e.clientY;

          // 计算left和top
          var l = x2 - x1;
          var t = y2 - y1;

          // 设置不能超出左上角和右上角
          if (l < 0) {
            l = 0;
          }
          if (t < 0) {
            t = 0;
          }
          // 设置left和top的最大值 不能超过事件源本身
          if (t > document.documentElement.clientHeight - leftDom.offsetHeight) {
            t = document.documentElement.clientHeight - leftDom.offsetHeight;
          }
          if (l > document.documentElement.clientWidth - leftDom.offsetWidth) {
            l = document.documentElement.clientWidth - leftDom.offsetWidth;
          }
          // 设置div的left和top
          leftDom.style.left = l + 'px';
          leftDom.style.top = t + 'px';
        }
      }
      // 右边线的拖动事件
      rightDom.onmousedown = function () {
        // 右边线上按下鼠标键后防止事件冒泡
        var e = window.event;  //接收事件对象
        e.stopPropagation();
        e.preventDefault();
        // 获取鼠标在当前事件源的位置
        var x1 = e.offsetX;
        var y1 = e.offsetY;

        // 绑定移动事件
        document.onmousemove = function () {
          // 获取鼠标在浏览器中的位置 - 每个事件都有自己独特的事件对象
          var e = window.event;
          var x2 = e.clientX;
          var y2 = e.clientY;

          // 计算left和top
          var l = x2 - x1;
          var t = y2 - y1;

          // 设置不能超出左上角和右上角
          if (l < 0) {
            l = 0;
          }
          if (t < 0) {
            t = 0;
          }
          // 设置left和top的最大值 不能超过事件源本身
          if (t > document.documentElement.clientHeight - rightDom.offsetHeight) {
            t = document.documentElement.clientHeight - rightDom.offsetHeight;
          }
          if (l > document.documentElement.clientWidth - rightDom.offsetWidth) {
            l = document.documentElement.clientWidth - rightDom.offsetWidth;
          }
          // 设置div的left和top
          rightDom.style.left = l + 'px';
          rightDom.style.top = t + 'px';
        }
      }
      // 上边线的拖动事件
      topDom.onmousedown = function () {
        // 上边线上按下鼠标键后防止事件冒泡
        var e = window.event;  //接收事件对象
        e.stopPropagation();
        e.preventDefault();
        // 获取鼠标在当前事件源的位置
        var x1 = e.offsetX;
        var y1 = e.offsetY;

        // 绑定移动事件
        document.onmousemove = function () {
          // 获取鼠标在浏览器中的位置 - 每个事件都有自己独特的事件对象
          var e = window.event;
          var x2 = e.clientX;
          var y2 = e.clientY;

          // 计算left和top
          var l = x2 - x1;
          var t = y2 - y1;

          // 设置不能超出左上角和右上角
          if (l < 0) {
            l = 0;
          }
          if (t < 0) {
            t = 0;
          }
          // 设置left和top的最大值 不能超过事件源本身
          if (t > document.documentElement.clientHeight - topDom.offsetHeight) {
            t = document.documentElement.clientHeight - topDom.offsetHeight;
          }
          if (l > document.documentElement.clientWidth - topDom.offsetWidth) {
            l = document.documentElement.clientWidth - topDom.offsetWidth;
          }
          // 设置div的left和top
          topDom.style.left = l + 'px';
          topDom.style.top = t + 'px';
        }
      }
      // 下边线的拖动事件
      bottomDom.onmousedown = function () {
        // 下边线上按下鼠标键后防止事件冒泡
        var e = window.event;  //接收事件对象
        e.stopPropagation();
        e.preventDefault();
        // 获取鼠标在当前事件源的位置
        var x1 = e.offsetX;
        var y1 = e.offsetY;

        // 绑定移动事件
        document.onmousemove = function () {
          // 获取鼠标在浏览器中的位置 - 每个事件都有自己独特的事件对象
          var e = window.event;
          var x2 = e.clientX
          var y2 = e.clientY

          // 计算left和top
          var l = x2 - x1
          var t = y2 - y1

          // 设置不能超出左上角和右上角
          if (l < 0) {
            l = 0
          }
          if (t < 0) {
            t = 0
          }
          // 设置left和top的最大值 不能超过事件源本身
          if (t > document.documentElement.clientHeight - bottomDom.offsetHeight) {
            t = document.documentElement.clientHeight - bottomDom.offsetHeight
          }
          if (l > document.documentElement.clientWidth - bottomDom.offsetWidth) {
            l = document.documentElement.clientWidth - bottomDom.offsetWidth
          }
          // 设置div的left和top
          bottomDom.style.left = l + 'px'
          bottomDom.style.top = t + 'px'
        }
      }
      // 拖拽行为一定要记得解绑mousemove事件
      window.onmouseup = function () {
        document.onmousemove = null;
      }
    },
    allowDrop (ev) {
      // console.log("lxw allowDrop----", ev.y);
      ev.stopPropagation();
      ev.preventDefault();
    },
    dragStart (ev) {
      console.log("lxw firstDragStart----", ev.target.className);
      ev.stopPropagation();
      ev.dataTransfer.setData("Text", ev.target.id);
      this.curDragClass = ev.target.className;
    },
    outerDragEnd (ev) {
      console.log("lxw outerDragEnd----", ev);

    },
    innerDragEnd (ev) {
      console.log("lxw innerDragEnd----", ev);
    },
    // 外层的拖放
    outerDrop (ev) {
      ev.preventDefault();
      console.log("lxw outerDrop---- 鼠标在的高度", ev.y, ev.target.className);
      if (this.curDragClass == "drag_items_one") {
        console.log("lxw 外层的拖放");
        var data = ev.dataTransfer.getData("Text");
        let boxScrollTop = document.getElementById("content").scrollTop;
        let childLength = $("#content").find(".drag_items_one").length;
        let insetIndex = -1;
        if (childLength > 0) {
          for (let i = 0; i < childLength; i++) {
            let itemTop = $("#content").find(".drag_items_one").eq(i)[0].offsetTop;
            console.log("lxw ", i, boxScrollTop, ev.y, itemTop);
            if (itemTop > ev.y + boxScrollTop) {
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
      }
    },
    // 内层的拖放
    innerDrop (ev) {
      ev.preventDefault();
      console.log("lxw innerDrop---- 鼠标在的高度", this.curDragClass, ev.target.className.indexOf('drop_area_two'));
      if (this.curDragClass == "drag_items_one") {
        // 外层的拖+内层的放，不响应；
        return
      }
      ev.stopPropagation();
      let targetId = '';
      if (ev.target.className.indexOf('drop_area_two') != -1) {
        // 如果放置的位置是span.border-grey元素
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
      console.log("lxw targetId=", targetId);

      var data = ev.dataTransfer.getData("Text");
      // document.getElementById(targetId).appendChild(document.getElementById(data));
      // $("#" + targetId).append(document.getElementById(data));

      let boxScrollTop = document.getElementById(targetId).scrollTop;
      let childLength = $("#" + targetId).find(".drag_items_two").length;
      let insetIndex = -1;
      if (childLength > 0) {
        for (let i = 0; i < childLength; i++) {
          let itemTop = $("#" + targetId).find(".drag_items_two").eq(i)[0].offsetTop;
          console.log("lxw ", i, boxScrollTop, ev.y, itemTop);
          if (itemTop > ev.y + boxScrollTop) {
            insetIndex = i;
            break;
          }
        }
      }
      console.log("lxw 需要插入的位置", insetIndex);
      if (insetIndex == -1) {
        // 没找到满足条件的，添加到父元素最后面
        $("#" + targetId).find(".item_content")[0].append(document.getElementById(data));
      } else if (insetIndex == 0) {
        // 添加到父元素最前面
        $("#" + targetId).find(".drag_items_two").eq(0)[0].before(document.getElementById(data));
      } else {
        // 添加到指定元素后面
        $("#" + targetId).find(".drag_items_two").eq(insetIndex - 1)[0].after(document.getElementById(data));
      }
      // 在父级最后面追加一个子元素
      // $("#wrap").append("<p class='three'>我是子元素append</p>");
      // 在父级最前面追加一个子元素
      // $("#wrap").prepend("<p class='three'>我是子元素prepend</p>");
      // 在当前元素之后追加
      // $("#wrap").after("<p class='siblings'>我是同级元素after</p>");
      // 在当前元素之前追加（是同级关系）
      // $("#wrap").before("<p class='siblings'>我是同级元素before</p>");
    },
    // 对象数组排序
    compareByIndex (a, b) {
      // 使用 toUpperCase() 忽略字符大小写
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
    width: 360px;
    height: 500px;
    border: 1px solid black;
    display: inline-block;
    overflow: auto;
  }
  ::v-deep .drag_items_two {
    width: 300px;
    height: 180px;
    line-height: 180px;
    font-size: 64px;
    background-color: red;
    margin: 10px;
  }
  #centerArea {
    position: relative;
    width: 360px;
    height: 500px;
    border: 1px solid black;
    display: inline-block;
    overflow: auto;
  }
  ::v-deep .drag_items_one {
    position: relative;
    display: inline-block;
    border: 1px solid red;
    width: 1220px;
    margin: 10px 0px;
  }
  ::v-deep #area2 {
    height: 300px;
  }
  .border_top,
  .border_bottom {
    position: absolute;
    display: inline-block;
    background-color: rgba(255, 255, 255, 1);
    left: 0;
    height: 2px;
    width: 100%;
  }
  .border_left,
  .border_right {
    position: absolute;
    display: inline-block;
    background-color: rgba(255, 255, 255, 1);
    top: 0;
    width: 2px;
    height: 100%;
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
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  }
</style>