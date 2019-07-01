import React, { Component } from 'react';
import './scroll-x.css'
export default class ScrollX extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        console.log(this.props)
        return <div className="scroll_box_1 rr">
                    <div className="flex_start">
                    {
                        this.props.children
                    }
                    </div>
                </div>
    }
}