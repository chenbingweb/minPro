import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool} from "../libs/Tool";
import cfg from "../config/config.json";
export default class myCenter extends Component
{
    constructor(props){
        super(props)
        this.state={
            
            cfg
        }
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    render(){
        return <div>
                测试
            </div>
    }
}