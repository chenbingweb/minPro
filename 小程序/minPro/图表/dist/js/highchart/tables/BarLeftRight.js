function _BarLeftRight(ele){
    this.ele=ele;
    this.options={
        
        credits:{
            enabled:false
        },
        chart: {
			type: 'bar',
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
        yAxis:[
            {
        
                lineWidth: 1,
                title:{
                    enabled:false
                },
                lineColor: '#429afe',
                gridLineColor:'#162c7f',
                //文字
                labels:{
                    style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
                },
                crosshair: true
            },
            {
                labels:{
                    style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
                },
                lineColor: '#429afe',
                categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                crosshair: true
            }
        ],
        xAxis: {
            labels:{
                style:{ "color": "#fff", "cursor": "default", "fontSize": "11px" }
            },
            lineColor: '#429afe',
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        tooltip: {
            borderColor:null,
            shadow:false,
            backgroundColor:'#e43aa4',
            shared: true,
			useHTML: true,
			headerFormat: '<small>{point.key}</small><table>',
			pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
			'<td style="text-align: right"><b>{point.y} EUR</b></td></tr>',
			footerFormat: '</table>',
			valueDecimals: 2
		},
        series: [
                   {
                        type: 'column',
                        colorByPoint: true,
                        // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                        showInLegend: false
                    }
                 ]
    }
  this.init();
    // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  this.setData([29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4])
}
_BarLeftRight.prototype.init=function(){
    this.chart = Highcharts.chart(this.ele, this.options);

}
//动态设置数据
_BarLeftRight.prototype.setData=function(data){
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
   this.options.series[0].data=data;
   this.options.colors=newcolorArr;
   this.init();
  
}