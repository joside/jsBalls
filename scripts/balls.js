var balls = (function() {
    var amCanvas = 6,
        canvCache = [],
        crtCanvas = 0,
        height = parseInt(window.innerHeight, 10) - 100 || 600,
        width = parseInt(window.innerWidth, 10) - 100 || 1200,
        ballRadius = width / 25,
        crtX = 0.1,
        crtXPos,
        xStep = 0.01,
        crtY = 0.1,
        crtYPos,
        yStep = 0.01,
        interval,
        intervalMs = 50,
        multX = 1,
        multY = 0.5;

    function drawBall() {
        var ctx = canvCache[crtCanvas].getContext('2d'),
            grd;
        ctx.beginPath();
        ctx.arc(crtXPos, crtYPos, ballRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        grd = ctx.createRadialGradient(crtXPos + ballRadius / 4, crtYPos + ballRadius / 4, 0, crtXPos, crtYPos, ballRadius);
        grd.addColorStop(0, 'white');
        grd.addColorStop(1, 'black');
        //grd.addColorStop(1,'white');
        ctx.fillStyle = grd;
        ctx.fill();
        canvCache[crtCanvas].style.display = 'block';
        //document.body.style.background = "url("+canvCache[crtCanvas].toDataURL("image/png")+") top left no-repeat";
    }

    function intervalCallback() {
        crtXPos = Math.sin(crtX) * width / 2 + width / 2 + ballRadius;
        crtYPos = Math.cos(crtY) * height / 2 + height / 2 + ballRadius;

        crtX = ((1 + multX) * parseFloat(xStep, 10) + parseFloat(crtX, 10)).toFixed(2);
        crtY = ((1 + multY) * parseFloat(yStep, 10) + parseFloat(crtY, 10)).toFixed(2);
        canvCache[crtCanvas].style.display = 'none';
        if (++crtCanvas >= amCanvas) {
            crtCanvas = 0;
        }
        //console.log(crtCanvas, crtX, parseInt(crtXPos,10), crtY, parseInt(crtYPos,10));
        drawBall();
    }

    return function() {
        var i = 0,
            tmpCanvas;
        // Create all canvas
        for (; i < amCanvas;) {
            tmpCanvas = document.createElement('canvas');
            tmpCanvas.setAttribute('width', width + 2 * ballRadius);
            tmpCanvas.setAttribute('height', height + 2 * ballRadius);
            document.getElementById('background').appendChild(tmpCanvas);
            canvCache[i++] = tmpCanvas;
        }
        // Create interval
        interval = window.setInterval(intervalCallback, intervalMs);
    };
})();

function init() {
    balls();
}