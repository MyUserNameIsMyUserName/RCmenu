var debugCustomCursor = true;
document.documentElement.style.cursor = 'none';
var customCursorString = '<svg id="customCursor" width="30px" height="30px" viewBox="0 0 20 20" class="svg-2 selected">'
                        +'<defs>'
                        +'<radialGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">'
                        +'<stop offset="10%" style="stop-color:#03A9F4;stop-opacity:1"></stop>'
                        +'<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0"></stop>'
                        +'</radialGradient>'
                        +'<filter id="f1" x="-2" y="-2" width="400%" height="400%">'
                        +'<feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset>'
                        +'<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1"></feGaussianBlur>'
                        +'<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>'
                        +'</filter>'
                        +'</defs>'
                        +'<path class="outlineBack" d="M1,1 L8,15 C 8 15, 18 18, 15 8 L15,8 L1,1" filter="url(#f1)"></path>'
                        +'<path class="outline" d="M1,1 L8,15 C 8 15, 18 18, 15 8 L15,8 L1,1"></path>'
                        +'<ellipse stroke-width="0" ry="3" rx="3" id="svg_14" cy="12" cx="12" fill-opacity="null" stroke-opacity="null" stroke="#000" fill="url(#grad1)"></ellipse>'
                        +'<ellipse stroke-width="0.5" ry="3" rx="3" id="svg_13" cy="12" cx="12" fill-opacity="null" stroke-opacity="null" stroke="#000" fill="none" stroke-dasharray="8,1,2,1,2,1"></ellipse>'
                        +'</svg>'
document.querySelector('body').innerHTML += customCursorString;
var customCursor = document.querySelector('#customCursor');

function mouseMove(e){
    //alert(e.clientX + " " + e.clientY);
    customCursor.style.top = e.clientY+'px';
    customCursor.style.left = e.clientX+'px';
}

function mouseClickStart(){
    customCursor.classList.add('clicking');
}

function mouseClickStop(){
    customCursor.classList.remove('clicking');
}

window.addEventListener("mousemove",mouseMove);

window.addEventListener("mousedown",mouseClickStart);
window.addEventListener("mouseup",mouseClickStop);