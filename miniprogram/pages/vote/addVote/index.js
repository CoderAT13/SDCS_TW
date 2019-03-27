// miniprogram/pages/vote/addVote/index.js
import { $wuxDialog, $wuxToast } from '../../../components/dist/index'

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
    buttons: [
      {
        openType: 'add',
        label: 'Add',
        icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/plus-square.png?sign=555220985eb0a7db25d9f0f0e0030906&t=1553157054',
      },
      {
        openType: 'ok',
        label: 'OK',
        icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/check-circle.svg?sign=2cc731149c5966a8e48a93d445de8c36&t=1553185150',
      },
      {
        openType: 'back',
        label: 'Back',
        icon: 'https://7375-suprise-for-life-afda2f-1258247386.tcb.qcloud.la/icons/left-circle.svg?sign=fd3db4fb35148d859be769bdfbc2d026&t=1553185174',
      },
      
    ],
    voteMember: [
      //{ name: "CoderAt" },
      //{ name: "MioMio" },
      //{ name: "WK" },
      //{ name: "Ender" },
      //{ name: "石油" }
    ],
    IR: [0],
    visible: false,
    inputValue: "",
    canGiveUp: true,
    max: 0,
    min: 0,
    title: "",
    mask: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onChange: function (){

  },

  onClick: function (e){
    console.log(e.detail.value.openType);
    const tmp = this;
    switch (e.detail.value.openType) {
      case 'back':
        wx.navigateBack({
          delta: 1
        })
        break;
      case 'add':
        this.setData({
          visible: true,
          IR: [0]
        })
        break;
      case 'ok':
        if (this.data.title.length == 0){
          $wuxToast().show({
            type: 'cancel',
            duration: 1500,
            color: '#fff',
            text: '标题为空',
            success: () => console.log('failed')
          })
          break;
        }
        if (this.data.min > this.data.voteMember.length ||
          this.data.min > this.data.max){
          $wuxToast().show({
            type: 'cancel',
            duration: 1500,
            color: '#fff',
            text: '最少投票错误',
            success: () => console.log('failed')
          })
          break;
        }
        if (this.data.max == 0){
          $wuxToast().show({
            type: 'cancel',
            duration: 1500,
            color: '#fff',
            text: '最大投票错误',
            success: () => console.log('failed')
          })
          break;
        }
        this.setData({
          mask: true
        })
        const votes = [];
        for (let i = 0; i <= this.data.voteMember.length; i++){
          votes.push(0);
        }
        let voteGroup = tmp.data.voteMember;
        voteGroup.push({name:"弃权"});
        db.collection("Vote-System").add({
          data: {
            Title: tmp.data.title,
            Min: tmp.data.min,
            Max: tmp.data.max,
            Objects: voteGroup,
            CanGiveUp: tmp.data.canGiveUp,
            Votes: votes,
            Open: false,
            End: false,
            Total: 0,
            VoteList: []
          },
          success: function(){
            $wuxToast().show({
              type: 'success',
              duration: 1000,
              color: '#fff',
              text: '创建投票成功',
              success: () => wx.navigateBack({
                delta: 1
              })
            })
          },
          fail: ()=>{
            $wuxToast().show({
              type: 'cancel',
              duration: 1000,
              color: '#fff',
              text: '网路出错',
              success: () => tmp.setData({
                mask: false
              })
            })
          }
          
        })
        
    }
  },

  handleDelete: function (e){
    //console.log(e.currentTarget.dataset.id);
    var tmp = this.data.voteMember;
    tmp.splice(e.currentTarget.dataset.id,1);
    console.log(tmp);
    this.setData({
      voteMember: tmp
    })
  },

  handleName: function (e){
    var tmp = this.data.voteMember;
    tmp[e.currentTarget.dataset.id].name = e.detail.value;
    this.setData({
      voteMember: tmp
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value//将input至与data中的inputValue绑定
    })
  },

  closePopup: function (){
    this.setData({
      visible: false,
      inputValue: "",
      IR: []
    })
  },

  addOK: function(){
    let tmp = this.data.voteMember;
    tmp.push({name:this.data.inputValue});
    this.setData({
      voteMember: tmp,
      visible: false,
      inputValue: "",
      IR: []
    })
    wx.showToast({
      title: '添加成功',
    })
  },

  handleGiveUp: function () {
    const giveup = !this.data.canGiveUp;
    this.setData({
      canGiveUp: giveup
    })
  },

  handleChange: function (e) {
    const seg = e.currentTarget.dataset.id;
    this.data[seg] = e.detail.value;
    //console.log(this.data);
  }

})