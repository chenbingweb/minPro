<?php
$this->title = '抽奖首页';
?>
<style>
    html {
        overflow-y: scroll;
    }

    body {
        background: url('/lucky/images/lottery_bg.jpg')no-repeat !important;
        background-size: 100% 100% !important;
        background-position: center center !important;
        /* height: 100%; */
        overflow: hidden;

    }
    .weui-toast{
        z-index:999999999!important;
        min-height: 8.6em!important;
    }
    .lottery_content_btn{
        cursor: pointer;
    }
</style>
<div id="lottery" class="lottery">
    <div class="select_shop right">
        <select class="iconcenter" id="shopSelect" onchange="changeShopId()">
            <?php foreach ($shopList as $key=>$list):?>
            <option value="<?=$key?>"><p style="text-align:center;"><?= $list?></p></option>
            <?php endforeach;?>
        </select>
    </div>
    <div class="title" id="showShop">
        我的门店ID：<?= current(array_keys($shopList))?>
    </div>
    <div class="line_box"></div>
    <!-- 抽奖转盘 -->
    <div class="lottery_turntable_position">
        <div class="lottery_turntable iconcenter">
            <img class="lottery_content_article" src="/lucky/images/lottery_content_article.png" alt="">
            <a id="lottery_content_btn" class="lottery_content_btn" href="javascript:;"><img class="" style="width:100%;height:100%;" src="/lucky/images/lottery_content_btn.png" alt=""></a>
        </div>
    </div>
    <!-- 说明 -->
    <div class="explanation">
        <img class="explanation_title" src="/lucky/images/explanation_title.png" alt=""> 礼品分为实物礼品及兑换券礼品两种：

        <br/> 抽中实物礼品者：
        <br/> 会由工作人员联系门店，进行线下核发
        <br/> 抽中兑换券礼品者：
        <br/> 实时发放兑换码，需要抽奖者自行兑换
        <br/>
    </div>

</div>
<div class="model" >

</div>
<div class="model_box">
    <div class="first_binggo  first_success">
        <img src="/lucky/images/bingo_title.png" class="title" alt="">
        <p>恭喜您中了奖！</p>
        <span>限量版i7-8086k一颗</span>
        <img class="shop_head" src="" alt="">
        <button onclick="hideModel()">确定</button>
    </div>
    <div class="first_card">
        <img src="/lucky/images/bingo_title.png" class="title" alt="">
        <p>恭喜您获得！</p>
        <span class="content">京东10元E卡一张</span>
        <img class="model_card" src="/lucky/images/model_card.png" alt="">
        <div class="box">
            <span class="txt">兑换码</span>
            <span class="num " id="copyNum">null</span>
        </div>
        <button id="copyBtn" class="copyBtn" data-clipboard-target="#copyNum">复制兑换码</button>
        <button onclick="hideModel()">确定</button>
    </div>
    <div class="first_binggo first_error">
        <img src="/lucky/images/bingo_title.png" class="title" alt="">
        <p style="margin-top:1rem;">当前活动太火爆</p>
        <span>请点击重试</span>
        <!-- <img class="shop_head" src="" alt=""> -->
        <button onclick="hideModel()" id="errorBtn">确定</button>
    </div>
    <div class="first_binggo first_repeat">
        <img src="/lucky/images/bingo_title.png" class="title" alt="">
        <p style="margin-top:2rem; font-size: 0.40667rem">您还没有店铺，暂时不能抽奖</p>
    </div>

</div>
<script>

    $(document).ready(function(){
        if(<?= $is_null?>){
            repeatModel()
        }
    });
    alert('最新一版，')
    var oPointer = document.getElementsByClassName("lottery_content_btn")[0];
    var oTurntable = document.getElementsByClassName("lottery_content_article")[0];
    var cat = 60,
        data = {"shopId":<?= current(array_keys($shopList))?>};
    var counter = 1;
    var nowCli = false
    // oPointer.onclick = function () {
    //     checkLucky();
    //     if(nowCli){
    //         return
    //     }
    //     nowCli = true
    //     counter = 0;
    //     Obj.n = 0
    //     // $('.lottery_content_article').addClass('rot')
    //     Obj.start()
    // }
    $('.lottery_turntable').on('click','.lottery_content_btn',function(){
        alert('进入点击事件')
        checkLucky();
        if(nowCli){
            return
        }
        nowCli = true
        counter = 0;
        Obj.n = 0
        Obj.start()
    })
    var Obj = {
        n: 0,
        cat: 60,
        deg: 0,
        timer: null,
        callBack: null,
        rot: 3,
        i: 0,
        flag: false,
        init: function () {
            clearInterval(this.timer)
            this.rotate()
        },
        start: function () {
            this.init()
            var t = this.random(800, 1000);
            console.log(t)
            setTimeout(function () {
                ajax()
            }, t)
        },
        rotate: function () {
            var that = this;

            this.timer = setInterval(function () {
                //console.log(that.rot)
                that.i++
                    if (that.flag && that.i % 30 == 0) {
                        that.reduce()
                    }
                that.deg += that.rot;

                that.checkDeg(that.n)

                if (that.deg >= 360) {
                    that.deg = 0
                }
                // console.log(that.deg)
                oTurntable.style.transform = 'rotate(-' + that.deg + 'deg)'
            }, 0.5)
        },
        reduce: function () {
            var that = this;

            if (that.rot < 0.3 ) {
                that.rot = 0.3;
                               
                // clearInterval(that.timer_2)
            }
            that.rot -= 0.1;

            // that.add=Math.floor
            console.log(that.rot)
        },
        checkDeg: function () {
            var that = this;
            if (this.n && parseInt(this.deg) == this.n * this.cat) {
                clearInterval(this.timer)
                that.rot=3
                that.i = 0;
                that.flag = false;
                setTimeout(function () {
                    this.timer = null
                    that.callBack()
                }, 1000)
            }
        },
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
    function ajax() {
        $.ajax({
            url: '/lucky/index/go',
            data: data,
            type: 'post',
            dataType:'json',
            success: function (res) {
                console.log(res)
                var counter = 0;
                Obj.flag = true
                setTimeout(() => {
                    if (res.errcode == 0) {
                    res.lucky_id = changeId(res.lucky_id)
                    console.log(res)
                    Obj.n = res.lucky_id;
                    Obj.callBack = function () {
                        nowCli = true
                        pd(res.lucky_id, res.code || '')
                    }
                } else {
                    Obj.n = 6
                    Obj.callBack = function () {
                        console.log(res.msg);
                        nowCli = false
                        errorModel(res.msg)
                    }
                }
                }, 2200);
                

            },
            error: function (err) {
                Obj.n = 6
                Obj.callBack = function () {
                    nowCli = false
                    errorModel('当前活动太火爆')
                }
            }
        })
    }
    // 判断是几等奖
    function pd(id, value) {
        if (id == 6) {
            $('.first_binggo p').html('恭喜您中了一等奖！')
            $('.first_binggo span').html('限量版i7-8086k一颗')
            $('.first_binggo .shop_head').attr('src', '/lucky/images/jp_1.png')
            firstShow()

        } else if (id == 1 || id == 3 || id == 5) {
            $('#copyNum').html(value)
            lastShow()
        } else if (id == 2) {
            $('.first_binggo p').html('恭喜您中了二等奖！')
            $('.first_binggo span').html('博朗料理机一台')
            $('.first_binggo .shop_head').attr('src', '/lucky/images/jp_2.png')
            firstShow()

        } else if (id == 4) {
            $('.first_binggo p').html('恭喜您中了三等奖！')
            $('.first_binggo span').html('小米蓝牙音箱一台')
            $('.first_binggo .shop_head').attr('src', '/lucky/images/jp_3.png')
            firstShow()

        } else {
            errorModel('当前活动太火爆')
        }
    }
    //实体奖励
    function firstShow() {
        $('.model,.model_box,.first_success').addClass('show')
        document.getElementsByTagName("html")[0].style.overflow = 'hidden'
    }
    //10元卡
    function lastShow() {
        $('.model,.model_box,.first_card').addClass('show')
        document.getElementsByTagName("html")[0].style.overflow = 'hidden'
        var clipboard = new Clipboard('.copyBtn');
        clipboard.on('success', function () {
            $.toast("复制成功");
        })
    }

    function hideModel() {
        document.getElementsByTagName("html")[0].style.overflow = ''
        $('.model,.first_card,.model_box,.first_error').removeClass('show')
        $('.first_success').removeClass('show');
    }
    function hideModelCB(id,value) {
        document.getElementsByTagName("html")[0].style.overflow = ''
        $('.model,.first_card,.model_box,.first_error').removeClass('show')
        pd(id, value)
    }
    function errorModel(msg){
        $('.first_error p').html(msg)
        if(msg == '该店铺已抽过奖品'){
            $('.first_error span').html('&nbsp;')
        }else{
            $('.first_error span').html('请点击重试')
        }
        $('.model,.model_box,.first_error').addClass('show')
        document.getElementsByTagName("html")[0].style.overflow = 'hidden'
    }
    function repeatModel(){
        $('.model').attr('onclick','javascript:void(0);');
        $('.model,.model_box,.first_repeat').addClass('show')
        document.getElementsByTagName("html")[0].style.overflow = 'hidden'
    }

    function changeId(id) {
        switch (id+'') {
            case "1":
                return 6;
                break;
            case "2":
                return 2;
                break;
            case "3":
                return 4;
                break;
            default:
                return 1;
                break;
        }
    }
    function changeShopId() {
        var id =$("#shopSelect").children('option:selected').val();
        $("#showShop").html(" 我的门店ID："+id);
        data = {"shopId":id};
        checkLucky();
    }
    function checkLucky() {
        $.ajax({
            url:'/lucky/index/check-lucky',
            data:data,
            dataType:'json',
            type:'post',
            success:function (res) {
                if(res.errcode == 2){
                    nowCli = true;
                    errorModel('该店铺已抽过奖品');
                    $("#errorBtn").attr('onclick','hideModelCB('+changeId(res.lucky_id)+',\''+res.code +'\')')
                }else if(res.errcode == 1){
                    nowCli = true;
                    errorModel('该店铺已抽过奖品');
                }else{
                    nowCli = false;
                }
            }
        });
    }
    checkLucky();
</script>