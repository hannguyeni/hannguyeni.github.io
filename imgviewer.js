$(document).ready(function (){
    var camera_controls = new controls(window.location.hash.substring(1));
    var layer_panel = new createMenuImg();
})


function controls(redirect){
    var pos = {x:0,y:0};
    var scale = 1;

    var currentSlot = 1;

    var slot1ImgId = "";
    var slot1Index = 0;
    var slot1Opacity = 1;
    var slot1Hidden = false;

    var slot2ImgId = "";
    var slot2Index = 0;
    var slot2Opacity = 1;
    var slot2Hidden = false;

    var slot3ImgId = "";
    var slot3Index = 0;
    var slot3Opacity = 1;
    var slot3Hidden = false;

    //***************************************************************************************
    //1. Switches layers, updates opacity slider, updates sidebar
    //***************************************************************************************
    $("input[type='radio'][name='slot']").click(function() {
        radioSlotControl(this);
    });
    document.getElementById("opacitySlider").onchange = function() {sliderHandler(this.value)}

    //***************************************************************************************
    //2. Pan controls
    //***************************************************************************************
    document.getElementById("leftbutton").onclick = function() {left()};
    document.getElementById("rightbutton").onclick = function() {right()};
    document.getElementById("upbutton").onclick = function() {up()};
    document.getElementById("downbutton").onclick = function() {down()};
    document.getElementById("panresetbutton").onclick = function() {panreset()};

    //***************************************************************************************
    //3. Zoom controls
    //***************************************************************************************
    document.getElementById("zoominbutton").onclick = function() {zoomin()};
    document.getElementById("zoomoutbutton").onclick = function() {zoomout()};
    document.getElementById("zoomresetbutton").onclick = function() {zoomreset()};

    //***************************************************************************************
    //4. Changes image based on sidebar selection & toggles layer on/off
    //***************************************************************************************
    $("input[type='radio'][name='listImg']").click(function() {
        imgListHandler(this);
    });
    document.getElementById("hidetoggle").onclick = function() {
        HideToggleHandler(this);
    }

    //***************************************************************************************
    //Functions
    //***************************************************************************************
    //***************************************************************************************
    //***************************************************************************************

    function radioSlotControl(radioSelect){
        currentSlot = radioSelect.value;
        if (currentSlot == 1) {
            if (slot1ImgId == "") {
                $('input[name=listImg]').attr('checked',false);
            } else {
                document.getElementById(slot1ImgId).checked = true;
            } 
            document.getElementById("hidetoggle").checked = slot1Hidden;
        } else if (currentSlot == 2) {
            if (slot2ImgId == "") {
                $('input[name=listImg]').attr('checked',false);
            } else {
                document.getElementById(slot2ImgId).checked = true;
            } 
            document.getElementById("hidetoggle").checked = slot2Hidden;
        } else if (currentSlot == 3) {
            if (slot3ImgId == "") {
                $('input[name=listImg]').attr('checked',false);
            } else {
                document.getElementById(slot3ImgId).checked = true;
            } 
            document.getElementById("hidetoggle").checked = slot3Hidden;
        }
        update();
    }

    function sliderHandler(opacityvalue) {
        if (currentSlot == 1) {
            slot1Opacity = opacityvalue;
        } else if (currentSlot == 2) {
            slot2Opacity = opacityvalue;
        } else if (currentSlot == 3) {
            slot3Opacity = opacityvalue;
        }
        update();
    }

    //***************************************************************************************
    //***************************************************************************************
    //***************************************************************************************
    function left() {
        pos.x += 25;
        update();
    }

    function right() {
        pos.x -= 25;
        update();
    }

    function up() {
        pos.y += 25;
        update();
    }

    function down() {
        pos.y -= 25;
        update();
    }

    function panreset() {
        pos.x = 0;
        pos.y = 0;
        update();
    }

    //***************************************************************************************
    //***************************************************************************************
    //***************************************************************************************

    function zoomin() {
        scale = (Number(scale) + 0.2).toFixed(1);
        update();
    }

    function zoomout(){
        if (scale > 0.6) {
            scale = (Number(scale) - 0.2).toFixed(1);
        }   
        update();
    }

    function zoomreset() {  
        scale = 1;
        update();
    }

    //***************************************************************************************
    //***************************************************************************************
    //***************************************************************************************

    function imgListHandler(imgSelect) {
        var id = imgSelect.getAttribute('id');
        if (currentSlot == 1) {
            slot1ImgId = id;
            slot1Index = imgSelect.value;
            imgupdate(slot1Index);
        } else if (currentSlot == 2) {
            slot2ImgId = id;
            slot2Index = imgSelect.value;
            imgupdate(slot2Index);
        } else if (currentSlot == 3) {
            slot3ImgId = id;
            slot3Index = imgSelect.value;
            imgupdate(slot3Index);
        }
    }

    function HideToggleHandler(toggle) {
        if (currentSlot == 1) {
            slot1Hidden = toggle.checked;
        } else if (currentSlot == 2) {
            slot2Hidden = toggle.checked;
        } else if (currentSlot == 3) {
            slot3Hidden = toggle.checked;
        }
        update();
    }

    //***************************************************************************************
    // Update functions
    //***************************************************************************************

    function update() {
        document.getElementById("canvas").style.transform = 'translate('+(pos.x)+'px,'+(pos.y)+'px) scale('+scale+','+scale+')';
        if (currentSlot == 1) {
            if (slot1Hidden) {
                document.getElementById("slot1").style.opacity = 0;
                document.getElementById("opacitySlider").value = 0;
            } else {
                document.getElementById("slot1").style.opacity = slot1Opacity;
                document.getElementById("opacitySlider").value = slot1Opacity;
            }
        } else if (currentSlot == 2) {
            if (slot2Hidden) {
                document.getElementById("slot2").style.opacity = 0;
                document.getElementById("opacitySlider").value = 0;
            } else {
                document.getElementById("slot2").style.opacity = slot2Opacity;
                document.getElementById("opacitySlider").value = slot2Opacity;
            }
        } else if (currentSlot == 3) {
            if (slot3Hidden) {
                document.getElementById("slot3").style.opacity = 0;
                document.getElementById("opacitySlider").value = 0;
            } else {
                document.getElementById("slot3").style.opacity = slot3Opacity;
                document.getElementById("opacitySlider").value = slot3Opacity;
            }
        }
    }

    function imgupdate(index) {
        var elementName = "slot" + currentSlot;
        if (index == 11) {
            document.getElementById(elementName).src = "images/mountains/mountain1.jpg";
        } else if (index == 12) {
            document.getElementById(elementName).src = "images/mountains/mountain2.jpg";
        } else if (index == 13) {
            document.getElementById(elementName).src = "images/mountains/mountain3.jpg";
        } else if (index == 14) {
            document.getElementById(elementName).src = "images/mountains/mountain4.jpg";
        } else if (index == 15) {
            document.getElementById(elementName).src = "images/mountains/mountain5.jpg";
        } else if (index == 21) {
            document.getElementById(elementName).src = "images/beaches/beach1.jpg";
        } else if (index == 22) {
            document.getElementById(elementName).src = "images/beaches/beach2.jpg";
        } else if (index == 23) {
            document.getElementById(elementName).src = "images/beaches/beach3.jpg";
        } else if (index == 24) {
            document.getElementById(elementName).src = "images/beaches/beach4.jpg";
        } else if (index == 25) {
            document.getElementById(elementName).src = "images/beaches/beach5.jpg";
        } else if (index == 31) {
            document.getElementById(elementName).src = "images/structures/structure1.jpg";
        } else if (index == 32) {
            document.getElementById(elementName).src = "images/structures/structure2.jpg";
        } else if (index == 33) {
            document.getElementById(elementName).src = "images/structures/structure3.jpg";
        } else if (index == 34) {
            document.getElementById(elementName).src = "images/structures/structure4.jpg";
        } else if (index == 35) {
            document.getElementById(elementName).src = "images/structures/structure5.jpg";
        } else if (index == 41) {
            document.getElementById(elementName).src = "images/interiors/interior1.jpg";
        } else if (index == 42) {
            document.getElementById(elementName).src = "images/interiors/interior2.jpg";
        } else if (index == 43) {
            document.getElementById(elementName).src = "images/interiors/interior3.jpg";
        } else if (index == 44) {
            document.getElementById(elementName).src = "images/interiors/interior4.jpg";
        } else if (index == 45) {
            document.getElementById(elementName).src = "images/interiors/interior5.jpg";
        } else if (index == 51) {
            document.getElementById(elementName).src = "images/clouds/cloud1.jpg";
        } else if (index == 52) {
            document.getElementById(elementName).src = "images/clouds/cloud2.jpg";
        } else if (index == 53) {
            document.getElementById(elementName).src = "images/clouds/cloud3.jpg";
        } else if (index == 54) {
            document.getElementById(elementName).src = "images/clouds/cloud4.jpg";
        } else if (index == 55) {
            document.getElementById(elementName).src = "images/clouds/cloud5.jpg";
        } 
    }

    //Handles image gallery redirects
    imgupdate(redirect);
}

function createMenuImg(){
    var toggler = document.getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }    
}

