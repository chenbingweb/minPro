// pages/tongTianTa/component/right-3v3/right-3v3.js
import { math } from "../../libs/core/math";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    plays: {
      type: Array,
      value: []
    },
    //分数
    score: {
      type: Number,
      value: 0
    },
    //进度条是否显示
    showprocess: {
      type: Boolean,
      value: true
    },
    //百分比
    progress: {
      type: Number,
      value: 0
    },
    
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setProgress(value) {
      value = math.clamp(value, 0, 1);
      // this.properties.progress = value;
      this.setData({
        progress: value
      })
    },
  }
})
