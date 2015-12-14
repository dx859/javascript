var w = 2 * $(window).width();
var h = 2 * $(window).height();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imgArr = [];

function main() {
  $.get(getUrl('/index.php?r=api/shops/selected'), function(data) {
    console.log(data);
    var radio = 220 / 359;
    var height = w * radio;
    var maxWord = Math.ceil((w - 64) / 24 * 1.0);
    setCanvas(data.data.list_data.length * (height + 140));

    var Handlers = {
      "drawImageHandler": function drawImageHandler(args) {
        // console.log(args.imageObj, args.sourceX, args.sourceY,args.destWidth, args.destHeight)
        ctx.drawImage(args.imageObj, args.sourceX, args.sourceY, args.destWidth, args.destHeight);
        drawRoundedRect("#43aff4", "#43aff4", w - 32 - 80, args.sourceY + height - 20, 80, 40, 4);

        ctx.fillStyle = "#fff"
        ctx.font = "24px '华文细黑'";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("景点", w - 32 - 62 , args.sourceY + height);

        ctx.fillStyle = "#555";
        ctx.textAlign = "right";
        ctx.fillText("距离：125km", w - 32 , args.sourceY + height + 70);

        drawBaseLine(args.sourceY)
      }
    };

    var settings = {};
    imgArr = [];
    for (i = 0; i < data.data.list_data.length; i++) {
      settings = {};
      settings.sourceX = 0;
      settings.sourceY = i * (height + 140);
      settings.destWidth = w;
      settings.destHeight = w * radio;
      settings.imageObj = new Image();
      settings.imageObj.onload = Handlers.drawImageHandler.bind(undefined, settings);
      settings.imageObj.src = data.data.list_data[i].image;
      settings.title = data.data.list_data[i].name;
      settings.desc = data.data.list_data[i].info;
      settings.distance = data.data.list_data[i].distance;
      settings.link = data.data.list_data[i].link;

      ctx.fillStyle = "#000"
      ctx.font = "34px '华文细黑'";
      ctx.textBaseline = "top";
      ctx.fillText(settings.title, 32, height + settings.sourceY + 25);
      ctx.fillStyle = "#666";
      ctx.font = "24px '华文细黑'";
      ctx.textBaseline = "top";

      if (settings.desc.length > maxWord) {
        settings.desc = settings.desc.substring(0, maxWord - 1) + '...';
      }
      ctx.fillText(settings.desc, 32, height + settings.sourceY + 80);

      imgArr.push(settings);
    }

  })

  $(canvas).on('click', function(e){
    var y = e.layerY * 2
    for (var i = 0; i < imgArr.length; i++) {
      if (imgArr[i].sourceY < y && y< imgArr[i].sourceY + imgArr[i].destHeight) {
        console.log(imgArr[i].title);
        break;
      }
      
    };

    $.get(imgArr[i]['link'], function(data) {
      console.log(data);
    })

  });

  // drawText();




}

function drawImg() {

}

function drawRoundedRect(strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
  ctx.save();
  ctx.beginPath();
  roundedRect(cornerX, cornerY, width, height, cornerRadius);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = fillStyle;
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
  if (width > 0) ctx.moveTo(cornerX + cornerRadius, cornerY);
  else ctx.moveTo(cornerX - cornerRadius, cornerY);
  ctx.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
  ctx.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
  ctx.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);
  if (width > 0) {
    ctx.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
  } else {
    ctx.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
  }
}

function drawText() {
  // ctx.moveTo(0, 0);
  // ctx.lineTo(w, h);
  // ctx.stroke();

  ctx.fillStyle = '#058';
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText("hello, world", w, 0)
    // drawBaseLine(ctx, 40)
    // ctx.strokeText("hello, world",10, 30)
    // console.log(ctx.font)

}

function drawBaseLine(h) {
  ctx.save();
  ctx.strokeStyle = '#d7d9d7';
  ctx.lineWidth = 1;
  ctx.moveTo(0, h);
  ctx.lineTo(w, h);
  ctx.stroke();
  ctx.restore();
}

function setCanvas(height) {
  canvas.width = w;
  canvas.height = height;
  canvas.style.width = w / 2 + 'px';
  canvas.style.height = height / 2 + 'px';
}

function getUrl(api) {
  return getApi() + api;
}

function getApi() {
  return 'http://test2.365tmm.net';
}

main();
