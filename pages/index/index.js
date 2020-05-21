// pages/login/login.js
import ajax from '../../utils/ajax.js' //引入
Page({

  /**
   * 页面的初始数据/mobile/station/getSaleInfo
   */
  data: {
    userinfo:{},
    msgList: [
      { title: "朋友圈" },
      { title: "文章" },
      { title: "公共号" },
      { title: "小程序" },
      { title: "音乐" },
      { title: "表情" },
      { title: "订阅号" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    ajax('/yunda/yfysdepart/initMainInfo?type=0', 'get').then((e) => {
      console.log(e)
      this.setData({
        msgList:e.data.list_controller
      })
      wx.setStorageSync('departInfo', JSON.stringify(e.data.departInfo))
    }).catch((err) => {
      console.log(err)
    })
    ajax('mobile/station/getSaleInfo', 'get').then((e) => {
      console.log(e)
      this.setData({
        userinfo:e.data.departInfo
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  tradeList(){
    wx.navigateTo({
      url: '../trade/index',
    })
  },
  user(){
    wx.navigateTo({
      url: '../user/index',
    })
  },
  gun_list(){
    wx.navigateTo({
      url: '../gun_list/index',
    })
  },
  tanKList(){
    wx.navigateTo({
      url: '../tank_list/index',
    })
  },
  sale_trend(){
    wx.navigateTo({
      url: '../sale_trend/index',
    })
  },
  daily_report(){
    wx.navigateTo({
      url: '../daily_report/index',
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