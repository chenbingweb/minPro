import axios from 'axios'
import baseConfig from "../config/config.json";
import qs from 'qs';
import {User} from "../model/user.js"
import createHistory from 'history/createBrowserHistory';

class Tool {
    constructor() {
        this.axios=axios;
        this.AxioConfig(this.axios);
    }
    AxioConfig(axios) {
        axios.defaults.timeout = 5000; //响应时间
		//application/json; charset=utf-8
	//	axios.defaults.headers.post['Content-Type'] ='application/json; charset=utf-8'; //配置请求头
	  //  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
	 
		if(User.userInfo.token && process.env.NODE_ENV=='development')
		{
			//   debugger
			//   console.log(User.userInfo.token)
			axios.defaults.headers.Authorization=User.userInfo.token;
		}
      
        axios.defaults.baseURL = baseConfig.BaseURL //配置接口地址
        //POST传参序列化(添加请求拦截器)
        axios.interceptors.request.use((config) => {
				
			if(User.userInfo.token && process.env.NODE_ENV !='development')
			{
			  //   debugger
			  //   console.log(User.userInfo.token)
				axios.defaults.headers.Authorization=User.userInfo.token;
			}
			
          
            //在发送请求之前做某件事
            // if (config.method === 'post') {
            //     config.data = qs.stringify(config.data);
            // }
            return config;
        }, (error) => {
            console.log({
                mes: '错误的传参',
                timeout: 1500
            });
           
            return Promise.reject(error);
        });

        //返回状态判断(添加响应拦截器)
        axios.interceptors.response.use((res) => {
            //如果然后状态码是404,则表示没有登录，需要后台返回跳转微信登录授权地址
            // if(res.data.errcode==404)
            // {
                
            //     document.location.replace(res.data.url)
            //     return Promise.reject(res);
            // }
            //对响应数据做些事
            if(parseInt(res.status)!=200)
            {
                console.log({
                    mes: res.msg || '服务器繁忙',
                    timeout: 1500
                });
               
                return Promise.reject(res.data);
            }
            
            return res;
        }, (error) => {
            console.log({
                mes: error.msg || '服务器繁忙',
                timeout: 1500
            });
            //window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
            return Promise.reject(error);
        });

    }
    //返回一个Promise(发送post请求)
    Post(url, params = {},path) {
		if(path)
		{
			axios.defaults.baseURL='https://www.easy-mock.com/mock/5cb42afcf533ef38c4649e2b/tiaowu'
			axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
		}
		else
		{
			axios.defaults.baseURL = baseConfig.BaseURL //配置接口地址
		}
        params = Object.assign({
            url: window.location.href.replace(/code[=]\w*/g,'code_=""'),
            token:sessionStorage.getItem('login')
        }, params)
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                 resolve(response.data);
                }, err => {
                    reject(err);
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    //返回一个Promise(发送get请求)
    Get(url, param) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: param
                })
                .then(response => {
                    resolve(response.data)
                }, err => {
                    reject(err)
                })
                .catch((error) => {
                    reject(error)
                })
        })
	}
	//获取url参数
	GetUrlPara(str)
	{
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) 
		{
			return unescape(r[2]); 
		}else
		{
			return null;
		}
		
	}
	//计算图片比例
	CountImgH(per,e,px=0){
        if(e)
        {
         //   console.log(e.offsetWidth)
          //  e.style.width=(e.offsetWidth -px) +'px';
            e.style.height=Math.ceil(((e.offsetWidth - px) / per) )+'px';
            return {w:e.offsetWidth+'px',h:e.style.height}
        }
	}
	CountImgW(per,e){
        if(e)
        {
      	  
 
            // e.style.width=Math.ceil(e.offsetHeight * per)+'px';
            // return {w:e.e.style.width+'px',h:offsetHeight}
        }
	}
	//微信支付
	WeiXinPay(data,callback,fail)
	{
		if(window.WeixinJSBridge)
		{
			data.package=data.packageValue;
			console.log(data)
			window.WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res){
				console.log(res)
				if (res.err_msg == "get_brand_wcpay_request:ok"){
					callback()
				}else{
					
					fail('取消支付')
					//alert(res.err_msg);
				}
			});
		}
		
	}
	temporaryRepair() {
        var currentPosition, timer;
        var speed = 1; //页面滚动距离
        timer = setInterval(function () {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= speed;
            window.scrollTo(0, currentPosition); //页面向上滚动
            currentPosition += speed; //speed变量
            window.scrollTo(0, currentPosition); //页面向下滚动
            clearInterval(timer);
        }, 1);

    }
	inputBlurScroll() {
        if (Array.isArray(navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i))) {
            let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
            let wechatVersion = wechatInfo[1];
            let str = navigator.userAgent.toLowerCase();
            let u = str.match(/cpu iphone os (.*?) like mac os/);
            let phoneVersion = u[1].replace(/_/g, ".");
            if (phoneVersion >= 12 || wechatVersion >= 6.7) {
                this.temporaryRepair()
            }
        }
	}
	//加载图片
	onloadImg(imgArr,callback){
		//{key:'',key2:''}
	
		let i=0;
		let arr=[]
		innerImg()
		function innerImg(){
			if(i>=imgArr.length)
			{
				callback(arr)
			}
			var img=new Image()
			img.src=imgArr[i];
			img.setAttribute("crossOrigin",'Anonymous')
			img.onload=function(){
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				//compressedDataUrl = canvas.toDataURL(); canvas.toDataURL()
				arr.push(canvas.toDataURL())
				i++
				innerImg()
				
			}
		}
	}
	//倒计时
	countTime(time=60){
		let timmer= null;
		return (callback)=>{
			timmer = setInterval(()=>{
				
				if(callback)
				{
					if(time<=0)
					{
						clearInterval(timmer)
						timmer = null;
						return
					}
					time--;
					callback(time)
				}
			},1000)
		}
	}
	//获取验证码
	getCode(mobile,callback){
		let { interface:{sendCode}}=baseConfig;
		this.Post(sendCode,{mobile}).then(res=>{
			callback && callback(res)
		}).catch(err=>{
			console.log(err)
		})
	}
	//验证验证码
	checkCode(mobile,code,callback){
		let { interface:{checkCode}}=baseConfig;
		this.Post(checkCode,{mobile,code}).then(res=>{
			callback && callback(res)
		}).catch(err=>{
			console.log(err)
		})
	}
}
let tool = new Tool();
let  History = createHistory();
export { tool as Tool,History}

/** 
 * 
 * 	//表单序列化 subInfo=$("form").serializeArray()
	function serializeObj(subInfo){
		var subInfoObj={};
		if($.type(subInfo)=='array')
		{
			$.each(subInfo,function(index,item){
						subInfoObj[item.name]=item.value
			})
		}
		return subInfoObj
	}
	//把时间戳转换成正常时间
	function formatTime(date, str, showTime) {
	  var year = date.getFullYear()
	  var month = date.getMonth() + 1
	  var day = date.getDate()

	  var hour = date.getHours()
	  var minute = date.getMinutes()
	  var second = date.getSeconds()
	  //转换成yyyy-m-d
	  var format = [year, month, day].map(ormatNumber).join(str);
	  if (showTime) {
	    //转换成yyyy-m-d h:m
	    format = [year, month, day].map(ormatNumber).join(str) + ' ' + [hour, minute].map(ormatNumber).join(':');
	  }
	  return format
	}
	//时间补位
	function ormatNumber(n) {
	  n = n.toString()
	  return n[1] ? n : '0' + n
	}
	//本地储存数据
	function setLocalStorage(key,value,callback,flag){
			//临时本地储存
			if(flag)
			{
				sessionStorage.setItem(key,value);	
			}
			//永久本地储存
			else
			{
				localStorage.setItem(key,value);
			}
			//执行回调函数
			if($.type(callback)=='function')
			{
				callback()
			}	 
	} 
	//读取本地信息
	function getLocalStorage(key,callback,flag){
		var data=null;
		//读取临时数据
		if(flag)
		{
			data=sessionStorage.getItem(key);
		}
		//读取永久数据
		else
		{
			data=localStorage.getItem(key);
		}
			//执行回调函数
		if($.type(callback)=='function')
		{
			callback(data)
		}
	} 
	//移除数据
	function removeLocaLStorage(key,callback,flag){
		if(flag)
		{
			sessionStorage.removeItem(key);
		}
		else
		{
			localStorage.removeItem(key);
		}
			//执行回调函数
		if($.type(callback)=='function')
		{
			callback()
		}
	}
 * 
*/