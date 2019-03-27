// components/Dialog/BasicDialog/index.js
Component({
  properties: {
    
  },
  data: {
    isShow: false
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
    }
  }
})
