// components/playSound/playSound.js
import InnerAudio from "../../libs/InnerAudio.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    source:{
      type:String,
      value:'',
      observer:function(n,o){
        console.log(n,o)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src:'../../images/sound.png',
    
  },
  created(){
    this.arr = ['../../images/sound_0.png', '../../images/sound_1.png', '../../images/sound.png'];
    this.timmer=0;
    this.index=0;
    this.audio = new InnerAudio({
      onPlay:()=>{

        this.play()
      },
      onEnded:()=>{
        this.pause()
      },
      onError:()=>{
        this.pause()
      }
    })
    
  },
  ready(){
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if (this.properties.source)
      {
        this.audio.play(this.properties.source)
      }
      
    },
    play(){
      this.timmer=setInterval(()=>{
        this.setData({
          src: this.arr[this.index%3]
        })
        
        this.index++
      },200)
    },
    pause(){
      clearInterval(this.timmer);
      this.index = 0;
      this.setData({
        src: this.arr[2]
      })
    }

  }
})
