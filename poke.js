$(function () {
/*
* 1.先产生一副扑克牌
*
* */
    let poke=[]
    let colorArr=['s','h','d','c'];
    // let flag={'h_7':true,'s_9':true};
    let flag={};
    let box=$('.box');
    // for(let i=0;i<52;i++){
    //     let index=Math.floor(Math.random()*colorArr.length);
    //     let color=colorArr[index];
    //     let number=Math.round( Math.random()*12+1);
    //     // poke.push({color,number});
    //
    //     while(flag[color+'_'+number]){
    //         index=Math.floor(Math.random()*colorArr.length);
    //         color=colorArr[index];
    //         number=Math.round(Math.random()*12+1);
    //     }
    //     poke.push({color,number});
    //     flag[color+'_'+number]=true;
    // }
    // console.log(poke);



    while(poke.length<52){
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        let number=Math.round( Math.random()*12+1);

        if(!flag[color+'_'+number]){
            poke.push({color,number});
            flag[color+'_'+number]=true;
        }
        // console.log(poke);
    }

    /*发牌
    * （1,1）
    * */
    let index=-1;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            // $('<div>').css{width:90,height:120,background:'#08FF93',position:'absolute'})
            index++;
            let obj=poke[index];
            let lefts=350-50*i+100*j,tops=50*i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .html('')
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*65)
                .animate({left:lefts ,top:tops,opacity:1})
        }
    }

    for(;index<52;index++){
        let obj=poke[index];
        $('<div>').addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .attr('id','-2_-2')
            .data('number',obj.number)
            .html('').appendTo('.box')
            .delay(index*65)
            .animate({left:0,top:480,opacity:1})
    }
    // $('.box').on('click','.poke',function () {
    //     //(i,j)
    //     //(1+i,j)(i+1,j+1)
    //     $(this).animate({top:'-=30px'})
    // })
    let first=null;
    box.on('click','.poke',function () {
        let _this=$(this);
        let [i,j]=_this.attr('id').split('_');
        // console.log(i,j);
        let id1=i*1+1+'_'+j , id2=i*1+1+'_'+(j*1+1);
        // console.log(i, j);
        // console.log(id1);
        // console.log($('#' + id1));
        //强制类型转换Number(i)  parseInt()
        //隐式类型转换
        if($('#' + id1).length||$('#' + id2).length){
            return;
        }
        // console.log(typeof $('#' + id1));
        /*
        * 选中   active
        * 未选中，加上类抬起
        * */
        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'})
        }else{
            $(this).addClass('active').animate({top:'-=30px'})
        }

        // console.log(_this.data('number'));
        /*
        * 判断一次点数，两张牌算一次点数
        * */
        if(!first){
            first=_this;
        }else{
            //判断
            // console.log(first.data('number'), _this.data('number'));
            let number1 = first.data('number'),number2 = _this.data('number');
            if(number1+number2===14){
                $('.active').animate({top:'0',left:'710',opacity:0},function () {
                    $(this).remove();
                });
            }else{
            //    first _this   active
                $('.active').animate({top:'+=30'},function () {
                    $(this).removeClass('active');
                })
            }
            first = null;
        }
    })
//切换
    let n=0;
    $('.rightBtn').on('click',function () {
        //选择
        // $('.left:last')
        //过滤，筛选
        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('left').addClass('right');
        });
    });


    let a=0;
    $('.leftBtn').on('click',function () {
        //选择
        // $('.left:last')
        //过滤，筛选
        $('.right').last().css('zIndex',a++).animate({left:0},function () {
            $(this).removeClass('right').addClass('left');
        });
    })
});