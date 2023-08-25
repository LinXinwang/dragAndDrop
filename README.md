# draggen

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### 项目简述
```
  1、该Demo实现多个独立功能单元在不同区域的拖放功能
  2、该Demo实现多个独立功能单元在同一区域的拖拽排序功能
  3、后续支持动态添加独立功能模块，待完善
```
### 注意事项

```
  1、全局变量动var定义，方法块内的变量用let定义；
  2、全局变量支持驼峰命名，eg：var allViewData（所有视图数据）；
  3、方法传参一律以对象的形式传参，增强方法的可拓展性，eg：function a(obj){}; obj={a:1,b:1}
  4、容器拖拽的时候会受到子元素的拖放属性的干扰，这里可尝试在事件冒泡上做文章
```

### 当前版本任务（已完成）

```
  1、实现不同区域之间来回拖放元素的基础功能并输出demo（8h） 林心旺
  2、拖放支持指定区域拖拽排序（4h） 林心旺
  3、实现多层级拖放功能（12h）林心旺
  4、实现元素横向拉升后的界面自适应与相应数据存储（8h）林心旺
      可拉伸对象动态绑定宽高？
```

### 下一版本任务（待进行）

```
  实现菜单罗列所有窗口，页面加载时智能分配窗口
  
```
