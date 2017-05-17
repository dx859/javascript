##  vertical-align家族的基本认识

了解vertical-align支持的属性值以及组成

-   线类  
    baseline(默认), top, middle, bottom

-   文本类  
    text-top, text-bottom

-   上标下标类  
    sub, super

-   数值百分比类  
    20px, 2em, 20% (可以为负值)

    vertial-align百分比值是相对于line-height计算的
    注意：IE6/IE7下vertical-align不支持小数点行高

##  vertical-align起作用的前提

inline, inline-block and table-cell 三种类型元素

默认状态下：支持img, text, td, input 元素

元素一用浮动或者position:absolute，就会变成block

table-cell只作用于自身
```css
<p><img src="img.jpg" alt=""></p>

p { display: table-cell; vertical-align: middle }
```

exp: [图片文字垂直居中](./demo1.html)

##  vertical-aling 与 line-height

设置图片近似垂直居中
vertical-align: middle; line-height: 300px(内部行高等于容器的高度);

exp: [图片justify对齐方式](./demo2.html)
```
父容器：line-height: 0;
占位容器：vertical-align: top;
```

exp: [两个容器，一个为空，一个有内容的神奇现象](./demo3.html)
    
原因：空容器默认底边为基线，有文字的元素默认为文字底边为极限。由于基线对齐所以出现不同样式。

exp: [设置图片完全垂直居中](./demo4.html)
```
父元素: line-height: 父级的高度; font-size: 0
子元素: vertical-align: middle
```

##  vertical-align文本属性值

-   vertical-align: text-top
    
    盒子的顶部和父级content area的顶部对齐。

-   vertical-align: text-bottom

    盒子的底部和父级content area的底部对齐。

-   实际作用＝>表情图片（或者原始尺寸背景图标）与文字的对齐效果
    - 使用基线的问题在于图标边上
    - 使用顶线/底线的问题在于受其他内联元素影响，造成巨大定位偏差。
    - 使用中线也是不错的选择，但是需要恰好的字体大小与兼容性要求不高。
    - 使用文本底部比较合适，不受行高及其他内联元素的影响。


##  vertical-align上标下标类

-   vertical-align: super -> `<sup>`

    提高盒子的基线到父级合适的上标基线位置

-   vertical-align: sub -> `<sub>`

    降低盒子的基线到父级合适的上标基线位置

##  相邻元素不同vertical-align的行为表现
    
vertical-align: top/bottom 是相对于父级整个内联元素的对齐

vertical-align: text-top/text-bottom 盒子与与父级的content-area对齐

##  vertical-align实际应用
    
-   小图标与文字对齐：vertical-align负值

    `img { vertical-align: -10px; }`
    
-   不定尺寸图片或多行文字的垂直居中
    
    - 主体元素inline-block
    - 0宽度100%高度辅助元素
    - vertical-align: middle;

    ```css
    <p style="height:200px;"><img src=""><i></i></p>

    img { vertical-align: middle; }
    i { display: inline-block; height: 100%; vertical-align: middle; }
    ```






