// miniprogram/pages/vote/vote.js
const app = getApp();
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    msg: ["投票前，请仔细阅读以下事项：","·投票分别用于选举产生中山大学数据科学与计算机学院团委委员和学生会主席团成员，投票人为中山大学数据科学与计算机学院团员代表大会暨学生代表大会代表。","·专职团干团委委员候选人勾选人数应少于等于3人，学生团委委员候选人勾选人数应少于或等于6人；学生会主席团候选人勾选人数应少于或等于5人。","·向候选人外的成员投票，请填写会议材料第43页的纸质选票后，撕下举手交给附近工作人员"],
    Etw: [
      {id: 1, value: '黄玲娟'},
      { id: 2, value: '刘晓' },
      { id: 3, value: '侯雪莹' },
    ],
    NEtw: [
      { id: 0, value: '艾鹤轩'},
      { id: 1, value: '李志信'},
      { id: 2, value: '罗镜泉' },
      { id: 3, value: '王诗游' },
      { id: 4, value: '吴槟' },
      { id: 5, value: '吴宗原' },
      { id: 6, value: '闫静雅' },
      { id: 7, value: '杨欣' },
    ],
    Stu: [
      { id: 0, value: '闵正铖' },
      { id: 1, value: '曹溯' },
      { id: 2, value: '陈扬' },
      { id: 3, value: '刘露' },
      { id: 4, value: '苏禹行' },
      { id: 5, value: '吴子裕' },
    ],
    EtwRes: [
      { id: 0, name: "黄玲娟", value: 0},
      { id: 1, name: "刘晓", value: 0 },
      { id: 2, name: "侯雪莹", value: 0 },
      { id: 3, name: "弃权", value: 0},
      { id: 4, name: "总投票人数", value: 0}
    ],
    NEtwRes: [
      { id: 0, name: '艾鹤轩', value: 0 },
      { id: 1, name: '李志信', value: 0 },
      { id: 2, name: '罗镜泉', value: 0 },
      { id: 3, name: '王诗游', value: 0 },
      { id: 4, name: '吴槟', value: 0 },
      { id: 5, name: '吴宗原', value: 0 },
      { id: 6, name: '闫静雅', value: 0 },
      { id: 7, name: '杨欣', value: 0 },
      { id: 8, name: '弃权', value: 0 },
      { id: 9, name: "总投票人数", value: 0 }
    ],
    StuRes: [
      { id: 0, name: '闵正铖', value: 0 },
      { id: 1, name: '曹溯', value: 0 },
      { id: 2, name: '陈扬', value: 0 },
      { id: 3, name: '刘露', value: 0 },
      { id: 4, name: '苏禹行', value: 0 },
      { id: 5, name: '吴子裕', value: 0 },
      { id: 6, name: '弃权', value: 0 },
      { id: 7, name: "总投票人数", value: 0 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tmp = this;
    this.Notice = this.selectComponent("#Notice");
    this.Etw = this.selectComponent("#Etw");
    this.NEtw = this.selectComponent("#NEtw");
    this.Stu = this.selectComponent("#Stu");
    this.EtwRes = this.selectComponent("#EtwRes");
    this.NEtwRes = this.selectComponent("#NEtwRes");
    this.StuRes = this.selectComponent("#StuRes");
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        tmp.setData({
          userInfo : res.data
        })
      },
    })
    this.Notice.show();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.Etw = this.selectComponent("#Etw");
    this.NEtw = this.selectComponent("#NEtw");
    this.Stu = this.selectComponent("#Stu");
    this.EtwRes = this.selectComponent("#EtwRes");
    this.NEtwRes = this.selectComponent("#NEtwRes");
    this.StuRes = this.selectComponent("#StuRes");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Etw = this.selectComponent("#Etw");
    this.NEtw = this.selectComponent("#NEtw");
    this.Stu = this.selectComponent("#Stu");
    this.EtwRes = this.selectComponent("#EtwRes");
    this.NEtwRes = this.selectComponent("#NEtwRes");
    this.StuRes = this.selectComponent("#StuRes");
    
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

  handle_first: function () {
    console.log("团委委员候选人（等额选举批次）");
    let id = this.data.userInfo._openid;
    let tmp = this;
    let EtwRes = this.data.EtwRes;
    for (let i = 0; i < EtwRes.length; i++){
      EtwRes[i].value = 0;
    }
    if (!this.data.userInfo.Etw){
      db.collection("System").doc("vote_system").get({
        success: function(res){
          if(res.data.Etw){
            tmp.Etw.show();
          }
          else{
            wx.showToast({
              title: '投票未开启',
              icon: 'none',
              
            })
          }
        }
      })
    }
    else{
      db.collection('Etw').where({
        done: true
      }
      ).get({
        success(res) {
          //console.log(res);
          let data = res.data;
          //let count_0 = 0, count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0;
          for (let i = 0; i < data.length; i++){
            if (data[i].GiveUP) EtwRes[3].value++;
            if (data[i].Choose[0]) EtwRes[0].value++;
            if (data[i].Choose[1]) EtwRes[1].value++;
            if (data[i].Choose[2]) EtwRes[2].value++;
          }
          EtwRes[4].value = data.length;
          tmp.setData({
            EtwRes: EtwRes
          })
          tmp.EtwRes.show();
        }
      })
    }   
  },

  handle_second: function () {
    let id = this.data.userInfo._openid;
    let tmp = this;
    let NEtwRes = this.data.NEtwRes;
    for (let i = 0; i < NEtwRes.length; i++) {
      NEtwRes[i].value = 0;
    }
    if (!this.data.userInfo.NEtw) {
      db.collection("System").doc("vote_system").get({
        success: function (res) {
          if (res.data.NEtw) {
            tmp.NEtw.show();
          }
          else {
            wx.showToast({
              title: '投票未开启',
              icon: 'none',
            })
          }
        }
      })
    }
    else {
      db.collection('NEtw').where({
        done: true
      }
      ).get({
        success(res) {
          //console.log(res);
          let data = res.data;
          //let count_0 = 0, count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].GiveUP) NEtwRes[8].value++;
            if (data[i].Choose[0]) NEtwRes[0].value++;
            if (data[i].Choose[1]) NEtwRes[1].value++;
            if (data[i].Choose[2]) NEtwRes[2].value++;
            if (data[i].Choose[3]) NEtwRes[3].value++;
            if (data[i].Choose[4]) NEtwRes[4].value++;
            if (data[i].Choose[5]) NEtwRes[5].value++;
            if (data[i].Choose[6]) NEtwRes[6].value++;
            if (data[i].Choose[7]) NEtwRes[7].value++;
          }
          NEtwRes[9].value = data.length;
          tmp.setData({
            NEtwRes: NEtwRes
          })
          tmp.NEtwRes.show();
        }
      })
    } 
  },

  handle_third: function () {
    console.log("学生会主席团候选人");
    let id = this.data.userInfo._openid;
    let tmp = this;
    let StuRes = this.data.StuRes;
    for (let i = 0; i < StuRes.length; i++) {
      StuRes[i].value = 0;
    }
    if (!this.data.userInfo.Stu) {
      db.collection("System").doc("vote_system").get({
        success: function (res) {
          if (res.data.Stu) {
            tmp.Stu.show();
          }
          else {
            wx.showToast({
              title: '投票未开启',
              icon: 'none',

            })
          }
        }
      })
    }
    else {
      db.collection('Stu').where({
        done: true
      }
      ).get({
        success(res) {
          //console.log(res);
          let data = res.data;
          //let count_0 = 0, count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].GiveUP) StuRes[6].value++;
            if (data[i].Choose[0]) StuRes[0].value++;
            if (data[i].Choose[1]) StuRes[1].value++;
            if (data[i].Choose[2]) StuRes[2].value++;
            if (data[i].Choose[3]) StuRes[3].value++;
            if (data[i].Choose[4]) StuRes[4].value++;
            if (data[i].Choose[5]) StuRes[5].value++;
          }
          StuRes[7].value = data.length;
          tmp.setData({
            StuRes: StuRes
          })
          tmp.StuRes.show();
        }
      })
    } 
  },

  first_ok: function() {
    const tmp = this;
    let res = [true, true, true];
    let Sid = this.data.userInfo.Sid;
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let sid = this.data.userInfo.Sid;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '是否确认投票？',
      showCancel: true,
      success: function(e){
        if(e.confirm){
          userInfo.Etw = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              Etw: true
            },
            success(e) {
            }
          })
          db.collection("Etw").add({
            data: {
              Sid: Sid,
              Choose: res,
              GiveUp: false,
              done: true
            }
          })
          wx.showToast({
            title: '投票成功',
          })
          tmp.Etw.close();
        }
      }
    })
    
  },

  second_ok: function () {
    const tmp = this;
    let iniData = this.NEtw.onOk();
    let Sid = this.data.userInfo.Sid;
    let res = [false, false, false, false, false, false, false, false];
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '是否确认投票？',
      showCancel: true,
      success: function(e){
        if (e.confirm){
          userInfo.NEtw = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              NEtw: true
            },
            success(e) {
            }
          })
          for (let i = 0; i < iniData.length; i++) {
            res[parseInt(iniData[i])] = true;
          }
          db.collection("NEtw").add({
            data: {
              Sid: Sid,
              Choose: res,
              GiveUp: false,
              done: true
            }
          })
          wx.showToast({
            title: '投票成功',
          })
          tmp.NEtw.close();
        }
      }
    })
    
  },

  third_ok: function () {
    const tmp = this;
    let iniData = this.Stu.onOk();
    let Sid = this.data.userInfo.Sid;
    let res = [false, false, false, false, false, false];
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '是否确认投票？',
      showCancel: true,
      success: function (e) {
        if (e.confirm) {
          userInfo.Stu = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              Stu: true
            },
            success(e) {
            }
          })
          for (let i = 0; i < iniData.length; i++) {
            res[parseInt(iniData[i])] = true;
          }
          db.collection("Stu").add({
            data: {
              Sid: Sid,
              Choose: res,
              GiveUp: false,
              done: true
            }
          })
          wx.showToast({
            title: '投票成功',
          })
          tmp.Stu.close();
        }
      }
    })
    
  },

  first_cancel: function () {
    const tmp = this;
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let sid = this.data.userInfo.Sid;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '等额选举为3选3\r\n否则为弃权\r\n是否弃权？',
      showCancel: true,
      success: function (e) {
        if (e.confirm) {
          userInfo.Etw = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              Etw: true
            },
            success(e) {
            }
          })
          db.collection('Etw').add({
            data: {
              GiveUP: true,
              Choose: [false, false, false],
              done: true,
              Sid: sid
            },
            success(e) {
              console.log(e);
            }
          })
          tmp.Etw.close();
          wx.showToast({
            title: '弃权',
          })
        }
      }
    })
    
  },

  second_cancel: function () {
    const tmp = this;
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let sid = this.data.userInfo.Sid;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '差额选举为8选6\r\n是否弃权？',
      showCancel: true,
      success: function (e) {
        if (e.confirm) {
          userInfo.NEtw = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              NEtw: true
            },
            success(e) {
            }
          })
          db.collection('NEtw').add({
            data: {
              GiveUP: true,
              Choose: [false, false, false, false, false, false, false, false],
              done: true,
              Sid: sid
            },
            success(e) {
              console.log(e);
            }
          })
          wx.showToast({
            title: '弃权',
          })
          tmp.NEtw.close();
        }
      }
    })
    
  },

  third_cancel: function () {
    const tmp = this;
    let id = this.data.userInfo._openid;
    let doc_id = this.data.userInfo._id;
    let sid = this.data.userInfo.Sid;
    let userInfo = this.data.userInfo;
    wx.showModal({
      title: 'Notice',
      content: '差额选举为6选5\r\n是否弃权？',
      showCancel: true,
      success: function (e) {
        if (e.confirm) {
          userInfo.Stu = true;
          tmp.setData({
            userInfo: userInfo
          })
          db.collection('userInfo').doc(doc_id).update({
            data: {
              Stu: true
            },
            success(e) {
            }
          })
          db.collection('Stu').add({
            data: {
              GiveUP: true,
              Choose: [false, false, false, false, false, false],
              done: true,
              Sid: sid
            },
            success(e) {
              console.log(e);
            }
          })
          tmp.Stu.close();
          wx.showToast({
            title: '弃权',
          })
        }
      }
    })
    
  },

  noticeOK: function(){
    this.Notice.close();
  }
})