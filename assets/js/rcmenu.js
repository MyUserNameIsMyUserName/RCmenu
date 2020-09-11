// undefined, false, true, "full", "full-with-menu-title" and "full-nomovelog" debug modes
var debugRCmenu = 'full-nomovelog';
var winScW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var winScH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var selected = '';
var eventNum = 0;
var logObj = {
        "logItems": []
    };
var menuObj, i, j, x ,eventTimeHelper  = "";
menuObj = {
    "menus": [{ "name":"body", 
                "items":[{  "name":"<i class='fa fa-pencil' aria-hidden='true'></i> First Item", 
                            "func": "test_remove"
                        },
                        {   "name":"<i class='fa fa-plus' aria-hidden='true'></i> TEAAA",
                            "func": "test_remove",
                            "status": "disabled"
                        },
                        {   "name":"<i class='fa fa-car' aria-hidden='true'></i> ZZZZZ", 
                            "func": "test_add"
                        }]
                    },
            {   "name":"first", 
                "items":[{  "name":"<i class='fa fa-facebook' aria-hidden='true'></i> First Item", 
                            "func": "test_add"
                        },
                        {   "name":"<i class='fa fa-twitter' aria-hidden='true'></i> TEAAA",
                            "func": "test_add"
                        },
                        {   "name":"<i class='fa fa-pencil' aria-hidden='true'></i> ZZZZZ", 
                            "func": "test_func",
                            "status": "disabled"
                        }]
                        },
            {   "name":"testID", 
                "items":[{  "name":"Remove 'first'", 
                            "func": "test_removeEE"
                        },
                        {   "name":"TEAAA",
                            "func": "test_func"
                        },
                        {   "name":"ZZZZZ", 
                            "func": "test_func",
                            "status": "disabled"
                        }]
                    },
            {   "name":"anaMenu", 
                "items":[{  "name":"First Item", 
                            "func": "test_func",
                            "status": "disabled"
                        },
                        {   "name":"TEAAA",
                            "func": "clearEventLog"
                        },
                        {   "name":"ZZZZZ", 
                            "func": "clearEventLog"
                        }]
                    },
            {   "name":"events_log", 
                "items":[{  "name":"Clear Log List", 
                            "func": "clearEventLog"
                        },
                        {   "name":"More Info",
                            "func": "clearEventLog",
                            "status": "disabled"
                        }]
                    },
    ]
}

function showContextMenu(e){
    e.preventDefault();
    if((!(typeof debugRCmenu === "undefined"))){
        if (debugRCmenu !== false){
            debugFunc(e);
        };
    };

    removeContextMenu();
    x = "";
    var d = getEventElement(e);
    for (i in menuObj.menus) {
        if ((d.id == menuObj.menus[i].name) || (d.classList.contains(menuObj.menus[i].name)) || (d.tagName == menuObj.menus[i].name.toUpperCase())){
            
            if (!(typeof debugRCmenu === "undefined"))  {
                if (debugRCmenu =="full-with-menu-title"){
                    x += "<button class='titleMenu disabled'>" + menuObj.menus[i].name + "</button>";
                }
            }
            for (j in menuObj.menus[i].items) {
                if (menuObj.menus[i].items[j].status !== undefined){
                    x += "<button class='disabled fancy-hover'>" + menuObj.menus[i].items[j].name + "</button>";
                } else {
                    x += "<button onclick='"+menuObj.menus[i].items[j].func+"(event)' class='"+status+" fancy-hover'>" + menuObj.menus[i].items[j].name + "</button>";
                }
            }
            
            var node = document.createElement("DIV");
            node.style.background = "blue";
            node.style.position = "absolute";
            node.style.display = "flex";
            node.style.flexDirection = "column";
            node.classList.add("customMenu");
            document.querySelector("body").appendChild(node); 
            node.innerHTML = x;
            if ((e.clientY + window.pageYOffset + node.offsetHeight) > winScH ){
                node.style.top = (e.clientY + window.pageYOffset - node.offsetHeight)+"px";
            } else {
                node.style.top = (e.clientY + window.pageYOffset)+"px";
            };
            if ((e.clientX + window.pageXOffset + node.offsetWidth) > winScW ){
                node.style.left = (e.clientX + window.pageXOffset - node.offsetWidth)+"px";
            } else {
                node.style.left = (e.clientX + window.pageXOffset)+"px";
            };
            addMenuHoverAnimation();
        }
    }

    selectingItem(e);


    
};

function removeContextMenu(){
    var exMenu = document.getElementsByClassName("customMenu");
    if(exMenu.length > 0){
        document.querySelector(".customMenu").remove();
    };
};

function selectingItem(e){
    var clearSelect = document.querySelectorAll('.selected');
    var index = 0, length = clearSelect.length;
    for ( ; index < length; index++) {
        clearSelect[index].classList.remove('selected');
    }

    e.target.classList.add('selected');
};

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
    var eventTime = new Date();
    eventTimeHelper = eventTime.getTime();
    var logObjData = {  "id":   eventNum, 
                        "type": e.type,
                        "clientX": e.clientX,
                        "clientY": e.clientY,
                        "winWidth": winScW,
                        "winHeight": winScH,
                        "elid": d.id,
                        "elclass": d.classList,
                        "eltag": d.tagName,
                        "timeStamp": eventTimeHelper,
                        "timeStampFormated": getCurrentTime(),
                            };
    addToLogList(logObjData);
    addLogItem("Ev.id: "+eventNum+"; Type: "+e.type+"; X: "+e.clientX+"; Y: "+e.clientY+"; WW: "+winScW+"; WH: "+winScH+"; El.id: "+d.id+"; El.class: "+d.classList+"; El.tagName: "+d.tagName+"; TimeStamp:"+getCurrentTime()+";" );     
    putDot(e);   
    var helperString = "";
    for (i in menuObj.menus) {
       
        helperString += "<div  class='titleMenu'><h5>" + menuObj.menus[i].name + "</h5>";
            for (j in menuObj.menus[i].items) {
                var status = "";
                if (menuObj.menus[i].items[j].status !== undefined){
                    status = 'disabled';
                }
                helperString += "<button onclick='"+menuObj.menus[i].items[j].func+"(event)' "+status+">" + menuObj.menus[i].items[j].name + "</button>";
            }
        helperString += "</div>";
    }
    document.querySelector('.menusObjectPrint').innerHTML = helperString;
}

function addToLogList(data){
    logObj.logItems.push(data);
}

function addLogItem(data, error = null){
    eventNum = eventNum + 1;
    var node = document.createElement("p");     
    var textnode = document.createTextNode(data);
    if (error == 'error'){
        node.style.color = "red";
    } else if (error == 'success'){
        node.style.color = "green";
    }
    node.dataset.eventId = eventNum;
    node.style.opacity = "1";
    node.style.overflow = "hidden";
    node.style.display = "block";
    node.classList.add('eventLogItem');
    node
    node.appendChild(textnode);
    document.querySelector("#events_log").appendChild(node);  
    node.style.height = parseInt( node.offsetHeight );
}

function moveMouseDebug(e){
    if((debugRCmenu == "full") && (!e.target.closest('#debug_side'))){debugFunc(e);};
    
    if(e.target.classList.contains('eventLogItem')){    
        //debugRCmenu = true;
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
        //debugRCmenu = "full";
        var elems = document.querySelectorAll('.eventDot');
        var index = 0, length = elems.length;
        for ( ; index < length; index++) {
            elems[index].style.opacity = 1;
            elems[index].style.boxShadow = "none";
            elems[index].style.transform = "scale(1)";
        }
    };
}

function addNewMenu(menu){
    var tester = true;
    for (i in menuObj.menus) {
        if (menu.name == menuObj.menus[i].name){
            tester = false;
        }
    }
    if (tester){
        menuObj.menus.push(menu);
        addLogItem("Menu added successfuly", "success");
    } else {
        addLogItem("Can't add, menu already exists!", "error");
    }
}

function removeMenu(name){
    var tester = false;
    for (i in menuObj.menus) {
        if (name == menuObj.menus[i].name){
            menuObj.menus.splice(i, 1);
            tester = true;
        }
    }
    if (tester){
        addLogItem("Menu removed successfuly", "success");
    }else{
        addLogItem("Can't remove, menu doesn\'t exists!", "error");
    }
}

function deleteLogItem(params){
    var elem = document.querySelector('.selected[data-event-id="'+params+'"]');
    elem.classList.add('deleting');
    elem.style.padding = "2px";
    elem.style.height = "10px";
    elem.style.fontSize = "8px";
    elem.style.background = "rgba(250, 10, 10, 0.5)";
    elem.innerHTML = "Deleting...";
    addLogItem("Successfully remove logItem id: "+ params, "success");
    setTimeout(function(){ elem.remove(); }, 1000);
    
}

function getCurrentTime(){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    var mil = d.getMilliseconds();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    //var x = document.getElementById("time");
    //x.innerHTML = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    var value =  hr + ":" + min +":"+ mil + ampm + " " + date + " " + month + " " + year;
    return value;
}

function clearEventLog(){
    document.querySelector('#events_log').innerHTML = "";
    var allDots = document.querySelectorAll('.eventDot');
    var index = 0, length = allDots.length;
    for ( ; index < length; index++) {
        allDots[index].remove();
    }
}

function consoleLogObject(){
    console.log(JSON.stringify(logObj));
}

function downloadLog(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], {type: contentType});
    a.href = URL.createObjectURL(file);
    var eventTime = new Date();
    eventTimeHelper = eventTime.getTime();
    a.download = fileName+'_'+eventTimeHelper+'.json.txt';
    a.click();
}


//Events
window.addEventListener("resize", getWindowSize);

window.addEventListener("click", function(e) {
    var parentHeleper = e.target.parentElement;
    if ((!(e.target.classList.contains('customMenu') || parentHeleper.classList.contains('customMenu'))) || (parentHeleper.classList.contains('customMenu') && (!e.target.classList.contains('disabled')))){
        removeContextMenu();
    } 
    if(!(typeof debugRCmenu === "undefined")){
        if (debugRCmenu !== false){
            debugFunc(e);
        };
    };
    selectingItem(e)
});

window.addEventListener("contextmenu", function(e){
    var parentHeleper = e.target.parentElement;
    if ((!(e.target.classList.contains('customMenu') || parentHeleper.classList.contains('customMenu')))){
        showContextMenu(e);
    } else {
        e.preventDefault();
    }
}, false);

//END Events

//DEBUG init
if (!(typeof debugRCmenu === "undefined"))  {
    if (debugRCmenu != false){
        window.addEventListener("mousemove",moveMouseDebug);
        var debugSide = document.createElement("DIV");   // Create a <button> element
        debugSide.innerHTML = "<a class='debug_toggler' onclick='toggleDebugSide()' title='Toggle Debug'>>></a><div class='debug_inner'><h2>Debug Info </h2><div class='optionsDebugLog'><button onclick='clearEventLog()'>Clear Event Log</button><button onclick='consoleLogObject()'>Console.log( logObj )</button><button onclick=\"downloadLog( logObj, 'rcmenu-log', 'text/plain')\">Download Log</button></div><div id='events_log' ></div><div class='menusObjectPrint'></div></div>";  
        debugSide.setAttribute("id", "debug_side");
        document.body.appendChild(debugSide);  
        test_add();
    };
};


//TEST FUNCTION
function test_func(e){
    alert(e.target.innerHTML);
};

function test_remove(){
    removeMenu('eventLogItem');
};

function test_removeEE(){
    removeMenu('first');
};

function test_add(){

    var customMenu = {  "name":"eventLogItem", 
                        "items":[{  "name":"<i class='fa fa-info' aria-hidden='true'></i> Show More Info", 
                                    "func": "test_func",
                                    "status": "disabled"
                                },
                                {   "name":"<i class='fa fa-trash' aria-hidden='true'></i> Remove this event", 
                                    "func": "deleteEventLogItem"
                                },
                                {   "name":"<i class='fa fa-close' aria-hidden='true'></i> Remove this menu", 
                                    "func": "test_remove"
                                }]
                            };
    addNewMenu(customMenu);
};
;

function deleteEventLogItem(){
    var helperElem = document.querySelector('.selected').dataset.eventId;
    deleteLogItem(helperElem);
};


function toggleDebugSide(){
    var helperElem = document.querySelector('#debug_side');
    if (helperElem.classList.contains('open')){
        helperElem.classList.remove('open');
        document.querySelector('.debug_toggler').innerHTML = ">>";
    } else {
        helperElem.classList.add('open');
        document.querySelector('.debug_toggler').innerHTML = "<<";
    };
};

function addMenuHoverAnimation(){
    var helperNode = document.querySelector('.customMenu');
    Array.from(
        document.querySelectorAll('.fancy-hover'),
        function(el){
      
          el.addEventListener('mousemove',function(e){
            el.style.setProperty('--px', e.clientX - helperNode.offsetLeft - el.offsetLeft);
            el.style.setProperty('--py', e.clientY - helperNode.offsetTop - el.offsetTop);
          });
      
        });
}