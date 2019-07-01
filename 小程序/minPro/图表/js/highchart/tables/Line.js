function _Line(ele){
    this.ele=ele;
    this.options={
        
        credits:{
            enabled:false
        },
        legend:{
            enabled:false,
        },
        chart: {
			type: 'line',
			// plotBorderColor: '#429afe',
            // plotBorderWidth: 2,
            backgroundColor:'transparent',
            animation: {
				duration: 1000
			}
        },
        plotOptions: {
            series: {
                borderColor: 'transparent'
            }
        },
        title: {
            text: ''
            },
        subtitle: {
              text: ''
            },
        yAxis:{
            
            title:{
                enabled:false
            },
            lineColor: '#429afe',
            gridLineColor:'#162c7f',
            //文字
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            gridLineWidth:1,
        },
        xAxis: {
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            gridLineWidth:1,
            lineColor: '#429afe',
            gridLineColor:'#162c7f',
             categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
      
        
        tooltip: {
            borderColor:null,
            shadow:false,
            // backgroundColor:'#0d1b5c',
            shared: true,
			useHTML: true,
			headerFormat: '<small>{point.key}</small><table>',
			pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
			'<td style="text-align: right"><b>{point.y} EUR</b></td></tr>',
			footerFormat: '</table>',
			valueDecimals: 2
		},
        series: []
    }
    var arr=[{
        name: '安装，实施人员',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
                name: '工人',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
                name: '销售',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
                name: '项目开发',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
                name: '其他',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }]
    // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    this.setData(arr)
}
_Line.prototype.init=function(){
    this.chart = Highcharts.chart(this.ele, this.options);

}
//动态设置数据
_Line.prototype.setData=function(data){
    var colorArr=['#439bff','#e93ca7'];
   
    var newcolorArr=[]
    for(var i=0;i<data.length;i++)
    {
        if((i+1)%3==0)
        {
            newcolorArr.push(colorArr[1])
        }
        else
        {
            newcolorArr.push(colorArr[0])
        }
        
    }
    this.options.series=data;
    //this.options.colors=newcolorArr;
    this.init();
    // this.chart.update({
    //     colors:newcolorArr
    // })
   // this.chart.series[0].setData(data);
}