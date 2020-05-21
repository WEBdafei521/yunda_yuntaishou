import * as echarts from '../../ec-canvas/echarts';
import ajax from '../../utils/ajax.js' //引入
const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      lazyLoad: false
    }
  },
  init: function (e) {
      var _this = this
      ajax('mobile/station/getWeekSaleInfo', 'get').then((e) => {
        console.log(e)
        var data_list = []
        var qty_list = []
        var sum_tradeMoney = []
        for(var item of e.data.weekSaleInfo){
          var obj = {}
          data_list.push(item.date)
          qty_list.push(item.sum_qty)
          sum_tradeMoney.push(item.sum_tradeMoney)
        }
        _this.ecComponent.init((canvas, width, height, dpr) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          var option = {
            title: {
              text: '近五天销售趋势走向图(L)',
              left: 'center'
            },
            color: ["#37A2DA", "#67E0E3"],
            legend: {
              data: ['加油量', '加油总金额'],
              top: 30,
              left: 'center',
              backgroundColor: 'white',
              z: 120
            },
            grid: {
              containLabel: true
            },
            tooltip: {
              show: true,
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data_list,
              // show: false
            },
            yAxis: {
              x: 'center',
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
              // show: false
            },
            series: [{
              name: '加油量',
              type: 'line',
              smooth: true,
              data: qty_list
            }, {
              name: '加油总金额',
              type: 'line',
              smooth: true,
              data: sum_tradeMoney
            }]
          };
          chart.setOption(option);
          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          _this.chart = chart;
    
          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });
      }).catch((err) => {
        console.log(err)
      })
      
    
  },
  onLoad:function(){
    
  },
  onReady() {
    var _this = this
    this.ecComponent = this.selectComponent('#mychart-dom-line');
  },
  onShow: function () {
    var _this = this
    setTimeout(function(){
      _this.init()
    },500)
  },
});
