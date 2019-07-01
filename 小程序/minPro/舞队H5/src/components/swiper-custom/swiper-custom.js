import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './swiper-custom.css';
import {Tool} from "../../libs/Tool.js";
import cfg from "../../config/config.json";
import Skeleton from 'react-loading-skeleton';
export default class SwiperCustom extends Component
{
    constructor(props){
        super(props)
        this.state={
            swiperList:[],
            cfg
        }
    }
    async componentDidMount(){
        let { pagination }=this.props;
        let {cfg}=this.state;
        let {getBanner}=cfg.interface;
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            loop : true,
            pagination: {
                el:!pagination?'.swiper-pagination':'',
            },
          });
        let swiperList=await Tool.Post(getBanner,{});
        this.setState({
            swiperList:swiperList.data
        })
    }
    
    render(){
        let { swiperList,cfg:{ImgURL}}=this.state;
        let { pagination}=this.props;
        var slider=swiperList.map((item,index)=>{
            return <div key={'_index'+index} className="swiper-slide">
                    <img src={ImgURL+item.img_url}></img>
                    
                    </div>
        })
        return  swiperList.length==0?<Skeleton duration={2} height={'5.333333rem'}/>:
            <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            slider
                        }
                        
                    </div>
                    {
                       !pagination ? <div className="swiper-pagination"></div>:''
                    }
            </div>
            
        
    }
}