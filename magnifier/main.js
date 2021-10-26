import { loadImage, getImageData } from './utils/img-loader.js';
import { getMousePos } from './utils/mouse.js';

const canvas = document.getElementById('paper');
const context = canvas.getContext('2d');
let imgData;
let originData;
let buff = 200;

function debounce(func, wait=0) {    
    if (typeof func !== 'function') {
        throw new TypeError('need a function arguments')
    }
    let timeid = null;
    let result;

    return function() {
        let context = this;
        let args = arguments;

        if (timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(function() {
            result = func.apply(context, args);
        }, wait);

        return result;
    }
}
// let worker = new Worker('./work.js');

function onMouseMove(pos) {

    let newData = imgData;
    let width = canvas.width;
    for (let index = 0; index <= imgData.data.length / 4; index++) {
        let i = index * 4;
        let x = index % width;
        let y = Math.floor(index / width);
        // 圆形区域
        if(Math.sqrt(Math.pow(Math.abs(x - pos[0]), 2) + Math.pow(Math.abs(y - pos[1]), 2)) < buff) {
        // 方形区域
        // if(x > (pos[0] - buff) && x < (pos[0] + buff) && y > (pos[1] - buff) && y < (pos[1] + buff)) {
            // 在区域范围
            newData.data[i] = originData[i];
            newData.data[i + 1] = originData[i + 1];
            newData.data[i + 2] = originData[i + 2];
            newData.data[i + 3] = originData[i + 3];
        } else {
            newData.data[i] = 0;
            newData.data[i + 1] = 0;
            newData.data[i + 2] = 0;
            newData.data[i + 3] = originData[i + 3];
        }  
    }
    context.putImageData(newData, 0, 0);

    // worker.onmessage = function (event) {
    //     context.putImageData(event.data, 0, 0);
    // }
    // worker.postMessage({ data: imgData.data, newData, originData, width: canvas.width, pos, buff });
}

getMousePos(canvas, debounce(onMouseMove, 0));

(async function () {
    const img = await loadImage('imgs/dva.jpeg');
    const {width, height} = img;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0);
    imgData = getImageData(img);
    originData = [...imgData.data];
}());