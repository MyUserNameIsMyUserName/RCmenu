// undefined, false, true, "full", "full-with-menu-title" and "full-nomovelog" debug modes
var debug = 'full';
var winScW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var winScH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var selected = '';
var eventNum = 0;
var menuObj, i, j, x  = "";
menuObj = {
    "menus": [{ "name":"body", 
                "items":[{  "name":"First Item", 
                            "func": "test_remove"
                        },
                        {   "name":"TEAAA",
                            "func": "test_remove",
                            "status": "disabled"
                        },
                        {   "name":"ZZZZZ", 
                            "func": "test_add"
                        }]
                    },
            {   "name":"first", 
                "items":[{  "name":"First Item", 
                            "func": "test_add"
                        },
                        {   "name":"TEAAA",
                            "func": "test_add"
                        },
                        {   "name":"ZZZZZ", 
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
    if((!(typeof debug === "undefined"))){
        if (debug !== false){
            debugFunc(e);
        };
    };

    removeContextMenu();
    x = "";
    var d = getEventElement(e);
    for (i in menuObj.menus) {
        if ((d.id == menuObj.menus[i].name) || (d.classList.contains(menuObj.menus[i].name)) || (d.tagName == menuObj.menus[i].name.toUpperCase())){
            
            if (!(typeof debug === "undefined"))  {
                if (debug=="full-with-menu-title"){
                    x += "<button disabled class='titleMenu'>" + menuObj.menus[i].name + "</button>";
                }
            }
            for (j in menuObj.menus[i].items) {
                var status = "";
                if (menuObj.menus[i].items[j].status !== undefined){
                    status = 'disabled';
                }
                x += "<button onclick='"+menuObj.menus[i].items[j].func+"(event)' "+status+">" + menuObj.menus[i].items[j].name + "</button>";
            }
        }
    }

    var clearSelect = document.querySelectorAll('*');
    var index = 0, length = clearSelect.length;
    for ( ; index < length; index++) {
        clearSelect[index].classList.remove('selected');
    }

    e.target.classList.add('selected');

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
    addLogItem("Ev.id: "+eventNum+"; Type: "+e.type+"; X: "+e.clientX+"; Y: "+e.clientY+"; WW: "+winScW+"; WH: "+winScH+"; El.id: "+d.id+"; El.class: "+d.classList+"; El.tagName: "+d.tagName+"; TimeStamp:"+getCurrentTime()+";" );     
    putDot(e, eventNum);   
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

function addLogItem(data, error = null){
    var node = document.createElement("p");     
    var textnode = document.createTextNode(data);
    if (error == 'error'){
        node.style.color = "red";
    } else if (error == 'success'){
        node.style.color = "green";
    }
    node.dataset.eventId = eventNum;
    node.style.transition = "0.5s linear all";
    node.style.opacity = "1";
    node.style.overflow = "hidden";
    node.style.display = "block";
    node.classList.add('eventLogItem');
    node.appendChild(textnode);
    document.querySelector("#events_log").appendChild(node);  
    node.style.height = parseInt( node.offsetHeight );
    eventNum = eventNum + 1;
}

function moveMouseDebug(e){
    if((debug == "full") && (!e.target.closest('#debug_side'))){debugFunc(e);};
    
    if(e.target.classList.contains('eventLogItem')){    
        //debug = true;
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
        //debug = "full";
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

//Events
window.addEventListener("resize", getWindowSize);

window.addEventListener("click", function(e) {
    if (!e.target.classList.contains('customMenu')){
        removeContextMenu();
    }
    if(!(typeof debug === "undefined")){
        if (debug !== false){
            debugFunc(e);
        };
    };
});

window.addEventListener("contextmenu", function(e){
    showContextMenu(e);
}, false);

//END Events

//DEBUG init
if (!(typeof debug === "undefined"))  {
    if (debug != false){
        window.addEventListener("mousemove",moveMouseDebug);
        var debugSide = document.createElement("DIV");   // Create a <button> element
        debugSide.innerHTML = "<a class='debug_toggler' onclick='toggleDebugSide()' title='Toggle Debug'>>></a><div class='debug_inner'><h2>Debug Info </h2><div id='events_log' ></div><div class='menusObjectPrint'></div></div>";  
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
                        "items":[{  "name":"Show More Info", 
                                    "func": "test_func",
                                    "status": "disabled"
                                },
                                {   "name":"Delete 'first' menu",
                                    "func": "test_removeEE"
                                },
                                {   "name":"Remove this event", 
                                    "func": "deleteEventLogItem"
                                },
                                {   "name":"Remove this menu", 
                                    "func": "test_remove"
                                }]
                            };
    addNewMenu(customMenu);
};

function clearEventLog(){
    document.querySelector('#events_log').innerHTML = "";
};

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