// miniprogram/pages/vote/doVote/index.js
import { $wuxToast } from '../../../components/dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Vote: {},
    result: [],
    canVote: true,
    mask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Vote = wx.getStorageSync("Voting");
    this.setData({
      Vote: Vote,
      canVote: Vote.Min == 0,
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

  onChange(field, e) {
    const { value } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const max = this.data.Vote.Max;
    const min = this.data.Vote.Min;
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value);
    const canVote = (current.length <= max && current.length >= min);
    this.setData({
      [field]: current,
      canVote: canVote
    })
    
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  onChange1(e) {
    this.onChange('result', e);
  },

  submit_vote: function(){
    const result = this.data.result;
    const that = this;
    let res = [];
    for (let i = 0; i < this.data.Vote.Objects.length; i++){
      res.push(0);
    }
    const _openid = wx.getStorageSync("_openid"); 
    const vote_id = this.data.Vote._id;
    
    wx.showModal({
      title: 'Tips',
      content: '是否确认投票？',
      success: function(e){
        if (e.confirm){
          wx.showLoading({
            title: '',
            mask: true
          })
          for (let i = 0; i < result.length; i++) {
            res[parseInt(result[i])] = 1;
          }
          console.log("done");
          wx.cloud.callFunction({
            name: "voteStatistic",
            data: {
              _openid: _openid,
              vote_id: vote_id,
              data_pack: res
            },
            success: function(e){
              wx.hideLoading();
              $wuxToast().show({
                type: 'success',
                duration: 1000,
                color: '#fff',
                text: '投票成功',
                mask: true,
                success: () => wx.navigateBack({
                  delta: 1
                })
              })
              
            },
            fail: function(e){
              wx.hideLoading();
              $wuxToast().show({
                type: 'cancel',
                duration: 1000,
                mask: true,
                color: '#fff',
                text: '网络错误',
                success: () => console.log('取消操作')
              })
              
            }
          })
        }
      }
    })
  },

  giveUp: function(){
    const that = this;
    let res = [];
    for (let i = 0; i < this.data.Vote.Objects.length-1; i++) {
      res.push(0);
    }
    res.push(1);
    const _openid = wx.getStorageSync("_openid");
    const vote_id = this.data.Vote._id;
    wx.showModal({
      title: 'Tips',
      content: '是否确认弃权？',
      success: function (e) {
        if (e.confirm) {
          wx.showLoading({
            title: '',
            mask: true
          })
          wx.cloud.callFunction({
            name: "voteStatistic",
            data: {
              _openid: _openid,
              vote_id: vote_id,
              data_pack: res
            },
            success: function (e) {
              wx.hideLoading();
              $wuxToast().show({
                type: 'success',
                duration: 1000,
                color: '#fff',
                text: '弃权成功',
                mask: true,
                success: () => wx.navigateBack({
                  delta: 1
                })
              })

              
              
            },
            fail: function (e) {
              wx.hideLoading();
              $wuxToast().show({
                type: 'cancel',
                duration: 1000,
                color: '#fff',
                text: '网络错误',
                mask: true,
                success: () => console.log('取消操作')
              })
              
            }
          })
        }
      }
    })
  }
})