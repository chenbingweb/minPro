// components/calendar/calendar.js
import Calendar from "./Days.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startDay:{
      type:String,
      value:'',
      observer:function(n,o){
        if(n)
        {
            //flag, index, child, day, detail
         
        }
      }
    },
    endDay: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    week_title:['日','一','二','三','四','五','六'],
    month:[],
    selectArr:[]
  },
  ready(){
    this.init();
    this.selectArr=[];
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化日历
    init(){
      let days=new Calendar().getdayListInfo();
      this.setData({
        month:days
      },()=>{
        this.setInitDay()
      })
     

    },
    //选择日期
    onselect({ currentTarget: { dataset: { flag, index, child, day, detail}}}){
      if (!flag) return 
      let { selectArr}=this.data;
      selectArr.push({ flag, index, child, day, detail});
      this.setData({
        selectArr
      },()=>{
        this.selectDay()
      })
      
      return
      if(!flag) return 
      console.log(flag, index, child, day)
      let nd = new Date();
      let currentMonth = nd.getMonth() + 1;
      let months = this.data.month;
      let d = nd.getDate();
      months.forEach(item=>{
        item.allday.forEach(_item=>{
          _item.select = false
         
        })
      })
      let currentSelect=''
      //months[index].month
      for (let cm = currentMonth; cm <= index+1; cm++) {
        let alldays = months[cm - 1].allday;
        for (let _index = child; _index < alldays.length; _index++)
        {
          let item = alldays[_index]
          //当前可选并且选择的天数大于可选的
          if (item.flag && item.day <= day && cm == index + 1) {
            item.select = true;
            currentSelect = months[cm - 1];
          }
          else if (item.flag && cm < index + 1) {
            item.select = true
          }
        }
        // months[cm - 1].allday.forEach((item, _index) => {

        //   //当前可选并且选择的天数大于可选的
        //   if (item.flag && item.day <= day && cm == index + 1) {
        //     item.select = true;
        //     currentSelect = months[cm - 1];
        //   }
        //   else if (item.flag && cm < index + 1) {
        //     item.select = true
        //   }
          
       

        // })

      }
      let { year, month } = currentSelect
      
      this.setData({
        [`month`]: months
      },()=>{
        console.log(year, month, day)
      })



 

    },
    //渲染选中时间
    selectDay(){
      // flag, index, child, day, detail
      let { selectArr, month } = this.data;
     
      //清空全部选择
      month.forEach(item => {
        item.allday.forEach(_item => {
          _item.select = false

        })
      })
      //开始选择
      if (selectArr.length == 1) {
        month[selectArr[0].index].allday[selectArr[0].child].select=true
      }
      //选择结束时间
      if (selectArr.length == 2) {
        let start = selectArr[0];
        let end = selectArr[selectArr.length - 1];
        //如果是当前月份且结束时间小于开始时间，则重新开始选择
        if (start.day > end.day && start.index==end.index){
          let arr = [end]
          month[end.index].allday[end.child].select = true
          this.setData({
            selectArr: arr
          })
          
        }
        //选择结束月份小于起始月份
        else if (start.index > end.index){
          let arr = [end]
          month[end.index].allday[end.child].select = true
          this.setData({
            selectArr: arr
          })

        }
        //如果是当前月份
        else if (start.index == end.index)
        {
          let alldays = month[start.index].allday;
          for (let _index = start.child; _index < alldays.length; _index++) {
            let item = alldays[_index]
            if (item.flag  && item.day <= end.day) {

              item.select = true;
            }
            // else
            // {
            //   item.select = false;
            // }

          }
        }
        else //如果不是当前月份
        {
          for (let i = start.index; i <=end.index; i++) {
            let alldays = month[i].allday;
            if (start.index == i )
            {
              for (let _index = 0; _index < alldays.length; _index++) {
                let item = alldays[_index]
                if (item.flag && item.day >= start.day) {

                  item.select = true;
                }
              }
            }
            else if (end.index==i){
              for (let _index = 0; _index < alldays.length; _index++) {
                let item = alldays[_index]
                if (item.flag && item.day <= end.day) {

                  item.select = true;
                }
              }
             

            }
            else
            {
              for (let _index = 0; _index < alldays.length; _index++) {
                let item = alldays[_index];
                if (item.flag ) {

                  item.select = true;
                }
              }
            }

            // for (let _index =0; _index < alldays.length; _index++) {
            //   let item = alldays[_index]
            //   if (item.flag && start.index == i && item.day >= start.day) {

            //     item.select = true;
            //   }
            //   else if (item.flag && i < end.index ) {
            //     item.select = true
            //   }
            //   // if(item.flag && end.index <=i && item.day <= end.day) {
            //   //   item.select = true
            //   // }
              
            
              
             


            // }
          }
        }


       
      }
      //超过三次，则重新开始选择时间
      if (selectArr.length == 3) {
        let arr = [selectArr[selectArr.length-1]]
        console.log(selectArr)
        month[selectArr[selectArr.length - 1].index].allday[selectArr[selectArr.length-1].child].select = true;
        this.setData({
          selectArr: arr
        })
      }

      this.setData({
        [`month`]: month
      },()=>{
        if(this.data.selectArr.length==1)
        {
          wx.showToast({
            title: '请选择结束时间',
            icon: 'none'
          })
        }
      })
    },
    //时间转换对象属性
    timeChangeObj(timeStr){
      let { selectArr, month } = this.data;
       //flag, index, child, day, detail
      let flag = false, index = 0, child=0,day=1,detail=''
      month.forEach((item,_index)=>{
        item.allday.forEach((_item,_child)=>{
          if(_item.detail==timeStr)
          {
            flag=_item.flag;
            index = _index;
            child=_child;
            detail = timeStr;
            day=_item.day;
          }
        })
      })
      return {
        flag, index, child, day, detail
      }
    },
    //设置默认初始值
    setInitDay(){
      let startDay = this.timeChangeObj(this.properties.startDay);
      let endDay = this.timeChangeObj(this.properties.endDay);
      let selectArr = this.data.selectArr;
      selectArr.push(startDay)
      selectArr.push(endDay)
      this.setData({
        selectArr
      }, () => {
        this.selectDay()
      })
    }

  }
})


//判断当前年是否是闰年
function isLeap(year) {
   return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
  
}