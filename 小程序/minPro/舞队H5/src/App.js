import React, { Component } from 'react';
import {User} from "./model/user"
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";//HashRouter  BrowserRouter public/index.html

import  {Tool,History} from "./libs/Tool";
import cfg from "./config/config.json";
import "./index.css"
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole

import Home from "./view/home";
import MyCenter from "./view/myCenter";

import EntryPage from "./view/entryPage";
import ActiveDetail from "./view/activeDetail";
import SignUp from "./view/signUp";
import EditTeam from "./view/editTeam";
import PersonInfo from "./view/personInfo"
import Register from "./view/register"

import {WXFN} from "./libs/wxFn.js"
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLogin:false
    }
    if(process.env.NODE_ENV!='development')
    {
      new VConsole() // 初始化
    }
   
    console.log('first')
    User.NavHomeEvent.On(this,()=>{
      this.setState({
        Authentication:true
      },()=>{
        History.push('/')
        })
    })
   // this.login()
  }
  componentDidMount(){
  //  sessionStorage.setItem('login',true);
    WXFN.WXLogin(()=>{
     // alert(JSON.stringify(User.userInfo))
      this.setState({
        isLogin:true
      })
    })
  }
  
  
  render() {
    let { isLogin }=this.state;
    let {Authentication}=User.userInfo;
    if(isLogin==false) return <div style={{color:'#333'}}></div>
    
    return (
      <Router basename="">
       {
         !Authentication? <EntryPage/> :<Switch>
           
         <Route exact path="/"  render={({location:{pathname}})=>{
            document.title="精彩活动"
             if( /(Android)/i.test(navigator.userAgent) )
             {
               WXFN.InitJsTicket()
             }
             
               return <Home/>
           
           
         }} ></Route>
         <Route exact path="/myCenter" render={()=>{
           document.title="个人中心"
            if( /(Android)/i.test(navigator.userAgent) )
            {
              
               WXFN.InitJsTicket()
            }
             return <MyCenter/>
         }}></Route>
         <Route exact path="/activeDetail"  render={(param)=>{
            sessionStorage.removeItem("teamList");
            if( /(Android)/i.test(navigator.userAgent) )
            {
              WXFN.InitJsTicket()
            }
            return <ActiveDetail/>
         }}>
         </Route>
         <Route exact path="/signup" render={(param)=>{
               document.title="舞队报名"
              if( /(Android)/i.test(navigator.userAgent) )
              {
                WXFN.InitJsTicket()
              }
              return <SignUp/>
          }}>
         </Route>
        <Route exact path="/editteam" render={(param)=>{
            document.title="舞队详情"
            if( /(Android)/i.test(navigator.userAgent) )
            {
              WXFN.InitJsTicket()
            }
            return <EditTeam/>
        }}>
       </Route>
       <Route exact path="/personinfo" render={(param)=>{
            document.title="个人信息"
            let {location:{state}}=param;
            if( /(Android)/i.test(navigator.userAgent) )
            {
              WXFN.InitJsTicket()
            }
            return <PersonInfo userInfo={state}/>
        }}>
       </Route>
       <Route exact path="/register" render={(param)=>{
         
          if( /(Android)/i.test(navigator.userAgent) )
          {
            WXFN.InitJsTicket()
          }
          return <Register />
      }}>
     </Route>
     
       </Switch>
       }
        
        
      </Router>
    )
     
    
  }
}

export default App;
