import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import "./swiper-select.css"
export default class SwiperSelect extends Component
{
    constructor(props){
        super(props)
        this.state={
            pagination:false
      
        }
        this.swiper_box=React.createRef()
    }
    componentDidMount(){
        console.log(this.swiper_box)
        setTimeout(()=>{
            let {pagination}=this.state;
            new Swiper('.swiper-container', {
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
        },5000)
       
    }
    
    render(){
        let {pagination}=this.state;
        
        return <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">Slide 1</div>
                        <div class="swiper-slide">Slide 2</div>
                        <div class="swiper-slide">Slide 3</div>
                    </div>

                    <div class="swiper-pagination"></div>
                </div>

    }
}