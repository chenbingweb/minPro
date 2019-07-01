
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,NavLink } from "react-router-dom"
// import $ from  'jquery'
import NavBar from "../components/nav-bar/nav-bar";
import {PageWap} from "../components/pro-step/pro-step"
import "../css/home.css";
import ScrollX from "../components/scroll-x/scroll-x";
import  {Tool} from "../libs/Tool";
import cfg from "../config/config.json";
import Skeleton from 'react-loading-skeleton';

const wx=window.wx;
const $=window.$;
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            activeList:[],
            rankList:[],
            recommList:[],
            cfg
        }
        this.page_size=10;
        this.page_num=1;
        this.pageFlag=false;
    }
    componentDidMount() {
       // this.getActiveList()
        let that=this;
        $(window).scroll(function (e) {
            if(!that.pageFlag) return
           

            var viewHeight = $(this).height(); //可见高度  
            var contentHeight = $(".homepage").get(0).scrollHeight; //内容高度  
            var scrollHeight = $(this).scrollTop(); //滚动高度  
            if (scrollHeight / (contentHeight - viewHeight) >= 1) { //到达底部100%时,加载新内容 
               console.log(23)
               that.page_num+=1;
              // that.getActiveList()
            }
        })

        let { foodRange,recommontFood}=this.state.cfg.interface;
        
       // let rankList= await Tool.Post('/api/getSlider',{});
        // let rankList= await Tool.Post(foodRange,{});
        // let recommList=await Tool.Post(recommontFood,{});
        // this.setState({
        //     rankList:rankList.data||[],
        //     recommList:recommList.data||[]
        // })
        // console.log(rankList)
      
    }
    componentWillUnmount(){
        $(window).unbind()
    }
    //获取活动列表
    getActiveList(){
     //   let { getActiveList }=this.state.cfg.interface;
        let { cfg:{interface:{getActiveList}},activeList}=this.state;
        Tool.Post(getActiveList,{
            page_size:10,
            page_num:this.page_num
        },true).then(res=>{
           
            if(res.errcode==0)
            {
                let list=res.data
                if(activeList.length==0)
                {
                    if(list.length>=this.page_size)
                    {
                        
                        this.setState({
                            activeList:list
                        },()=>{
                            this.pageFlag=true;
                        })
                    }
                    else
                    {
                        this.pageFlag=false;
                    }
                }
                else
                {
                    activeList.push(...list);
                    if(list.length<this.page_size)
                    {
                       
                        this.setState({
                            activeList:activeList
                        },()=>{
                            this.pageFlag=false;
                        })
                       
                    }
                    else
                    {
                        this.setState({
                            activeList:activeList
                        },()=>{
                            this.pageFlag=true;
                        })
                    }
                }
            }
        }).catch(err=>{

        });
    }
    getList=(val)=>{
        val.forEach(item =>{
            item.end_time=item.end_time.split(' ')[0].replace(/-/g,'.');
            item.start_time=item.start_time.split(' ')[0].replace(/-/g,'.');
        })
         let {activeList}=this.state;
         activeList=[...activeList,...val||[]]
        this.setState({
            activeList
        })
    
    }
    render(){
        let {cfg:{ImgURL},activeList,cfg:{interface:{getActiveList}}}=this.state;
        let doing="#e1213d";
        let finish="#bebebe";
        // if(activeList.length==0) return <div className="no_data">暂无数据</div>
        return <PageWap    className="homepage"
                            isScroll={true} 
                            callBack={this.getList}
                            loaderClass="loaderClass"
                            path={getActiveList}
                            >
                    {
                        activeList.map((item,index)=>{
                            return <Link  key={'item_'+index} to={{
                                            pathname: "/activeDetail",
                                            search: "?id="+item.id,
                                            hash: "",
                                            state:{ id:item.id}
                                            }} className="item">
                            <div className="flex_center item_img_box">
                                <img src={item.activity_img_url}></img>
                                {
                                    item.active_status!='' ? <span className="label_status" style={{background:item.active_status=='已结束'?finish:doing}}>{item.active_status}</span> :''
                                }
                               
                            </div>
                            <div className="flex_between active_item_box">
                                <div className="team_title">
                                    <p className="one_line">{item.activity_name}</p>
                                    <p>{item.start_time}-{item.end_time}</p>
                                </div>
                                <div className="acitive_statue">
                                    <p>{item.province}-{item.city}</p>
                                    {
                                        //0 已结束 1 未开始 2进行中
                                        item.sign_up_status!=''?<p>{item.sign_up_status==1 ? '未开始报名' : item.sign_up_status==0 ? '报名已截止' : item.sign_up_status==2 ? '进行中' :'' }</p>:item.join_num
                                    }
                                  
                                </div>
                            </div>
                    </Link>
                        })
                    }
                
                    <NavBar currentIndex={0}/>
              </PageWap>


    }
}
/** 
 * 
 *  <div className="header_box">
                     <SwiperCustom pagination={true}></SwiperCustom>

                      <NavLink params={{k:2}} to={{
    pathname: "/activeDetail",
    search: "",
    hash: "",
    state: { id: 2 }
  }}>
                     <p  className="to_btn" ></p></NavLink >
                     
                     
                    </div>
                    <div className="rank" onClick={e=>{
                         if(wx)
                         {
                            wx.chooseImage({
                                count: 1, // 默认9
                                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                                success: function (res) {
                                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                }
                            });
                         }
                     }}>
                        <p className="flex_center title_item"><span>菜品排行</span></p>
                    </div>
                    <ScrollX>{rank}</ScrollX>
                    <div className="rank">
                        <p className="flex_center title_item"><span>推荐菜品</span></p>
                    </div>
                    <div className="recomm_box flex_between">
                    {
                        recomm
                    }
                    </div>
                  
 * 
*/