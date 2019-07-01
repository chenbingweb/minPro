// components/e-echarts/e-echarts.js
import * as echarts from '../ec-canvas/echarts.js';

console.log(echarts)
let barChart=null;
function create(data){
  
  return inner
  function inner(canvas, width, height) {
    console.log(canvas, width, height)
    let barChart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(barChart);
    barChart.setOption(getBarOption(data));
    return barChart;
  }


}


function onInits(canvas, width, height) {
  barChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(barChart);

  barChart.setOption(getBarOption([{
      value: 20,
      name: '身心轻松'
    },
    {
      value: 10,
      name: '孤僻症状'
    },
    {
      value: 30,
      name: '强迫恐惧'
    },
    {
      value: 20,
      name: '自闭症状'
    },
    {
      value: 20,
      name: '抑郁症状'
    }
  ]));
  return barChart;
}

function getBarOption(eData) {
  let items = [];
  eData.forEach(item => {
    items.push(item.name)
  })
  return {
    legend: {
      itemWidth: 12, // 图例图形宽度
      itemHeight: 9,
      textStyle: {
        fontSize: 12
      },
      orient: 'vertical',
      left: 'left',
      top: 10,
      data: items
    },
    series: [{
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
    }]
  };

}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    index: {
      type: Number,
      value: 0
    },
    //数据
    edata: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        console.log(newVal)
        // console.log(create(newVal))
        if (newVal.length)
        {
          //barChart.setOption(getBarOption(newVal));
          setTimeout(()=>{
           // this.data.ec.onInit.setOption(getBarOption(newVal));
        },4000)
        }
        
        // setTimeout(()=>{
        //   barChart.setOption(getBarOption(newVal));
        // },4000)
       
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: onInits
    },
    dataSlot: [{
        value: 20,
        name: '身心轻松'
      },
      {
        value: 10,
        name: '孤僻症状'
      },
      {
        value: 30,
        name: '强迫恐惧'
      },
      {
        value: 20,
        name: '自闭症状'
      },
      {
        value: 20,
        name: '抑郁症状'
      }
    ],
  },
  ready: function() {
    // this.setData({
    //   ec: {
    //     onInit: onInits
    //   }
    // })
    setTimeout(() => {
      const ecComponent = this.selectComponent(`#ec_${this.properties.index}`);

      ecComponent.canvasToTempFilePath({
        success: res => {
          console.log(res)
        },
        fail: res => console.log(res)
      });
    }, 3000)

  },
  /**
   * 组件的方法列表
   */
  methods: {
    getBarOption_: function(eData) {
      let items = [];
      eData.forEach(item => {
        items.push(item.name)
      })
      return {
        legend: {
          itemWidth: 12, // 图例图形宽度
          itemHeight: 9,
          textStyle: {
            fontSize: 12
          },
          orient: 'vertical',
          left: 'left',
          top: 10,
          data: items
        },
        series: [{
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
        }]
      };

    },
    onInits_: function(canvas, width, height) {
      this.barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(this.barChart);
      this.barChart.setOption(this.getBarOption([{
          value: 20,
          name: '身心轻松'
        },
        {
          value: 10,
          name: '孤僻症状'
        },
        {
          value: 30,
          name: '强迫恐惧'
        },
        {
          value: 20,
          name: '自闭症状'
        },
        {
          value: 20,
          name: '抑郁症状'
        }
      ]));
      return barChart;
    }
  }
})