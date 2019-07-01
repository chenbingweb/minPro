import React, { Component} from 'react';
import NavBar from "../components/nav-bar/nav-bar";
import { BrowserRouter as Router, Route, Link,NavLink } from "react-router-dom";
import { Tool } from "../libs/Tool"
import "../css/myCenter.css";
import { User } from "../model/user"
import cfg from "../config/config.json";
export default class myCenter extends Component{
    constructor(props){
        super(props);
        this.state={
            navItem:[
           
            ],
            userInfo:{},
            cfg,
            team_name:''
        }
    }
    async componentDidMount(){
        //获取个人信息
        let { cfg:{interface:{getMemberInfo}}}=this.state;
        let result = await Tool.Post(getMemberInfo,{});
        if(result.errcode==0)
        {
            console.log(result.data.teamName)
             this.setState({
                userInfo:{
                 //   ...User.getUserInfo(),
                    ...result.data
                },
                team_name:(result.data.teamName)+'-'+(result.data.role=='team_member'?'队员':'队长')
                
             },()=>{
                 console.log(this.state.userInfo)
             })
        }
       
    }
    
    render(){
        let {userInfo}=this.state;
        let options=''
        if( userInfo.team_name_array)
        {
            options =  userInfo.team_name_array.map((item_child,index)=>{
                
                            return  <option key={'_'+index} defaultValue={
                                            (item_child)+'-'+ (userInfo.role=='team_member'?'队员':'队长')
                                    } >{ (item_child)+'-'+ (userInfo.role=='team_member'?'队员':'队长')}</option>
                         })
        }
       
        return <div className="my_center">
                    <div className="my_center_bg">
                        <div className="user_info_panel">
                            <div className="photo_img">
                                <img src={userInfo.avatar}></img>
                                {
                                    userInfo.role=='captain'? <span className="label_num g_l_r">{userInfo.team_number}支舞队</span>:''
                                }
                               
                            </div>
                            <p className="nick_name">{userInfo.nickname}</p>
                            {
                            //    <p className="team_name" style={{
                            //        color:(!userInfo.dance_member) && userInfo.role =='captain' ? '#bbb':'#3a3a3a'
                            //    }}>{userInfo.teamName}-{userInfo.role=='team_member'?'队员':'队长'}
                                
                            //    </p>
                                <div className="relative_1">
                                    <p className="team_name" style={{
                                        color:(!userInfo.dance_member) && userInfo.role =='captain' ? '#bbb':'#3a3a3a'
                                    }}>{
                                        this.state.team_name
                                    }
                                    </p>
                                    {
                                        userInfo.role =='captain' ?  <span className="select_1"></span> :''
                                    }
                                   
                                    {
                                    userInfo.role =='captain' ?  <select  onChange={e=>{
                                        e.stopPropagation();
                                        this.setState({
                                            team_name:e.target.value
                                        })
                                        console.log(e.target.value)
                                    }} className="absolute_1 " style={{margin:'0 auto',display:'block',textAlign:'center'}}>

                                        {
                                           options
                                            // userInfo.team_name_array.map(item_child=>{
                                            //     return  <option defaultValue={
                                            //             item_child+'-'+ (userInfo.role=='team_member'?'队员':'队长')
                                            //                 } ></option>
                                            // })
                                        }
                              
                                   
                                     </select>:''
                                    }
                                </div>
                           
                              
                            }
                            {
                                (!userInfo.dance_member) && userInfo.role =='captain' ? <p style={{"lineHeight": "0.2rem"}} className="team_name"> 舞队尚未建立成功，舞队成员少于6 </p> : ''
                            }
                        </div>
                        <ul className="nav_items">
                            <li className="flex_between">
                                <Link className="flex_between" style={{width:'100%'}} to={
                                    {
                                        pathname: '/personinfo',
                                        state:userInfo
                                    }}> 
                                        <span>个人信息</span>
                                        <span className="arrow_img flex_center"></span>    
                                </Link>
                                    
                               
                                
                            </li>
                        </ul>
                    </div>
                   
                    <NavBar  currentIndex={1}/>
              </div>
    }
}
