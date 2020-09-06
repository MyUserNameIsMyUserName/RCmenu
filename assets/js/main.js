// undefined, false, true, "full" and "full-nomovelog" debug modes
var debug = 'full-nomovelog';
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
    if((debug!== undefined) && (debug!==false)){debugFunc(e);};

    removeContextMenu();
    x = "";
    var d = getEventElement(e);
    for (i in menuObj.menus) {
        if ((d.id == menuObj.menus[i].name) || (d.classList.contains(menuObj.menus[i].name)) || (d.tagName == menuObj.menus[i].name.toUpperCase())){
            if (debug=="full"){
                x += "<button disabled class='titleMenu'>" + menuObj.menus[i].name + "</button>";
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
    //alert(d.id);
    var node = document.createElement("p");   
    if ((e.type == 'mousemove') && (debug !== 'full-nomovelog')) {
        var textnode = document.createTextNode("Event: "+e.type+"; X: "+e.clientX+"; Y: "+e.clientY+"; WW: "+winScW+"; WH: "+winScH+"; El.id: "+d.id+"; El.class: "+d.classList+"; El.tagName: "+d.tagName+";");
    } else {
        var textnode = document.createTextNode("Event: "+e.type+"; X: "+e.clientX+"; Y: "+e.clientY+"; WW: "+winScW+"; WH: "+winScH+"; El.id: "+d.id+"; El.class: "+d.classList+"; El.tagName: "+d.tagName+";");
    }
    node.dataset.eventId = eventNum;
    node.classList.add('eventLogItem');
    node.appendChild(textnode);         
    putDot(e, eventNum);           
    eventNum = eventNum + 1;
    document.querySelector("#events_log").appendChild(node);  

    //bottttt
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
    //document.querySelector('.menusObjectPrint').innerHTML = JSON.stringify(menuObj);
}

function addLogItem(data, error = null){
    var node = document.createElement("p");     
    var textnode = document.createTextNode(data);
    if (error == 'error'){
        node.style.color = "red";
    } else if (error == 'success'){
        node.style.color = "green";
    }
    node.classList.add('eventLogItem');
    node.appendChild(textnode);
    document.querySelector("#events_log").appendChild(node);  
}

function moveMouseDebug(e){
    if(debug == "full"){debugFunc(e);};
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

//Events
window.addEventListener("resize", getWindowSize);

window.addEventListener("click", function(e) {
    if (!e.target.classList.contains('customMenu')){
        removeContextMenu();
    }
    if((debug!== undefined) && (debug!==false)){debugFunc(e);};
});

window.addEventListener("contextmenu", function(e){
    showContextMenu(e);
}, false);



//END Events

//DEBUG init
if ((debug!== undefined) && (debug!==false)) {
    
    window.addEventListener("mousemove", function(e){
        moveMouseDebug(e);    
    });

    /*
    window.addEventListener("scroll", function(e) {
        if((debug!== undefined) && (debug!==false)){debugFunc(e);};
    });
    */

    var debugSide = document.createElement("DIV");   // Create a <button> element
    debugSide.innerHTML = "<h2>Debug Info</h2><div id='events_log' style='height: 50%; width: 100%; overflow: hidden; overflow-y: scroll; display: block; background: rgba(0,0,0,0.25)'></div><div class='menusObjectPrint'></div>";  
    debugSide.setAttribute("id", "debug_side");
    debugSide.style.color = 'white';
    debugSide.style.position = 'absolute';
    debugSide.style.top = '0';
    debugSide.style.left = '0';
    debugSide.style.height = 'calc(100% - 20px)';
    debugSide.style.width = '350px';
    debugSide.style.padding = '10px';
    debugSide.style.background = 'rgba(0,0,0,0.25)';
    document.body.appendChild(debugSide);   
    test_add();
}


//TEST FUNCTION
function test_func(e){
    alert(e.target.innerHTML);
}


function test_remove(){
    removeMenu('eventLogItem');
}
function test_removeEE(){
    removeMenu('first');
}

function test_add(){
    

    var customMenu = {  "name":"eventLogItem", 
                        "items":[{  "name":"Show More Info", 
                                    "func": "test_func",
                                    "status": "disabled"
                                },
                                {   "name":"Delete Event",
                                    "func": "test_removeEE"
                                },
                                {   "name":"Remove this menu", 
                                    "func": "test_remove"
                                }]
                            };
    addNewMenu(customMenu);
}

function clearEventLog(){
    document.querySelector('#events_log').innerHTML = "";
}
