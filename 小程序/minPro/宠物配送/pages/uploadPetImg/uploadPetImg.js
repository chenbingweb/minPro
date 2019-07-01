// pages/uploadPetImg/uploadPetImg.js
import {Index} from "../../model/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    range:[
      {
        id:'',
        name:'选择地点'
      },
      {
        id: 'home',
        name: '家庭'
      },
      {
        id: 'pet_shop',
        name: '宠物店'
      }
    ],
    index:0,
    uploadImgs:[],
    route_image:[],
    petInfo:{},
    src:'uploadimg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {src,oid}=options;
    this.setData({
      src:src
    })
    if (Index.petInfo.pet_img&&Index.petInfo.pet_img.length && src =='uploadimg')
    {
      this.setData({
        petInfo: Index.petInfo,
        uploadImgs: Index.petInfo.pet_img,
        route_image: Index.petInfo.route_image,
      })
      let range=this.data.range;
      range.forEach((item,index)=>{
        if (item.id == Index.petInfo.location_type)
        {
          this.setData({
            index: index
          })
        }
      })
    }
    if (src == 'look')
    {
      wx.setNavigationBarTitle({
        title: '宠物照片',
      })
      this.oid=oid;
      let that=this;
      Index.getPetInfo(this.oid, res=>{
     
        that.setData({
          petInfo: res,
          uploadImgs: res.pet_img,
          route_image: [res.route_image],
        })
        let range = that.data.range;
        range.forEach((item, index) => {
          if (item.id == res.location_type) {
            that.setData({
              index: index
            })
          }
        })
      })
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

  },
  //选择取货地址
  onSelectAddress({detail:{value}}){
    this.setData({
      index:value
    })
  },
  //添加宠物照片
  onUpload(){
    let uploadImgs = this.data.uploadImgs;
    wx.chooseImage({
      count: 9-uploadImgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        uploadImgs.push(...tempFilePaths);
        this.setData({
          uploadImgs
        })
      }
    })
  },
  //删除宠物照片
  onDel({ currentTarget: { dataset: { img}}}){
    let uploadImgs = this.data.uploadImgs;
    uploadImgs.splice(img, 1);
    this.setData({
      uploadImgs
    })
  },
  //预览图片
  onViewImg({ currentTarget: { dataset: { index } } }) {
    console.log(index)
    wx.previewImage({
      current: this.data.uploadImgs[index], // 当前显示图片的http链接
      urls: this.data.uploadImgs // 需要预览的图片http链接列表
    })
  },
  //预览图片
  onViewImg2({ currentTarget: { dataset: { index } } }) {
    console.log(index)
    wx.previewImage({
      current: this.data.route_image[index], // 当前显示图片的http链接
      urls: this.data.route_image // 需要预览的图片http链接列表
    })
  },
  //添加路线图
  onUploadRoutImg(){
    let route_image = this.data.route_image;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        route_image.push(...tempFilePaths);
        this.setData({
          route_image
        })
      }
    })
  },
  //删除路线图
  onDelRoutImg({ currentTarget: { dataset: { img } } }){
    let route_image = this.data.route_image;
    route_image.splice(img, 1);
    this.setData({
      route_image
    })
  },
  //提交信息
  onSubmit({detail:{value}}){
    // if (value.location_type == '') {
    //   wx.showToast({
    //     title: '请选择取货地点',
    //     icon: 'none'
    //   })
    //   return
    // }

    // if (value.location_name == '') {
    //   wx.showToast({
    //     title: '请输入位置或店名',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (value.pets_number == '') {
    //   wx.showToast({
    //     title: '请输入宠物数量',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (value.pets_info == '') {
    //   wx.showToast({
    //     title: '请输入宠物描述',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (this.data.uploadImgs.length==0) {
      wx.showToast({
        title: '请添加宠物照片',
        icon: 'none'
      })
      return
    }
    if (this.data.route_image.length == 0) {
      wx.showToast({
        title: '请添加路线照片',
        icon: 'none'
      })
      return
    }
    value.pet_img = this.data.uploadImgs;
    value.route_image = this.data.route_image;
    // console.log(value)
    // return
    Index.setPetInfo(value);
    wx.navigateBack({
      delta:1
    })
  }
})