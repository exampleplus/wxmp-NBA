var app = getApp()
Page({
  data: {
    list: [],
    content: [],
    schid: '',
    currentTab: 0, // tab切换
    technical: []
  },
  onLoad: function (e) {
    this.live_content(e.schid) // 获取直播内容
    this.live_detail(e.schid, e.liveid) // 获取直播室详情信息
    this.technical_statistics(e.schid)
    this.setData({
      schid: e.schid,
      liveid: e.liveid
    })
  },

  // 获取直播内容数据
  live_content: function (schid) {
    var that = this
    var params = {
      schid: schid
    }
    app.api
      .live_content(params)
      .then(res => {
        that.setData({
          content: res.data
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  // 获取比赛详情信息
  live_detail: function (schid, liveid) {
    var that = this
    var params = {
      schid: schid,
      liveid: liveid
    }
    app.api
      .live_detail(params)
      .then(res => {
        that.setData({
          list: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.t1_name + ' VS ' + res.data.t2_name // 页面标题为路由参数
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  // 获取球员技术统计
  technical_statistics: function (schid) {
    var that = this
    var params = {
      schid: schid
    }
    app.api
      .technical_statistics(params)
      .then(res => {
        that.setData({
          technical: res.data
        })
      })
      .catch(e => {
        console.error(e)
      })
  },

  previewImage: function (e) {
    var url = e.target.dataset.url
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  // 滑动切换tab
  bindChange: function (e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this
    this.technical_statistics(that.data.schid)
    if (e.target.dataset.current === 0) {
      that.live_content(that.data.schid)
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  loadMore: function (e) {
    
  },
  upper: function (e) {
  
  },
  lower: function (e) {
  
  },
  scroll: function (e) {
   
  }
})
