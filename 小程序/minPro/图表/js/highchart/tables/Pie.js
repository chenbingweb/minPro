function _Pie(ele){
    this.ele=ele;
    var that=this;
  
    this.options={
        credits:{
            enabled:false
        },
        
        chart: {
            type: 'pie',
            backgroundColor:'transparent',
            spacing : [0,0,0,0],
            animation: {
				duration: 300
			}
        },
        colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', 
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
        title: {
            floating:true,
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            
            pie: {
                size:120,
                innerSize: '70%',
                borderColor: null,   
                allowPointSelect: true,
               
                cursor: 'pointer',
                dataLabels: {
                    softConnector: false, // by default,
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    style: {
                        // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        "color": "#fff", "fontSize": "11px", 
                    }
                },
                point: {
                    events: {
                        mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                            // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                            // that.chart.setTitle({
                            //     text: e.target.name+ '\t'+ e.target.y + ' %'
                            // });
                        }
                        //, 
                        // click: function(e) { // 同样的可以在点击事件里处理
                        //     chart.setTitle({
                        //         text: e.point.name+ '\t'+ e.point.y + ' %'
                        //     });
                        // }
                    }
                },
            }
        },
        series: [{
            type: 'pie',
          
            name: '市场份额',
            data: [
                {name:'Firefox',  y: 45.0},
                ['IE',26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    // sliced: true,
                    // selected: true,
                   
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    }
    
   
    this.setData()
}
_Pie.prototype.init=function(){
    this.chart = Highcharts.chart(this.ele, this.options, function(c) { // 图表初始化完毕后的会掉函数
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        // 动态设置标题位置
        c.setTitle({
            y:centerY + titleHeight/2
        });
    });
 
}
_Pie.prototype.setData=function(data){
  //  this.options.series[0].data=data;
    this.init();
   // this.chart.series[0].setData(data);
}
