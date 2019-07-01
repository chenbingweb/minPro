function _Areas(ele){
    this.ele=ele;
    this.options={
        credits:{
            enabled:false
        },
      
        chart: {
            type: 'areaspline',
            backgroundColor:'transparent',
        },
        title: {
            text: ''
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
        xAxis: {
            categories: [
                '周一','周二','周三','周四','周五','周六','周日'
            ],
            // plotBands: [{ // 标识出周末
            //     from: 4.5,
            //     to: 6.5,
            //     color: 'rgba(68, 170, 213, .2)'
            // }]
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            lineColor: '#429afe',
           
        },
        yAxis: {
            title:{
                enabled:false
            },
            lineColor: '#429afe',
			lineWidth: 1,
            // lineColor: '#429afe',
            gridLineColor:'#162c7f',
            //文字
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            
        },
        tooltip: {
            // shared: true,
            // valueSuffix: ' 单位'
            pointFormat: '{categories[ point.x]} 销量 {point.y}'
        },
        plotOptions: {
            areaspline: {

                fillOpacity: 1
            }
        },
        series: [{
            color:"transparent",
            fillColor: {

                linearGradient: [0, 0, 0, 300],
                stops: [
                    // [0,'#a261d9'],
                    // [1,'88']
                    [0, 'rgba(88, 157, 250,255)'],
          
                    [1, 'rgba(88, 157, 250,0)']
                    // [0, Highcharts.getOptions().colors[0]],

                    // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            name: '小张',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            color:"transparent",
            fillColor: {
               
                linearGradient: [0, 0, 0, 300],
                stops: [
                    // [0,'#a261d9'],
                    // [1,'88']
                    [0, 'rgba(161, 96, 216,255)'],
          
                    [1, 'rgba(161, 96, 216,0)']
                    // [0, Highcharts.getOptions().colors[0]],

                    // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            name: '小潘',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    }
    this.init()
}
_Areas.prototype.init=function(){
    var chart = Highcharts.chart(this.ele,this.options );
}