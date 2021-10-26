// Worker 线程
self.onmessage = function (e) {
    const { data, newData, originData, width, pos, buff } = e.data;
    for (let index = 0; index <= data.length / 4; index++) {
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
    postMessage(newData);
};