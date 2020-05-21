// pages/daily_report/index.js
import * as echarts from '../../ec-canvas/echarts';
import ajax from '../../utils/ajax.js' //引入
import util from '../../utils/util' //引入
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 10000,
    duration: 500,

    nowDate: '2020-05-09',

    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: false
    },
    tableDate:[],
  },
  init: function (e) {
    var _this = this
    ajax('mobile/station/oils', 'get', {
      time: e
    }).then((e) => {
      this.setData({
        tableDate:e.data.maps
      })
      console.log(e.data.maps)
      var color = ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"]
      var length = e.data.maps.length;
      var data_value=[]
      var data_sum = 0;
      var data_color =color.splice(0,length);
      for(var item of e.data.maps){
        var obj = {}
        data_sum+=item.tradeMoney
        obj.value = item.tradeMoney
        obj.name = item.abbreviate
        data_value.push(obj)
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
          backgroundColor: "#ffffff",
          title: {
            text: parseInt(data_sum),
            left: 'center',
            top:'46%'
          },
          color:data_color,
          series: [{
            label: {
              normal: {
                fontSize: 14
              }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['40%', '60%'],
            data: data_value
          }]
        };
        chart.setOption(option);
        // setOption(chart);
  
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        _this.chart = chart;
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    }).catch((err) => {
      console.log(err)
    })
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  day = util.formatTime(new Date())
    this.setData({
      nowDate:day.split(" ")[0]
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      nowDate:e.detail.value
    })
  },
  searchInfo(){
    this.init(this.data.nowDate)
  },
  daily_report_list(e){
    console.log(e)
    var _this =this
    wx.navigateTo({
      url: '../daily_report_list/index?goodid='+e.target.dataset.goodid+'&time=2020-05-09&name='+e.target.dataset.oilnmae
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    setTimeout(function(){
      _this.init(_this.data.nowDate)
    },500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})