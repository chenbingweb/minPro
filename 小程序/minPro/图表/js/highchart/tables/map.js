var data={};
function _Map(ele){
    this.ele=ele;
    var that=this;
    Highcharts.setOptions({
        // 返回 “{series.name}”
        lang: {
            drillUpText: '返回 '
        }
    });
    this.map = null
    this.initData();
    this.mapdata=''
   
}
_Map.prototype.initData=function(){
    var that=this;
   this.geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/';
    $.getJSON(this.geochina + 'china.json&callback=?',function(mapdata) {
        console.log(mapdata)
        var pointData=[]
        

        var data = [];
        
        // 随机数据
        Highcharts.each(mapdata.features, function(md, index) {
            var tmp = {
                name: md.properties.name,
                value: Math.floor((Math.random() * 100) + 1), // 生成 1 ~ 100 随机值
                dataLabels: {
                
                    enabled: true,
                    shadow:false,
                    enabled: true,
                    format: '{point.name}',
                    style: {"color": "#fffefe", "fontSize": "13px", "fontWeight": "normal",textOutline:"none",'textDecoration' : 'none'}
                }
            };
            var point={
                color:'#fff',
                name: md.properties.name,
                lat:md.properties.latitude,
                lon:md.properties.longitude
                
            }
            if(md.properties.drilldown) {
                tmp.drilldown = md.properties.drilldown;
            }
            
            data.push(tmp);
        
            pointData.push(point);
           

        });
        console.log(pointData)
        that.mapdata=mapdata;
        that.option={
            colors: [ '#ffab61'],
            legend:{
                enabled: false
            },
            credits:{
                enabled:false
            },
            chart: {
                // plotBackgroundColor: {
                //     linearGradient: [0, 0, 500, 500],
                //     stops: [
                //         [0, 'rgb(255, 255, 255)'],
                //         [1, 'rgb(200, 200, 255)']
                //     ]
                // },
                backgroundColor:'transparent',
                events: {
                    drilldown: function(e) {
                       
                        this.tooltip.hide();
                        
                        // 异步下钻
                        if (e.point.drilldown) {
                            var pointName = e.point.properties.fullname;
                            that.map.showLoading('下钻中，请稍后...');
                            // 获取二级行政地区数据并更新图表
                            $.getJSON(that.geochina +   e.point.drilldown + '.json&callback=?', function(data) {
                                console.log(data)
                                data = Highcharts.geojson(data);
                                console.log(data)
                               
                                Highcharts.each(data, function(d) {
                                    console.log(d.properties.drilldown)
                                    if(d.properties.drilldown) {
                                        d.drilldown = d.properties.drilldown;
                                    }
                                    d.value = Math.floor((Math.random() * 100) + 1); // 生成 1 ~ 100 随机值
                                    d.dataLabels={
                                        enabled: true,
                                        shadow:false,
                                        format: '{point.name}',
                                        style: {"color": "#fffefe", "fontSize": "13px", "fontWeight": "normal",textOutline:"none",'textDecoration' : 'none'}
                                    }
                                });
                                
                                that.map.hideLoading();
                                console.log(e.point)
                                that.map.addSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: data,
                                   
                                });
                                that.map.setTitle({
                                 //   text: pointName
                                });
                            });
                        }
                    },
                    drillup: function() {
                        that.map.setTitle({
                            text: ''
                        });
                    }
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                useHTML: true,
                text: ''
            },
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<table><tr><td>{point.name}</td></tr>',
                pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
                '<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>' +
                '<tr><td>父级</td><td>{point.properties.parent}</td></tr>' +
                '<tr><td>经纬度</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>' ,
                footerFormat: '</table>'
            },
            // colorAxis: {
            //     min: 0,
            //     minColor: '#fff',
            //     maxColor: '#006cee',
            //     labels:{
            //         style:{
            //             "color":"red","fontWeight":"bold"
            //         }
            //     }
            // },
           
            series: [
                    {
                        type:'map',
                        data: data,
                        mapData: that.mapdata,
                        joinBy: 'name',
                        name: '中国地图',
                        states: {
                            hover: {
                                color: '#a4edba'
                            }
                        }
                    }, 
                    {
                     
                        type: 'mappoint',
                        name: '中国地图',
                        data:pointData,
                       
                    }
                ]
        }
        that.map=new Highcharts.Map(that.ele, that.option);
    
    });
}
_Map.prototype.init=function(){
   
}