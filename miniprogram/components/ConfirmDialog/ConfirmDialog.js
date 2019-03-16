// components/Dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg:{
      type: Array,
      value: []
    },
    showCancel:{
      type: Boolean,
      value: true
    },
  },

  data: {
    isShow: false,
  },

  methods: {
    lifetimes: {
      attached() {

      },
      detached() {
        // 在组件实例被从页面节点树移除时执行
      },
    },
    show: function () {
      this.setData({
        isShow: true
      })
    },
    close: function () {
      this.setData({
        isShow: false
      })
    },
    onOk() {
      
    },
    _cancelEvent: function (){
      this.triggerEvent('cancelEvent');
    },
    _okEvent: function () {
      this.triggerEvent('okEvent');
    }
  }
})
