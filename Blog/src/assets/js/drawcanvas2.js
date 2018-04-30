let drawcanvas2 = function () {
    var Canvas ={};
    Canvas.anim = {
        init:function () {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");//画笔，创建2d绘画空间
            canvas.width=window.innerWidth-20;
            canvas.height=window.innerHeight-20;
            this.letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            this.cw = canvas.width;
            this.ch = canvas.height;
            this.particles = [];
        },
        render:function () {
            var particle = {
                //显示位置
                x:this.cw/2,
                y:this.ch,
                //字母
                character:this.letters[Math.floor(Math.random()*this.letters.length)],
                //速度
                xspeed:(Math.random()*20)-10,
                yspeed:(Math.random()*20)-18
            };
            this.particles.push(particle);
            this.drawParticles();
        },
        drawParticles:function () {
            this.fadeCanvas();
            var particleCount = this.particles.length;
            var c= this.ctx;
            for(var i = 0;i < particleCount;i++){
                var particle = this.particles[i];
                c.font = "12px sans-serif";
                c.fillStyle = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
                c.fillText(particle.character,particle.x,particle.y);
                particle.x += particle.xspeed;
                particle.y += particle.yspeed;
                particle.y *= 0.995;
            }
        },
        //清楚画布
        fadeCanvas:function () {
            this.ctx.fillStyle = "rgba(255,255,255,.7)";
            this.ctx.fillRect(0,0,this.cw,this.ch);
        }
    };
    Canvas.anim.init();
    setInterval(function () {
        Canvas.anim.render();
    },13);
};
export default drawcanvas2;
