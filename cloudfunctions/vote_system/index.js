// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid;
  var api_name = event.api_name;
  var data = {};
  data[api_name] = event.api_value;
  
  try {
    return await db.collection('System').doc(docid).update({
      data: data
    })
  } catch (e) {
    console.log(e)
  }
}