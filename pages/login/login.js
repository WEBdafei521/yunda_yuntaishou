// pages/login/login.js
import ajax from '../../utils/ajax.js' //引入
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasTap:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    if(token){
      wx.reLaunch({
        url: '../index/index',
      })
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.setStorageSync("code", res.code)
          //发起网络请求    
          ajax('mobile/pwd/codeStation', 'POST', {
            code: res.code
          }).then((e) => {
            // console.log(e)
            that.setData({
              rdSessionId: e.data.rdSessionId
            })
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  // 登陆 获取手机号
  getPhoneNumber1(e){
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          console.log(res)
          
          that.setData({
            hasTap: false
          })
        }
      })
    } else if(e.detail.errMsg == 'getPhoneNumber:ok') {
      if (!that.data.hasTap) {
        that.setData({
          hasTap: true
        }, () => {
          // mobile/pwd/loginNewStation
          ajax('mobile/pwd/loginNewStation', 'POST', {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            rdSessionId: that.data.rdSessionId,
            orgCode: ""
          }).then((res) => {
            
            that.setData({
                hasTap: true
              })
            if (res.data.code == 1) {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              })
            } else {
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('userInfo', JSON.stringify(res.data.user))
              wx.setStorageSync('phoneNumber', res.data.user.mobile)
              wx.reLaunch({
                url: '../index/index',
              })
            }
          }).catch((err) => {
            console.log(err)
          })
          
        })
      } else {
        return
      }
      
    } 
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