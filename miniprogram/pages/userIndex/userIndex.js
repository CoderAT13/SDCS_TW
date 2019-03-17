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
    Stu: true,
    EtwEnd: false,
    NEtwEnd: false,
    StuEnd: false,
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
          Stu: e.data.Stu,
          EtwEnd: e.data.EtwEnd,
          NEtwEnd: e.data.NEtwEnd,
          StuEnd: e.data.StuEnd,
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
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'Etw',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '开启专职团干',
          })
        }
        else {
          wx.showToast({
            title: '关闭专职团干',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  handleNEtw: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'NEtw',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '开启团委差额',
          })
        }
        else {
          wx.showToast({
            title: '关闭团委差额',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  handleStu: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'Stu',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '开启学生会',
          })
        }
        else {
          wx.showToast({
            title: '关闭学生会',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  handleEtwEnd: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'EtwEnd',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '结束投票',
          })
        }
        else {
          wx.showToast({
            title: '取消',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  handleNEtwEnd: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'NEtwEnd',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '结束投票',
          })
        }
        else {
          wx.showToast({
            title: '取消',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },

  handleStuEnd: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    wx.cloud.callFunction({
      name: 'vote_system',
      data: {
        docid: 'vote_system',
        api_name: 'StuEnd',
        api_value: value
      }, success: function (res) {
        console.log(res)
        if (value) {
          wx.showToast({
            title: '结束投票',
          })
        }
        else {
          wx.showToast({
            title: '取消',
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },
})
