// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const vote_id = event.vote_id;
  const data_pack = event.data_pack;
  const _openid = event._openid;
  var fore_data = [];
  var total = 0;
  var data = {
    Total: _.inc(1),
    VoteList: _.push([_openid])
  }
  for (let i = 0; i < data_pack.length; i++){
    var field = "Votes." + i;
    data[field] = _.inc(data_pack[i]);
  }
  return await db.collection('Vote-System').doc(vote_id).update({
    data: data
  })

}