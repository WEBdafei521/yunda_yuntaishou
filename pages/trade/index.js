// pages/trade/index.js
import ajax from '../../utils/ajax.js' //引入
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    limit:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    ajax('yunda/yfytoiltrade/list?type=1', 'POST', {
      startTime: "2020-04-15 17:52:49",
      endTime:" 2020-05-15 17:52:49",
      oilGunNo: '',
      oilTankNo: '',
      selectOrgCode:'' ,
      page: _this.data.page,
      limit: _this.data.limit,
    }).then((e) => {
      _this.setData({
        list:e.data.page.list
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  orderDetails(e){
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '../trade_detail/index?id='+e.target.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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