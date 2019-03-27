// miniprogram/pages/vote/viewResult/index.js
const Hex = "0123456789abcdef"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Vote: [],
    Votes_Percent: [],
    Colors: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Vote = wx.getStorageSync("Voting");
    var Colors = [];
    var Votes_Percent = [];
    var Total = Vote.Total;
    for (var i = 0; i < Vote.Objects.length; i++){
      var color = "";
      var percent = 0;
      for (let j = 0; j < 6; j++){
        color += Hex[Math.floor(Math.random()*15)];
      }
      Colors.push(color);
      Total == 0 ? percent = 0 : percent = (Vote.Votes[i]*100/Total).toFixed(2); 
      Votes_Percent.push(percent);
    }
    this.setData({
      Vote: Vote,
      Colors: Colors,
      Votes_Percent: Votes_Percent
    })
    console.log(this.data);
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

  handleback: ()=>{
    wx.navigateBack({
      delta: 1
    })
  }
})