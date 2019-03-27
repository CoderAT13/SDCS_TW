//app.js
App({
  globalData:{
    appid: "wx9a3b215c4cff4453",
    secret: 'e0dassdadef2424234209bwqqweqw123ccqwa',
  },
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //this.globalData = {};
  }
})
