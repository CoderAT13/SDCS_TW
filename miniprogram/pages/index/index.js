// pages/index/index.js

const app = getApp();
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
let userID;
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminOpenId: 'oLa764gw9AKVXkVEGV3qPZFEMtWk',
    mask: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 跳转到个人主页
   */
  toUserIndex: function(){
    wx.navigateTo({
      url: '../userIndex/userIndex'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var tmp = this;
    wx.showLoading({
      title: '',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'login',
      success: function (res) {
        console.log(res.result.openid);
        wx.setStorageSync("_openid", res.result.openid);
        wx.hideLoading();
      },
      fail: console.error
    }),
    


      //这里是获取头像、openid、昵称用的
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  hasUserInfo: true,
                })

                //console.log(this.data.avatarUrl);
                //console.log(res)
              },
              fail: res => {
                console.log("failed")
              }
            })
          }
          else console.log("failed")
        },
        fail: res => {
          console.log("failed")
        }
      })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //新增 begin
    
    //新增 end
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
 * 获取用户头像昵称信息
 */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },

  navigate: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  showInfo: ()=>{
    wx.showModal({
      title: '版本信息',
      content: 'V1.1.0\r\nCoderAt\r\nCHIMO\r\n\r\nWelcome To Join Us!',
      showCancel: false
    })
  }
})