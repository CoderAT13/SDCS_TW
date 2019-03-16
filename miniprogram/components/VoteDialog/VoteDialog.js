// components/Dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    array: {
      type: Array,
      value: []
    },
    note: {
      type: String,
      value: ''
    },
    vote_num: {
      type: Number,
      value: 0
    },
    vote_type: {
      type: String,
      value: ''
    }
  },
  data: {
    isShow: false,
    selected: [],
    enableOK: false
  },

  lifetimes: {
    attached() {
      
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  methods: {
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
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        selected: e.detail.value
      })
      if (e.detail.value.length <= this.data.vote_num){
        if (this.data.vote_type === "Etw"){
          if (e.detail.value.length === this.data.vote_num){
            this.setData({
              enableOK: true
            })
          }
          else{
            this.setData({
              enableOK: false
            })
          }
        }
        else{
          this.setData({
            enableOK: true
          })
        }        
      }else{
        this.setData({
          enableOK: false
        })
      }

    },
    onOk() {
      return this.data.selected;
    },
    _cancelEvent: function () {
      this.triggerEvent('cancelEvent');
    },
    _okEvent: function () {
      this.triggerEvent('okEvent');
    }
  }
})
