// miniprogram/pages/vote/setVote/index.js
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
    Votes: [],
    _openid: "",
    Vote: {},
    Vote_index: 0,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data['_openid'] = wx.getStorageSync('_openid');
    db.collection("Vote-System").where({
      _openid : this.data._openid
    }).get({
      success: function(res){
        that.setData({
          Votes: res.data
        })
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

  enterVote: function(e){
    console.log(e.currentTarget.dataset.vote);
    this.setData({
      Vote: e.currentTarget.dataset.vote,
      isShow: true,
      Vote_index: e.currentTarget.dataset.id
    })
  },

  closeDialog: function () {
    this.setData({
      isShow: false
    })
  },

  handleSet: function(e){
    const that = this;
    let tmp_Vote = this.data.Vote;
    let tmp_Votes = this.data.Votes;
    const doc_id = this.data.Vote._id;
    let pack = {};
    //console.log(doc_id);
    tmp_Vote[e.currentTarget.dataset.type] = !tmp_Vote[e.currentTarget.dataset.type];
    tmp_Votes[this.data.Vote_index] = tmp_Vote;
    pack[e.currentTarget.dataset.type] = tmp_Vote[e.currentTarget.dataset.type];
    const word = e.currentTarget.dataset.type == 'Open' ? (tmp_Vote[e.currentTarget.dataset.type] ? "Open" : "Close") : (tmp_Vote[e.currentTarget.dataset.type]? "End": "Re Begin");
    db.collection("Vote-System").doc(doc_id).update({
      data: pack,
      success: function(res){
        //console.log(res);
        wx.showToast({
          title: word
        })
        that.setData({
          Vote: tmp_Vote,
          Votes: tmp_Votes
        })
      },
      failed: (e) => console.log(e)
    })
  },

  deleteVote: function(){
    //console.log("done");
    const that = this;
    let tmp_votes = this.data.Votes;
    const vote_index = this.data.Vote_index;
    const doc_id = this.data.Vote._id;
    wx.showModal({
      title: 'Notice',
      content: '是否要删除投票及数据',
      success: function(e){
        if (e.confirm){
          db.collection("Vote-System").doc(doc_id).remove({
            success: function(e){
              tmp_votes.splice(vote_index, 1);
              that.setData({
                Votes : tmp_votes,
                isShow: false
              })
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  }
})