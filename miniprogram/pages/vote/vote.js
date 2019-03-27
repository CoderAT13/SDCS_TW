// miniprogram/pages/vote/vote.js
import { $wuxToast } from '../../components/dist/index'
import { $wuxDialog } from '../../components/dist/index'
const app = getApp();
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();
const _ = db.command;
const buttons = [
  {
    openType: 'refresh',
    label: 'Refresh',
    icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/reload.svg?sign=e8ca618b83fa9f972ff1cb4473143cba&t=1553682953',
  },
  {
    openType: 'set',
    label: 'Set',
    icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/edit-square.png?sign=7fe05e90dc55ad3049c247379563189c&t=1553157024',
  },

  {
    openType: 'add',
    label: 'Add',
    icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/plus-square.png?sign=555220985eb0a7db25d9f0f0e0030906&t=1553157054',
  },
  
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    buttons,
    Votes: [],
    mask: false,
    visible: false,
    inputValue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tmp = this;
    wx.showLoading({
      title: '',
    })
    db.collection("Vote-System").where({
      Open: true
    }).get({
      success: function(res){
        tmp.setData({
          Votes: res.data,
          mask: false
        })
        wx.hideLoading();
      },
      fail: ()=>{
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          mask: true,
          color: '#fff',
          text: '网络错误',
          success: () => console.log('取消操作')
        })
        tmp.setData({mask: false});
      }
    })
    //this.Notice.show();
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
    let tmp = this;
    wx.showLoading({
      title: '',
      mask: true
    })
    db.collection("Vote-System").where({
      Open: true
    }).get({
      success: function (res) {
        tmp.setData({
          Votes: res.data,
        })
        wx.hideLoading();
      },
      fail: () => {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          mask: true,
          color: '#fff',
          text: '网络错误',
          success: () => console.log('取消操作')
        })
        wx.hideLoading();
      }
    })
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
    wx.startPullDownRefresh();
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

  onChange: function (e){
    console.log(e);
  },

  /**
   * 浮动按钮选项
   */
  onClick: function (e){
    console.log(e.detail.value.openType);
    switch (e.detail.value.openType){
      case 'add':
        wx.navigateTo({
          url: './addVote/index',
        })
        break;
      case 'set':
        wx.navigateTo({
          url: './setVote/index',
        })
        break;  
      case 'refresh':
        let tmp = this;
        wx.showLoading({
          title: '',
          mask: true
        })
        db.collection("Vote-System").where({
          Open: true
        }).get({
          success: function (res) {
            tmp.setData({
              Votes: res.data,
            })
            wx.hideLoading();
          },
          fail: () => {
            $wuxToast().show({
              type: 'cancel',
              duration: 1500,
              mask: true,
              color: '#fff',
              text: '网络错误',
              success: () => console.log('取消操作')
            })
            wx.hideLoading();
          }
        })
        break;

    }
  },

  /** 
   * 进入投票的选项
   */
  enterVote: function(e){
    console.log(e.currentTarget.dataset);
    wx.setStorageSync("Voting", e.currentTarget.dataset.vote);
    const _openid = wx.getStorageSync("_openid");
    if (e.currentTarget.dataset.vote.VoteList.indexOf(_openid) == -1 && 
      !e.currentTarget.dataset.vote.End){
      wx.navigateTo({
        url: './doVote/index',
      })
    }else{
      wx.navigateTo({
        url: './viewResult/index',
      })
    }
    
  },

  search: function() {
    this.setData({
      visible: true
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value//将input至与data中的inputValue绑定
    })
  },

  searchClose: function() {
    this.setData({
      visible: false
    })
  },

  doSearch: function() {
    this.setData({
      visible: false
    });
    let tmp = this;
    wx.showLoading({
      title: '',
      mask: true
    })
    db.collection("Vote-System").where({
      Open: true,
      Title: tmp.data.inputValue
    }).get({
      success: function (res) {
        tmp.setData({
          Votes: res.data,
        })
        wx.hideLoading();
      },
      fail: () => {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          mask: true,
          color: '#fff',
          text: '网络错误',
          success: () => console.log('取消操作')
        })
        wx.hideLoading();
      }
    })
  }

})