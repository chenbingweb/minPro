function _Tree(ele){
    this.ele=ele;
    var total=100;
    
    this.optons={
        chart: {
			type: 'column',
			// plotBorderColor: '#429afe',
            // plotBorderWidth: 2,
            backgroundColor:'transparent',
            animation: {
				duration: 1000
			}
        },
        plotOptions: {
            // className:'tree_map',
          
            series:{
                borderColor:"transparent",
                dataLabels:{
                    style:{"color": "#fff", "fontSize": "20px", "fontWeight": "normal", textOutline:"none",'textDecoration' : 'none' }
                },
            }
            
        },
        credits:{
            enabled:false
        },
        colorAxis: {
            minColor: '#4a51c6',
            maxColor:'#2c3177'
        },
        series: [{
            type: "treemap",
         
            layoutAlgorithm: 'squarified',
            
            data: [{
                name: '华为',
                value: total*0.2,  
                colorValue:0
            }, {
                name: '苹果',
                value: total*0.2,
                colorValue:1
            }, {
                name: '黑莓',
                value: total*0.1,
                colorValue:2
            }, {
                name: '三星',
                value:total*0.1,
                colorValue:3
            }, {
                name: '锤子',
                value: total*0.1,
                colorValue:4
            }, {
                name: 'HTC',
                value: total*0.1,
                colorValue:5
            }, {
                name: '中兴',
                value: total*0.1,
                colorValue:6
            }, {
                name: '美图',
                value: total*0.05,
                colorValue:7
            }, {
                name: '小米',
                value: total*0.05,
                colorValue:8
            }]
        }],
        legend:{
            enabled:false
        },
        title: {
            text: ''
        }
    }
    this.init()
}
_Tree.prototype.init=function(){
    var chart = Highcharts.chart( this.ele,  this.optons);
}