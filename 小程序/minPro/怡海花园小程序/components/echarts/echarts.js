// components/echarts/echarts.js
import * as echarts from '../ec-canvas/echarts.js';
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    show:{
      type: Boolean,
      value: false,
    },
    dataSlot:{
      type:Object,
      value: [],
      observer:function(newVal,oldVal){

          if(newVal.length)
          {
            console.log(1)
            var myEventDetail = { ec: this.echartsData(this.properties.dataSlot) }  // detail对象，提供给事件监听函数
            console.log(myEventDetail)
            var myEventOption = {
              bubbles: true,
              composed: true,
              capturePhase: true
            } // 触发事件的选项
            this.triggerEvent('ecEvents', myEventDetail, myEventOption)
          }
          else
          {


          }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataSlot:[],
  },
  ready:function(){

    // var myEventDetail = { ec: this.echartsData(this.properties.dataSlot) }  // detail对象，提供给事件监听函数
    // console.log(myEventDetail)
    // var myEventOption = {
    //   bubbles: true,
    //   composed: true,
    //   capturePhase: true
    // } // 触发事件的选项
    // this.triggerEvent('ecEvents', myEventDetail, myEventOption)
    // console.log(2)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onInits: function (canvas, width, height){
      console.log('33', canvas, width, height)
    barChart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(barChart);
    barChart.setOption(this.echartsData(this.properties.dataSlot));
    return barChart;
  },
    echartsData:function(eData){
      console.log(eData)
      let items=[];
      eData.forEach(item=>{
        items.push(item.name)
      })
      let obj = {
        legend: {
          itemWidth: 12,             // 图例图形宽度
          itemHeight: 9,
          textStyle: {
            fontSize: 12
          },
          orient: 'vertical',
          left: 'left',
          top: 10,
          data: items
        },
        series: [
          {
            legendHoverLink: false,
            hoverAnimation: false,
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['62%', '60%'],
            data: eData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
     return obj
    }

  }
})
