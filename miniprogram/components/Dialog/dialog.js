// components/Dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  data: {
    isShow: false,
    array: ["计算机类","信息与计算科学","软件工程","保密管理","其他"],
    index: 0,
    grade: ["2018","2017","2016","2015","2014","2013","2012","2011","2010","2009"],
    grade_index: 0,
    sid: 0,
    name: " "
  },
  methods: {
    show: function () {
      this.setData({
        isShow: true
      })
    },
    close: function () {
      this.setData({
        isShow: false
      })
    },
    bindPickerChange(e) {
      //console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    bindGradeChange(e) {
      //console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        grade_index: e.detail.value
      })
    },
    handleName(e){
      console.log(e.detail.value);
      this.setData({
        name: e.detail.value
      })
    },
    handleSid(e) {
      console.log(e.detail.value);
      this.setData({
        sid: e.detail.value
      })
    },
    onOk(){
      try{
        const responseJSON = {
          Name: this.data.name,
          Sid: this.data.sid,
          Major: this.data.array[this.data.index],
          Grade: this.data.grade[this.data.grade_index],
          Etw: false,
          NEtw: false,
          Stu: false,
          Admin: false
        };
        return responseJSON;
      }catch(e){
        console.log(e);
      }
      
    },
    _okEvent: function () {
      this.triggerEvent('okEvent');
    }
  }
})
