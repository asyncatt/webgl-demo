export function getMousePos(canvas, onMouseMove) {
    canvas.addEventListener("mousemove", function(e) { 
        var cRect = canvas.getBoundingClientRect();        // 获取CSS pos，以及宽度/高度
        var canvasX = Math.round(e.clientX - cRect.left);  // 减去画布的“左” 
        var canvasY = Math.round(e.clientY - cRect.top);   // 从X / Y位置  
        onMouseMove && onMouseMove([canvasX, canvasY]);
    });
}
