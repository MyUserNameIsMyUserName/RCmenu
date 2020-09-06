// undefined, false, true and "full" debug modes
var debug = 'full';
var winScW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var winScH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var eventNum = 0;
var menuObj, i, j, x  = "";
menuObj = {
    "menus": [
        {"name":"first", "items":[{"name":"First Item", "func": "test_func"},{"name":"TEAAA", "func": "test_func"},{"name":"ZZZZZ", "func": "test_func"}]},
        {"name":"debug_side", "items":[{"name":"First Item", "func": "test_func"},{"name":"TEAAA", "func": "test_func"},{"name":"ZZZZZ", "func": "test_func"}]},
        {"name":"anaMenu", "items":[{"name":"First Item", "func": "test_func"},{"name":"TEAAA", "func": "test_func"},{"name":"ZZZZZ", "func": "test_func"}]},
        {"name":"events_log", "items":[{"name":"First Item", "func": "test_func"},{"name":"TEAAA", "func": "test_func"},{"name":"ZZZZZ", "func": "test_func"}] }
    ]
}

function showContextMenu(e){
    e.preventDefault();
    if((debug!== undefined) && (debug!==false)){debugFunc(e);};

    removeContextMenu();
    x = "";
    var d = getEventElement(e);
    for (i in menuObj.menus) {
        if (d.id == menuObj.menus[i].name){
            x += "<h2>" + menuObj.menus[i].name + "</h2>";
            for (j in menuObj.menus[i].items) {
                x += "<button onclick='"+menuObj.menus[i].items[j].func+"(event)'>" + menuObj.menus[i].items[j].name + "</a><br>";
            }
        }
    }
    var node = document.createElement("p");
    node.style.background = "blue";
    node.style.position = "absolute";
    node.style.top = (e.clientY + window.pageYOffset)+"px";
    node.style.left = (e.clientX + window.pageXOffset)+"px";
    node.style.display = "block";
    node.classList.add("customMenu");
    document.querySelector("body").appendChild(node); 
    document.querySelector(".customMenu").innerHTML = x;
}

function removeContextMenu(){
    var exMenu = document.getElementsByClassName("customMenu");
    if(exMenu.length > 0){
        document.querySelector(".customMenu").remove();
    };
}

function putDot(e){
    var node = document.createElement("p");
    if (e.type == "contextmenu"){
        node.style.background = "red";
    } if (e.type == "mousemove"){
        node.style.background = "rgba(0,0,0,0.2)";
    }else {
        node.style.background = "green";
    }
    node.classList.add('eventDot');
    node.style.position = "absolute";
    node.style.top = (e.clientY + window.pageYOffset)+"px";
    node.style.left = (e.clientX + window.pageXOffset)+"px";
    node.style.height = "2px";
    node.style.width = "2px";
    node.style.display = "block";
    node.style.pointerEvents = "none";
    node.dataset.eventId = eventNum;
    document.querySelector("body").appendChild(node);  
}

function getWindowSize(){
    winScW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    winScH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getEventElement(e){
    var d = e || window.event;
    d = d.target || d.srcElement;
    return d;
}

function debugFunc(e){
    var d = getEventElement(e);
    //alert(d.id);
    var node = document.createElement("p");     
    var textnode = document.createTextNode("Event: "+e.type+"; X: "+e.clientX+"; Y: "+e.clientY+"; WW: "+winScW+"; WH: "+winScH+"; El: "+d.id);
    node.dataset.eventId = eventNum;
    node.classList.add('eventLogItem');
    node.appendChild(textnode);         
    putDot(e, eventNum);           
    eventNum = eventNum + 1;
    document.querySelector("#events_log").appendChild(node);  
}

function moveMouseDebug(e){
    if(debug == "full"){debugFunc(e);};
    if(e.target.classList.contains('eventLogItem')){    
        debug = true;
        var elems = document.querySelectorAll('.eventDot');
        var index = 0, length = elems.length;
        for ( ; index < length; index++) {
            elems[index].style.opacity = 0.5;
            elems[index].style.boxShadow = "none";
            elems[index].style.transform = "scale(.9)";
        }
        document.querySelector('.eventDot[data-event-id="'+e.target.dataset.eventId+'"]').style.boxShadow = "0px 0px 10px 5px white";
        document.querySelector('.eventDot[data-event-id="'+e.target.dataset.eventId+'"]').style.opacity = "1";
        document.querySelector('.eventDot[data-event-id="'+e.target.dataset.eventId+'"]').style.transform = "scale(2.5)";
    } else {
        debug = "full";
        var elems = document.querySelectorAll('.eventDot');
        var index = 0, length = elems.length;
        for ( ; index < length; index++) {
            elems[index].style.opacity = 1;
            elems[index].style.boxShadow = "none";
            elems[index].style.transform = "scale(1)";
        }
    };
}

//Events
window.addEventListener("resize", getWindowSize);

window.addEventListener("click", function(e) {
    removeContextMenu();
    if((debug!== undefined) && (debug!==false)){debugFunc(e);};
});

window.addEventListener("contextmenu", function(e){
    showContextMenu(e);
}, false);

//END Events

//DEBUG init
if ((debug!== undefined) && (debug!==false)) {
        
    if (debug == 'full'){
        window.addEventListener("mousemove", function(e){
            moveMouseDebug(e);    
        });
    }

    var debugSide = document.createElement("DIV");   // Create a <button> element
    debugSide.innerHTML = "<h2>Debug Info</h2><div id='events_log' style='height: 50%; width: 100%; overflow: hidden; overflow-y: scroll; display: block; background: rgba(0,0,0,0.25)'></div>";  
    debugSide.setAttribute("id", "debug_side");
    debugSide.style.color = 'white';
    debugSide.style.position = 'absolute';
    debugSide.style.top = '0';
    debugSide.style.right = '0';
    debugSide.style.height = 'calc(100% - 20px)';
    debugSide.style.width = '350px';
    debugSide.style.padding = '10px';
    debugSide.style.background = 'rgba(0,0,0,0.25)';
    document.body.appendChild(debugSide);   
}


//TEST FUNCTION
function test_func(e){
    alert(e.target.classList);
}