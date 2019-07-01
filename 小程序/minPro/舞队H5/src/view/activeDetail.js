import React, { Component } from 'react';
import cfg from "../config/config.json";
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import "../css/activeDetail.css";
import { User } from "../model/user";
import {Tool} from "../libs/Tool";
import {PageWap} from "../components/pro-step/pro-step"
import VoteTeam from "../components/VoteTeam/VoteTeam"
import Banner from "../images/static/banner.jpg"
const wx=window.wx;
const $=window.$;
export default class ActiveDetail extends Component
{
    constructor(props){
        super(props);
        this.state={
            tabIndex:0,
            activeDetail:{},
            joinLTeamList:[],
            cfg
        }
  
        this.page_num=0;
    }
    //tab切换
    onTabClick(index){
        
        this.setState({
            tabIndex:index
        },()=>{
 
            // if(this.state.tabIndex==1)
            // {
           
            //     let that=this;
            //     $(window).scroll(function (e) {
            //         console.log(233)
            //         if(!that.pageFlag) return
                
            //         var viewHeight = $(this).height(); //可见高度  
            //         var contentHeight = $(".active_detail").get(0).scrollHeight; //内容高度  
            //         var scrollHeight = $(this).scrollTop(); //滚动高度  
            //         if (scrollHeight / (contentHeight - viewHeight) >= 1) { //到达底部100%时,加载新内容 
            //            console.log(23)
                     
            //         }
            //     })
            // }
            // else
            // {
            //     $(window).unbind()
            // }
            
        })
       
    }
    async componentDidMount(){
        User.updataUserInfo()
        let { cfg:{interface:{activeDetail}}}=this.state;
        let aid=Tool.GetUrlPara('id');//获取活动id
        $.showLoading()
        let result = await Tool.Post(activeDetail,{id:aid});
        $.hideLoading()
        if(result.errcode==0)
        {
            this.setState({
                'activeDetail':result.data
            })
        }
      


    }
    //获取参加舞队列表
     getJoinList= (data)=>{
         console.log(data)
         let {joinLTeamList}=this.state;
         joinLTeamList.push(...data)
        this.setState({
            joinLTeamList
        })
        // let { cfg:{interface:{joinTeamList}}}=this.state;
        // let result = await Tool.Post(joinTeamList,{
        //     page_size:10,
        //     page_num:++this.page_num
        // },true);
        // if(result.errcode==0)
        // {
        //     let data=result.data;
            
        // }
        
    }

    render(){
        let {tabIndex,activeDetail, cfg:{interface:{joinTeamList}}}=this.state;
        if(!activeDetail.activity_name) return <div className="no_data">暂无数据</div>;

        return <PageWap className="active_detail" 
                            isScroll={tabIndex==1} 
                            callBack={this.getJoinList}
                            loaderClass="loaderClass"
                            param={{id:Tool.GetUrlPara('id')}}
                            path={joinTeamList}>
                    <p className="banner_box">
                        <img src={activeDetail.activity_img_url}></img>
                    </p>
                    <div className="active_info">
                        <p className="title one_line" >{activeDetail.activity_name}</p>
                        <div className="active_role_box">
                            <p className="active_role_title">活动规则： </p>
                            <p className="flex_start role_item"> 
                                <span>活动时间：</span>
                                <span>{activeDetail.activity_start_time.split(' ')[0].replace(/-/g,'.')}-{activeDetail.activity_end_time.split(' ')[0].replace(/-/g,'.')} {activeDetail.activity_status_name}</span></p>
                            <p className="flex_start role_item">
                                <span>报名时间：</span>
                                <span>{activeDetail.sign_start_time.split(' ')[0].replace(/-/g,'.')}-{activeDetail.sign_end_time.split(' ')[0].replace(/-/g,'.')} {activeDetail.sign_up_status_name}</span></p>
                            <p className="flex_start role_item">
                                <span>活动地址：</span>
                                <span>{activeDetail.activity_address}</span>
                                </p>
                            <p  className="flex_start role_item">
                                <span>人数限制：</span>
                                <span>最少{activeDetail.sign_person_num_min}人，最多{activeDetail.sign_person_num_max}人</span>
                            </p>
                        </div>
                    </div>
                    <div className="tab_bar flex_center">
                            <div className={tabIndex==0?'tab_item active':'tab_item'} onClick={e=>{
                                e.stopPropagation()
                                this.onTabClick(0)
                            }}>活动详情</div>
                            <div   className={tabIndex==1?'tab_item active':'tab_item'} onClick={e=>{
                                e.stopPropagation()
                                this.onTabClick(1)
                            }}>报名舞队</div>
                    </div>
                    <p className="vote_tip">{activeDetail.has_sign_total_person}支舞队参与，您可以为支持的舞队投票</p> 
                    <div style={{display:tabIndex==0?'block':'none',paddingBottom:30/75+'rem'}}>
                        <div className="rich_detail" dangerouslySetInnerHTML={{__html:activeDetail.detail_rich}}>
                                

                        </div>
                        {/* submit_btn_active submit_btn_no   a == 10 ? 10 :(a ==20 ?  20 :'未知')  0未开始报名 1我要报名 2已截止报名 3活动已结束*/
                        
                         activeDetail.active_status==1 && User.userInfo.role=='captain'  ?<Link className="submit_btn_active" to={{
                                                    pathname: "/signup",
                                                    search: `id=${activeDetail.id}`,
                                                    hash: "",
                                                    state:{ }
                                                }}>我要报名</Link> 
                                                : activeDetail.active_status==0 && User.userInfo.role=='captain'? 
                                                <div className="submit_btn_no">未开始报名</div>
                                                :activeDetail.active_status==2 && User.userInfo.role=='captain'?
                                                <div className="submit_btn_no">已截止报名</div>
                                                :<div className="submit_btn_no" style={{display:User.userInfo.role=='captain'?'block':'none'}}>活动已结束</div>
                        
                        }
                        
                    </div>
                
                    <VoteTeam tabIndex={tabIndex}  joinLTeamList={this.state.joinLTeamList}></VoteTeam>

                    {/* <Suport/> */}
                   
            </PageWap>
    }
}


