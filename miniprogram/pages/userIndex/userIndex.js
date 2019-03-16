//index.js
//获取应用实例
const app = getApp()
var user_id = "";
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Sid: "",
    Name: "",
    Major: "",
    Grade: "",
    is_sudo: false,
    Etw: true,
    NEtw: true,
    Stu: true
  },
  //事件处理函数
  onLoad: function () {
    var tmp = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        //console.log("user_id",res);
        tmp.setData({
          Sid: res.data.Sid,
          Grade: res.data.Grade,
          Name: res.data.Name,
          Major: res.data.Major,
          is_sudo: res.data.Admin
        })
      },
    })
    //这里是获取头像、openid、昵称用的
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
              })

              //console.log(this.data.avatarUrl);
              console.log(res)
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
    db.collection('System').doc('vote_system').get({
      success: function(e){
        console.log(e);
        tmp.setData({
          Etw: e.data.Etw,
          NEtw: e.data.NEtw,
          Stu: e.data.Stu
        })
      }
    })
  },
  /**
   * 跳转到管理员页面
   */
  

  onShow: function () {
    //新增 begin
    this.topBarAni1 = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni1.translate(0, 100).step();
    this.setData({ topBarAni1: this.topBarAni1.export() });
    this.topBarAni2 = wx.createAnimation({
      duration: 3000,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni2.translate(0, 100).step();
    this.setData({ topBarAni2: this.topBarAni2.export() });
    this.topBarAni3 = wx.createAnimation({
      duration: 3500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni3.translate(0, 50).step();
    this.setData({ topBarAni3: this.topBarAni3.export() });
    this.topBarAni4 = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni4.translate(0, 50).opacity(1).step();
    this.setData({ topBarAni4: this.topBarAni4.export() });
    //新增 end
  },
  
  handleEtw: function(e) {
    db.collection("System").doc("vote_system").update({
      data:{
        Etw: e.detail.value,
      },  
      success: function(k){
        if (e.detail.value){
          wx.showToast({
            title: '开启团委等额',
          })
        }
        else{
          wx.showToast({
            title: '关闭团委等额',
          })
        }
      }
    })
  },

  handleNEtw: function (e) {
    db.collection("System").doc("vote_system").update({
      data: {
        NEtw: e.detail.value,
      },
      success: function (k) {
        if (e.detail.value) {
          wx.showToast({
            title: '开启团委差额',
          })
        }
        else {
          wx.showToast({
            title: '关闭团委差额',
          })
        }
      }
    })
  },

  handleStu: function (e) {
    console.log(e.detail.value);

    db.collection("System").doc("vote_system").update({
      data: {
        Stu: e.detail.value,
      },
      success: function (k) {
        console.log(k);
        if (e.detail.value) {
          wx.showToast({
            title: '开启学生会',
          })
        }
        else {
          wx.showToast({
            title: '关闭学生会',
          })
        }
      },
      fail(e){
        console.log(e);
      }
    })
  },
})
