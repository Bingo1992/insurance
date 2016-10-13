function LineChart(Elem,Data,option){
    // 1. 创建画布对象
    var context = Elem.getContext('2d');
    // 2. 获取画布的宽度和高度
    const WIDTH = Elem.width;
    const HEIGHT = Elem.height;
    // 3. 定义坐标轴相对画布的内边距
    var padding = 20;//初始化内边距
    var paddingLeft = 20;//至少大于绘制文字的宽度
    var paddingBottom = 30;//至少大于绘制文字的高度
    // 4. 定义绘制坐标轴的关键点的坐标值
    var axisY = {// y轴的起点坐标值
        x : paddingLeft,
        y : padding
    };
    var origin = {// 原点坐标值(x轴与y轴相交点)
        x : paddingLeft,
        y : HEIGHT - paddingBottom
    };
    var axisX = {
        x : WIDTH - padding,
        y : HEIGHT - paddingBottom
    };
    var opts = {
        beginMonth: 1,//起始月
        endMonth: 6,//结束月
        stepY: 500 //梯度
    };
    var opts = extendObj(opts, option||{});
            
    // 5. 绘制坐标轴
    context.beginPath();
    context.strokeStyle = "#aaa"
    // context.moveTo(axisY.x,axisY.y);
    context.lineTo(origin.x,origin.y);
    context.lineTo(axisX.x,axisX.y);
    context.stroke();
 
    // 定义折点的x轴值
    var pointsX = [];
 
    // 7. 绘制坐标轴的刻度(x轴的月份和y轴的金额)
    // x轴的月份
    var month = {
        x : 0,
        y : HEIGHT - paddingBottom
    }
    // 设置字体
    context.font = "24px 微软雅黑";
    context.fillStyle = "#aaa";
    // 设置垂直对齐
    context.textBaseline = "top";
    for(var i=opts.beginMonth;i<=opts.endMonth;i++){

        pointsX[pointsX.length] = month.x;
        // 改变每次绘制的x坐标轴的值
        month.x += (axisX.x - origin.x)/6;
        // 绘制月份信息
        context.fillText(i,month.x,month.y);       
    }

    // 定义绘制的坐标值0
    var money = {
        x : axisY.x,
        y : HEIGHT - paddingBottom
    };
    var max = Math.max.apply(Math,Data);
    var moneyY = (origin.y - axisY.y)/(max/opts.stepY+1);
    var len = max/opts.stepY;
    var eachStep = opts.stepY;
    // 设置水平对齐
    context.textAlign = "left";
    // 遍历"最高值/间隔"次
    for(var i=0;i<len;i++){
        // y轴向上移动
        money.y -= moneyY;
        // 绘制金额
        context.fillText(opts.stepY,money.x+5,money.y);
        context.beginPath();
        context.moveTo(money.x,money.y);
        context.lineTo(axisX.x,money.y);
        context.stroke();
        context.closePath();
        // 金额每次加一个梯度值
        opts.stepY += eachStep;
    }
 
    /*
      绘制折线
      * 6个折点的x轴值，对应6个月文字的x轴值
     */
    context.beginPath();
    for(var i=0;i<Data.length;i++){
        // 获取折点的x和y值
        var pointY = origin.y - (origin.y - (axisY.y + moneyY))*Data[i]/max;
        var pointX = pointsX[i] + (axisX.x - origin.x)/6;
        // 绘制折线
        if(i == 0){
            context.textAlign = "left";
            context.textBaseline = "bottom";
            context.moveTo(pointX,pointY);
        }else{
            context.textAlign = "center";
            context.textBaseline = "bottom";
            context.lineTo(pointX,pointY);
        }
        // 绘制折点的金额
        context.fillStyle = "#ff8064";
        context.fillText(Data[i],pointX,pointY-10);
        context.strokeStyle = "#ff8064";
        
        context.lineWidth = 4;
    }
    context.stroke();
    // 绘制6个折点的圆
    for(var i=0;i<Data.length;i++){
        // 获取折点的x和y值
        var pointY = origin.y - (origin.y - (axisY.y + moneyY))*Data[i]/max ;
        // var pointX = pointsX[i];
        var pointX = pointsX[i] + (axisX.x - origin.x)/6;
        // 绘制圆
        context.fillStyle = "#ff8064";
        context.beginPath();
        context.arc(pointX,pointY,6,0,Math.PI*2);
        context.fill();
    }
 
}

function cloneObj(oldObj) { //复制对象方法
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = new Object();
    for (var i in oldObj)
        newObj[i] = cloneObj(oldObj[i]);
    return newObj;
};

function extendObj() { //扩展对象
    var args = arguments;
    if (args.length < 2) return;
    var temp = cloneObj(args[0]); //调用复制对象方法
    for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
}