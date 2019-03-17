// pages/index/index.js

const app = getApp();
var usr_id = "";
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
    firstIn: true,
    showPlus: true,
    state: true,
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
    this.dialog = this.selectComponent('#dialog');
    
    var tmp = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      success: function (res) {
        console.log(res.result) // 3
        usr_id = res.result.openid;
        console.log(usr_id);
        // 跨域传值用Storage
        wx.setStorage({
          key: "_openid",
          data: usr_id
        })
        //看是否存在账号
        db.collection("userInfo").where({
          _openid: res.result.openid
        }).get({
          success: function(res){
            console.log(res)
            if(res.data.length == 0){
              tmp.dialog.show();
            }
            else{
              wx.setStorage({
                key: "userInfo",
                data: res.data[0]
              })
            }
          },
        })
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

    if (this.data.state) {
      //console.log(this.data.state);
      setTimeout(function () {
        this.setData({
          state: false
        });
      }.bind(this), 500)
    }
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
    var tmp = this;
    var DTasks;

    const db = wx.cloud.database();
    const _ = db.command;
    console.log(tmp.data.adminOpenId);
    
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: '#35A7C4',
      animation: {
        duration: 250,
        timingFunc: 'easeIn'
      }
    })
    if(!this.data.firstIn){
      this.plusAni = wx.createAnimation({
        duration: 250,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: '50% 50% 0'
      })
      this.setData({ showPlus: true });
      this.plusAni.scale(1, 1).step();
      this.setData({ plusAni: this.plusAni.export() })
    }
    //新增 begin
    this.cardAni = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.cardAni.translate(0, 20).step();
    this.setData({ cardAni: this.cardAni.export() });
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

  okEvent: function () {
    //this.dialog.close();
    const tmp = this;
    const dialog = this.dialog;
    const pack = this.dialog.onOk();
    if (pack === false){
      wx.showToast({
        title: '请选择专业、年级',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '请确认信息的正确性\r\n确认后姓名、学号无法修改',
      showCancel: true,
      success: function (res){
        if (res.confirm){
          db.collection("userInfo").add({
            data: pack,
            success: () => {
              console.log("success");
              wx.showToast({
                title: '提交成功',
              })
              dialog.close();
            }
            
          })
        }
      }
    })
    
    
  },

  navigate_to_vote: function() {
    wx.navigateTo({
      url: '/pages/vote/vote',
    })
  }
})