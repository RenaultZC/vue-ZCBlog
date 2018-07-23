class mineSweeping{
  constructor(canvas){
    this.mine = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.first = true;
    this.mineY = new Image();
    this.mineN = new Image();
    this.pre = {i:-1,j:-1,reset:false} ;
    this.mineNum = 90;
  }
  init(width,height){
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.lineWidth = 2;
    this.mine = [];
    this.first = true;
    this.mineNum = 90;
    for(let i = 0;i < 12;i++){
      let arr = [];
      for(let j = 0;j < 12;j++){
        arr.push({type:0,flag:0,open:0});
      }
      this.mine.push(arr);
    }
    this.mineY.src = "http://localhost:1234/api/static/img/mine.jpg";
    this.mineN.src = "http://localhost:1234/api/static/img/mineN.jpg";
    this.mineY.onload = ()=>{
      this.ctx.drawImage(this.mineY,140,5,80,80);
      this.ctx.strokeStyle = "#000000";
      this.ctx.strokeRect(140,5,80,80);
    };
    for(let i = 0;i < 10;i++){
      for(let  j = 0;j < 10;j++){
        this.ctx.fillStyle = "#DAE0E3";
        this.ctx.fillRect(45+i*27,90+j*27,27,27);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(45+i*27,90+j*27,27,27);
      }
    }
  }
  click(type){
      if(this.pre.reset === false){
        if(this.first){
          this.mineJudge(this.pre.i,this.pre.j);
          this.first = false;
        }
        this.openMine(this.pre.i+1,this.pre.j+1);
      }else{
        this.init(360,360);
      }
  }
  openMine(i,j){
    if(i > 0 && i < 11 && j > 0 && j < 11 && this.mine[i][j].open === 0){
      if(this.mine[i][j].type === -1){
        for(let m = 1;m < 11;m++){
          for(let n = 1;n < 11;n++){
            if(this.mine[m][n].open === 0){
              if(this.mine[m][n].type === -1){
                this.ctx.drawImage(this.mineN,45+m*27-27,90+n*27-27,27,27);
                this.ctx.strokeStyle = "#000000";
                this.ctx.strokeRect(45+m*27-27,90+n*27-27,27,27);
              }else{
                this.ctx.fillStyle = "#ffffff";
                this.ctx.fillRect(45+m*27-27,90+n*27-27,27,27);
                this.ctx.strokeStyle = "#000000";
                this.ctx.strokeRect(45+m*27-27,90+n*27-27,27,27);
                if(this.mine[m][n].type){
                  this.ctx.fillStyle = "rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")";
                  this.ctx.font = "normal 27px 楷体";
                  this.ctx.fillText(this.mine[m][n].type+"",45+m*27-20,85+n*27);
                }
              }
            }
            this.mine[m][n].open = 1;
          }
        }
      }else if(this.mine[i][j].type > 0){
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(45+i*27-27,90+j*27-27,27,27);
        this.ctx.fillStyle = "rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")";
        this.ctx.font = "normal 27px 楷体";
        this.ctx.fillText(this.mine[i][j].type+"",45+i*27-20,85+j*27);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(45+i*27-27,90+j*27-27,27,27);
        this.mine[i][j].open = 1;
        this.mineNum--;
      }else if(this.mine[i][j].type === 0){
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(45+i*27-27,90+j*27-27,27,27);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(45+i*27-27,90+j*27-27,27,27);
        this.mine[i][j].open = 1;
        this.mineNum--;
        if(this.mine[i+1][j].type !== -1){
          this.openMine(i+1,j);
        }
        if(this.mine[i-1][j].type !== -1){
          this.openMine(i-1,j);
        }
        if(this.mine[i][j+1].type !== -1){
          this.openMine(i,j+1);
        }
        if(this.mine[i][j-1].type !== -1){
          this.openMine(i,j-1);
        }
      }
    }
    if(this.mineNum === 0){
      for(let m = 1;m < 11;m++){
        for(let n = 1;n < 11;n++){
          if(this.mine[m][n].type === -1){
            this.ctx.drawImage(this.mineY,45+m*27-27,90+n*27-27,27,27);
            this.ctx.strokeStyle = "#000000";
            this.ctx.strokeRect(45+m*27-27,90+n*27-27,27,27);
          }
          this.mine[m][n].open = 1;
        }
      }
    }
  }
  move(x,y){
    let position = this.judge(x,y);
    if(this.pre.i !== -1){
      this.drawRect(this.pre,false);
    }
    this.drawRect(position,true);
    this.pre = position;
  }
  mineJudge(i,j){
    let num = 0;
    for(let k = 0;num < 10;k++){
      let i1 = Math.floor(Math.random()*99);
      let j1 = i1%10;
      i1 = Math.floor(i1/10);
      if(i1 !== i && j1 !== j && this.mine[i1+1][j1+1].type !== -1){
        this.mine[i1+1][j1+1].type = -1;
        num++;
      }
    }
    for(let i1 = 1;i1 < 11;i1++){
      for(let j1 = 1;j1 < 11;j1++){
        if(this.mine[i1][j1].type !== -1){
          num = 0;
          for(let m = -1;m < 2;m++){
            for(let n = -1;n < 2;n++){
              if(this.mine[i1+m][j1+n].type === -1){
                num++;
              }
            }
          }
          this.mine[i1][j1].type = num;
        }
      }
    }
  }
  judge(x,y){
    let position = {
      i:0,
      j:0,
      reset:false
    };
    if(x >= 149 && x <= 229 && y >= 14 && y <= 94) {
      position.reset = true;
    }
    else if(x >= 45 && x <= 315 && y >= 90 && y <= 360){
      position.i = Math.floor((x-54)/27);
      position.j = Math.floor((y-99)/27);
    }
    else{
      position = {i:-1,j:-1,reset:false};
    }
    return position;
  }
  drawRect(position,type){
    this.ctx.lineWidth = 2;
    if(position.i >= 0 && position.j>=0){
      if(type){
        this.ctx.strokeStyle  = "rgb(255,255,255)";
      }else{
        this.ctx.strokeStyle = "rgb(0,0,0)";
      }
      if(position.reset){
        this.ctx.drawImage(this.mineY,140,5,80,80);
        this.ctx.strokeRect(140,5,80,80);
      }else{
        if(this.mine[position.i+1][position.j+1].open === 0){
          this.ctx.fillStyle = "#DAE0E3";
          this.ctx.fillRect(45+position.i*27,90+position.j*27,27,27);
          this.ctx.strokeRect(45+position.i*27,90+position.j*27,27,27);
        }
      }
    }
  }
}
export default mineSweeping;
