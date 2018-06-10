let drawcanvas = (that)=>{
        let canvas = document.getElementById("canvas");
        let cxt = canvas.getContext("2d");//创建画布二维环境
        let num;//决定屏幕粒子数量
        let data=[];//存储小点位置
        let move={};//存储鼠标位置
        let w,h;//存储canvas画布宽高
        let init =()=>{//初始化原本画布
            canvas.width = window.innerWidth-20;
            canvas.height = window.innerHeight-20;
            w = canvas.width;
            h = canvas.height;
            num = w*h*0.0003;
            for(let i = 0;i < num ;i++){//循环创建小点初始位置
                data[i] = {
                    x:Math.random()*w,//点的起始x坐标
                    y:Math.random()*h,//点的起始y坐标
                    cX:Math.random()*0.6-0.3,//点向x方向的移动速度
                    cY:Math.random()*0.6-0.3,//点向y方向的移动速度
                };
                Cricle(data[i].x,data[i].y);
            }
        };
        let Cricle = (x,y)=> {//传入想要绘制的点
            cxt.save();
            cxt.fillStyle = "skyblue";
            cxt.beginPath();
            cxt.arc(x,y,0.01,Math.PI*2,false);
            cxt.closePath();
            cxt.fill();
            cxt.restore();
        };
        let draw = ()=>{//让小点移动并连线
            cxt.clearRect(0,0,w,h);//清除画布
            for(let i = 0;i < num;i++){//循环遍历每一个点
                data[i].x += data[i].cX;
                data[i].y += data[i].cY;
                //边界值判断
                if(data[i].x>w||data[i].x<0)
                    data[i].cX = -data[i].cX;
                if(data[i].y>h||data[i].y<0)
                    data[i].cY = -data[i].cY;
                Cricle(data[i].x,data[i].y);//重新画点
                //判断是否进行连线
                for(let j = i+1;j < num;j++){//循环遍历下一个点
                    if(((data[i].x - data[j].x) * (data[i].x - data[j].x) + (data[i].y - data[j].y) * (data[i].y - data[j].y)) <= 5000){
                        //绘制线条
                        line(data[i].x, data[i].y, data[j].x, data[j].y);
                    }
                }
                if(move.x && move.y){
                    if(((data[i].x - move.x)*(data[i].x - move.x)+(data[i].y - move.y)*(data[i].y - move.y))<=10000){
                        //绘制线条
                        line(data[i].x,data[i].y,move.x,move.y);
                    }
                }
            }
        };
        let line = (x1,y1,x2,y2)=>{//连线
            cxt.save();
            cxt.strokeStyle = "rgba(135,206,235,.3)";
            cxt.beginPath();
            cxt.moveTo(x1,y1);
            cxt.lineTo(x2,y2);
            cxt.stroke();
            cxt.restore();
        };
        document.body.onmousemove = (e)=> {
            move.x = e.clientX;
            move.y = e.clientY;
            document.body.onmouseout = ()=>{
                move.x = 0;
                move.y = 0;
            }
        };
        init();
        that.interval = setInterval(draw,20);
};
export default drawcanvas;
