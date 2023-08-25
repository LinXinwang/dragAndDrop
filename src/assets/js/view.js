let allViews = [{
    "name": "窗口一",
    "id": "view_1",
    "innerHtml": '<div class="view_border_top"></div><span>2_1</span><div class="view_border_bottom"></div>',
  },
  {
    "name": "窗口二",
    "id": "view_2",
    "innerHtml": '<div class="view_border_top"></div><span>2_2</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口三",
    "id": "view_3",
    "innerHtml": '<div class="view_border_top"></div><span>2_3</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口四",
    "id": "view_4",
    "innerHtml": '<div class="view_border_top"></div><span>2_4</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口五",
    "id": "view_5",
    "innerHtml": '<div class="view_border_top"></div><span>2_5</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口六",
    "id": "view_6",
    "innerHtml": '<div class="view_border_top"></div><span>2_6</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口七",
    "id": "view_7",
    "innerHtml": '<div class="view_border_top"></div><span>2_7</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口八",
    "id": "view_8",
    "innerHtml": '<div class="view_border_top"></div><span>2_8</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口九",
    "id": "view_9",
    "innerHtml": '<div class="view_border_top"></div><span>2_9</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口十",
    "id": "view_10",
    "innerHtml": '<div class="view_border_top"></div><span>2_10</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口十一",
    "id": "view_11",
    "innerHtml": '<div class="view_border_top"></div><span>2_11</span><div class="view_border_bottom"></div>'
  }, {
    "name": "窗口十二",
    "id": "view_12",
    "innerHtml": '<div class="view_border_top"></div><span>2_12</span><div class="view_border_bottom"></div>'
  }
]

let useViews = [{
  "id": "view_1",
  "parentid": "p1",
  "index": 0,
}, {
  "id": "view_2",
  "parentid": "p1",
  "index": 1,
}, {
  "id": "view_3",
  "parentid": "p1",
  "index": 2,
}, {
  "id": "view_4",
  "parentid": "p1",
  "index": 3,
}, {
  "id": "view_5",
  "parentid": "p1",
  "index": 4,
}, {
  "id": "view_6",
  "parentid": "p2",
  "index": 5,
}, {
  "id": "view_7",
  "parentid": "area2",
  "index": 6,
}] // 当前使用的窗口数据,后台存储

let viewStyle = {
  maxHeight_1: 600, // 容器一可调节的最大高度
  minHeight_1: 300, // 容器一可调节的最小高度
  maxHeight_2: 600, // 容器二可调节的最大高度
  minHeight_2: 300, // 容器二可调节的最小高度
  maxWidth_1: 500, // 子容器一可调节的最大宽度
  minWidth_1: 100, // 子容器一可调节的最小宽度
  maxWidth_2: 500, // 子容器二可调节的最大宽度
  minWidth_2: 100, // 子容器二可调节的最小宽度
  maxWidth_3: 500, // 子容器三可调节的最大宽度
  minWidth_3: 100, // 子容器三可调节的最小宽度
}
export {
  allViews,
  useViews,
  viewStyle
}