'use strict';

/**
 * event
 * @description 封装event
 * @author mack wang
 * @website yurencloud.com
 */


var event = {
    /*
    * 添加事件
    * @param element {Dom} 绑定事件的元素
    * @param type {String} 事件类型 不加on
    * @param fn {Function} 回调函数
    * */
    addEvent: function (element, type, fn) {
        if (element.addEventListener) {
            element.addEventListener(type, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, fn);
        } else {
            element["on" + type] = fn;
        }
    },

    /*
    * 触发事件
    * @param element {Dom} 绑定事件的元素
    * @param type {String} 事件类型 不加on
    * @param options {Object} 传递参数
    * */
    triggerEvent: function (element, type, options) {
        var event;
        if (window.CustomEvent) {
            event = new CustomEvent(type, options);
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, options);
        }
        element.dispatchEvent(event);
    },

    /*
     * 获取事件对象
     * @param event {Object} 事件对象
     * @return event {Object} 事件对象
     * */
    getEvent: function (event) {
        return event ? event : window.event;
    },

    /*
     * 获取当前发生事件的目标元素（兼容IE）
     * @param event {Object}事件对象
     * @return element {Dom} 当前发生事件的目标元素
     * */
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    /*
     * 取消默认事件
     * @param event {Object} 事件对象
     * */
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /*
     * 移除事件
     * @param element {Object}要移除事件的元素
     * @param type {String} 要移除事件类型 不加on
     * @param fn {Function} 要移除的回调函数
     * */
    removeEvent: function (element, type, fn) {
        if (element.removeEventListener) {
            element.removeEventListener(type, fn, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, fn);
        } else {
            element["on" + type] = null;
        }
    },

    /*
     * 停止事件冒泡
     * @param event {Object} 事件对象
     * */
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /*
     * 获取上一级冒泡对象
     * @param event {Object} 事件对象
     * @param fromElement {Dom} 上一级冒泡对象
     * */
    getRelatedTarget: function (event) {
        if (event.relateTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

    /*
     * 主要兼容IE对DOM的button属性的反馈，button属性是指鼠标按钮，左，中，右三个键的点击情况
     * @param event {Object}事件对象
     * @return button {Integer} ，代表意义 0左键，1中键，2右键
     * */
    getMouseButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;

            }
        }
    },

    /*
     * 跨浏览器的鼠标滚轮事件
     * @param event {Object} 事件对象
     * @return wheelDelta {Object}，包含具体滚动数值
     * */
    getWheelDelta: function (event) {
        //主要判断是否支持wheelDelta,
        //不支持就是firefox，要乘以40，支持就判断opera的版本，小于9.5的要正负颠倒一下
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },

    /*
     * 当发生keypress事件时，返回charCode的兼容用法
     * @param event {Object} 事件对象
     * @return charCode|keyCode {Integer|Object} 返回charCode或者keyCode属性及值
     * */
    getCharCode: function (event) {
        if (typeof event.charCode === "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    /*
     * 获取剪贴板文字
     * @param event {Object} 事件对象
     * @return clipboardText {String} 剪贴板文字
     * */
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    /*
     * 设置剪贴板文字（由我们写入剪贴板）
     * @param event {Object} 事件对象
     * @return clipboardText {String} 设置后的剪贴板文字
     * */
    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text", value);
        }
    },

    /*
     * 获取鼠标相对文档的坐标（而非浏览器窗口）
     * @param event {Object} 事件对象
     * @return xy {Object} 坐标对象，包含x，y属性
     * */
    getPointer: function (event) {
        event = event || getEvent(event);
        var x = event.pageX || (event.clientX + (document.documentElement.scrollLeft
            || document.body.scrollLeft));
        var y = event.pageY || (event.clientY + (document.documentElement.scrollTop
            || document.body.scrollTop));
        //返回x,y
        return {'x': x, 'y': y};
    }
};

// 别名
event.on = event.addEvent;
event.trigger = event.triggerEvent;
event.off = event.removeEvent;

module.exports = event;
