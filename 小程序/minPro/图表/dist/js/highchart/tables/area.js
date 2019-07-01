function _Area(ele){
    this.ele=ele;
    this.options={
        chart: {
            type: 'area',
            backgroundColor:'transparent',
        },
        title: {
            enabled: false,
            text: ''
        },
        subtitle: {
            enabled: false,
            text: ''
        },
        colors:["#a261d9","#467ac8"],
        xAxis: {
            lineWidth: 1,
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            lineColor: '#429afe',
            gridLineColor:'#162c7f',
            categories: ['青岛', '日照', '济南', '威海', '莱芜', '烟台', '聊城']
        },
        yAxis: {
            lineWidth: 1,
            lineColor: '#429afe',
            gridLineColor:'#162c7f',
            title: {
                text: ''
            },
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
        },
        tooltip: {
            pointFormat: '{categories[ point.x]} 销量 {point.y}'
        },
       
        plotOptions: {
           
            area: {
              //  pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
           
            color:'#429afe00',
            fillColor: {
               
                linearGradient: [0, 0, 0, 300],
                stops: [
                    // [0,'#a261d9'],
                    // [1,'88']
                    [0, 'rgba(161, 96, 216,255)'],
          
                    [1, 'rgba(161, 96, 216,0)']
                    // [0, Highcharts.getOptions().colors[0]],

                    // [2, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            data: [ 144, 11009, 23000,10871, 18000, 10577, 16000]
        }, {
            color:'#429afe00',
            fillColor: {
                linearGradient:[0, 0, 0, 300],
                stops: [
                    [0, 'rgba(161, 96, 216,200)'],
          
                    [1, 'rgba(161, 96, 216,0)']
                    // [0, Highcharts.getOptions().colors[4]],
                  
                    // [1, Highcharts.Color(Highcharts.getOptions().colors[4]).setOpacity(0).get('rgba')]
                ]
            },
            data: [  100, 24000, 23000, 22000,18000, 17000, 16000]
        }],
        credits:{
            enabled:false
        },
      
       
        legend: {
            enabled:false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        // xAxis: {
        //     categories: [
        //         '周一','周二','周三','周四','周五','周六','周日'
        //     ],
        //     // plotBands: [{ // 标识出周末
        //     //     from: 4.5,
        //     //     to: 6.5,
        //     //     color: 'rgba(68, 170, 213, .2)'
        //     // }]
        //     labels:{
        //         style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
        //     },
        //     lineColor: '#429afe',
        // },
        // yAxis: {
        //     title:{
        //         enabled:false
        //     },
        //     lineColor: '#162c7f',
		// 	lineWidth: 1,
        //     // lineColor: '#429afe',
        //     gridLineColor:'#162c7f',
        //     //文字
        //     labels:{
        //         style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
        //     }
            
        // },
        // tooltip: {
        //     pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
        // },
        // plotOptions: {
        //     area: {
        //         pointStart: 1940,
        //         marker: {
        //             enabled: false,
        //             symbol: 'circle',
        //             radius: 2,
        //             states: {
        //                 hover: {
        //                     enabled: true
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    this.init()
}
_Area.prototype.init=function(){
    var chart = Highcharts.chart(this.ele,this.options );
}