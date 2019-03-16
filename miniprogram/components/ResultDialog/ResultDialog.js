// components/Dialog/dialog.js

function getRandomColor() {
  let color = '#';
  let string = '0123456789abcdef';
  for (let i = 0; i < 6; i++){
    color += string[Math.floor(Math.random() * 16)];
  }
  return color;
} 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    note: {
      type: String,
      value: ''
    },
    array: {
      type: Array,
      value: []
    }
  },
  data: {
    isShow: false,
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
        isShow: true,
      })
      console.log(this.data);
    },
    close: function () {
      this.setData({
        isShow: false
      })
    },
    onOk() {
      try {
        const responseJSON = {
          Name: this.data.name,
          Sid: this.data.sid,
          Major: this.data.array[this.data.index],
          Grade: this.data.grade[this.data.grade_index]
        };
        this.close();
        return responseJSON;
      } catch (e) {
        console.log(e);
      }
    },
    _cancelEvent: function () {
      this.triggerEvent('cancelEvent');
    },
    _okEvent: function () {
      this.triggerEvent('okEvent');
    }
  }
})
