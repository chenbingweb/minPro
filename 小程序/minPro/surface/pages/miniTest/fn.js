var _util = require('../../utils/util.js');
//获取mini考导航
function getMiniTestNav(that) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  //member_id	page_num	page_size	month
  var sendData={
    member_id:that.uid,
    page_num:that.pagenum,
    page_size:that.pagesize,
    month:''
  }
  //获取导航条
  var navlist = that.navBar;
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    if (res.encode==0) {
      var data = res.category;
      if(data.length&&Array.isArray(data))
      {
        var timelist=[];
        for (let i = 0; i < data.length; i++) {
          timelist.push({
            day: data[i],
            selected: false,
            id: i + 1
          })
          
        }
      }
      navlist.push(...timelist);
      //刷新页面
      that.setData({
        navBar: navlist
      })
      console.log(navlist)
      //默认先加载状元考 navlist[2].id
      if (navlist.length==2)
      {
        getNavList('rule', that.uid, that)
      }
      else if (navlist.length>=3)
      {
       that.nid = navlist[2].id
        getNavList(navlist[2].id, that.uid, that);
       
      }
      
     
    }

  }, (err) => {
    wx.hideLoading()
    }, 'exam/category', undefined, undefined)
}
//根据导航id显示列表
function getNavList(nid,uid,that)
{
  var navBar = that.data.navBar;//获取导航列表
  var temp = that.data.temp;//获取当前模板
  var date='';
  for (let i = 0; i < navBar.length;i++){
    if (navBar[i].id==nid)
    {
      navBar[i].selected=true;
      //根据不同的nid，选择不同的模板
      if (nid =='zyk')//状元考模板
      {
        temp = 'number_one_scholar';
        
      }
      else if (nid == 'rule')//考试规则模板
      {
        temp = 'test_rules';
      }
      else//测试题模板
      {
        temp = 'test_item';
        date = navBar[i].day
      }
    }
    else
    {
      navBar[i].selected = false;
    }
  }
  //获取状元考列表
  getList(uid, nid, temp, navBar, that, date);
 
}
//获取列表(状元考，考试规则，按日期查看测试信息列表)
function getList(uid, nid, temp, navBar, that, date){
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    member_id:uid
  }
  var url='';//请求地址
  if (nid == 'zyk')//状元考
  {
    url ='exam/rank';
  }
  else if (nid =='rule')
  {//考试规则
    url = 'exam/rule';
    sendData={}
  }
  else//考试题
  {
    url ='exam/index';
    sendData = {
      member_id: that.uid,
      page_num: that.pagenum,
      page_size: that.pagesize,
      month: date
    }
  }
  _util.Ajax(sendData, (res) => {
    wx.hideLoading();
    //状元考
    if (nid == 'zyk')
    {
      if(res.encode)
      {
        var tempData = {
          myranking:res.my,
          otherranking: res.list
        }
        that.setData({
          tempData: tempData,
          navBar: navBar,
          temp: temp
        })


      }
    }
    else if(nid=='rule')//考试规则
    {
      if(res.encode==0)
      {
        var tempData = {
          category: res.category,
          special: res.special,
          weekly: res.weekly
        }
        that.setData({
          tempData: tempData,
          navBar: navBar,
          temp: temp
        })
      }
    }
    else if(date!='')//测试题
    {
      if(res.encode==0)
      {
        var testList = res.list;
        //判断是否有数据
        if (!testList.length && Array.isArray(testList))
        {
          
          wx.showToast({
            title: '没有更多数据',
            image: '../../images/notice_2.png',
            mask: true
          })
          
          return 
        }
        //判断是否是分页请求
        if(that.page)
        {
          that.data.tempData = that.data.tempData || [];
        }
        else//非分页则清空
        {
          that.data.tempData=[]
        }
        //获取相应的数据
        for(let i=0;i<testList.length;i++){
          var teststatus = 0;//0未开始考试1通过2未通过
          var integral=0;
          if (testList[i].is_record==0)//未做答
          {
            teststatus=0;
            integral = testList[i].score || 0;
          }
          else//已作答
          {
            if (testList[i].addscore==0)//未通过考试
            {
              teststatus=2
              integral = 0;
            }
            else//已通过考试
            {
              teststatus = 1;
              integral = testList[i].addscore;
            }
          }

          that.data.tempData.push({
            teststatus: teststatus,//0未开始考试1通过2未通过
            examstatus: parseInt(testList[i].type),//0日考1周考2月考  1：周考 2：专题考试'
            integral: integral,//获取积分
            day: formDate( testList[i].create_date),//日期,
            id: testList[i].id,
            nid: nid,
            title: testList[i].name
          })
         
        }
        //渲染页面
        that.setData({
          tempData: that.data.tempData,
          navBar: navBar,
          temp: temp
        })
        that.canScroll = true;
      }
    }

  }, (err) => {
    that.canScroll = true;
    wx.hideLoading()
    }, url, undefined, undefined)
}
//日期转换 
function formDate(date)
{
  var dateArr=date.split('-');
  return dateArr[1] + '月' + dateArr[2]+'日'
}
module.exports = {
  getMiniTestNav,
  getNavList
};

//获取列表(状元考，考试规则，按日期查看测试信息列表)
function getList_X(uid, nid, temp, navBar, that, date) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var sendData = {
    uid
  }
  if (date) {
    sendData.date = date
  }
  //非考试规则
  if (nid !== 'rule') {
    var url = '';//请求地址
    if (nid == 'zyk') {
      url = 'exam/rank';
    }
    else if (nid == '') {

    }
    _util.Ajax(sendData, (res) => {
      wx.hideLoading();
      //测试
      if (nid == 'zyk') {
        var res = res.getNumberTest;
      }
      else {
        var res = res.getTestList
      }

      if (res.encode) {
        var data = res.data;
        that.setData({
          tempData: data,
          navBar: navBar,
          temp: temp
        })
      }

    }, (err) => {
      wx.hideLoading()
    }, 'exam/rank', undefined, undefined)
  }
  else {
    that.setData({
      navBar: navBar,
      temp: temp
    })
    wx.hideLoading();
  }

}