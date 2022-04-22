$(document).ready(function (){
    var gallery_controls = new controls();
})

function controls() {
    var posx = 0;
    var imgindex = 1;
    var categoryindex = 1;

    //***************************************************************************************
    // Carousel controls
    //***************************************************************************************
    document.getElementById("leftbutton").onclick = function() {left()};
    document.getElementById("rightbutton").onclick = function() {right()};

    //***************************************************************************************
    // Redirects to the image viewer
    //***************************************************************************************
    $("a").click(linkhandler);

    //***************************************************************************************
    // Changes Images based on selection
    //***************************************************************************************
    $("input[type='radio'][name='categoryselect']").click(function() {
        categorySelect(this);
    });

    //***************************************************************************************
    //***************************************************************************************

    function left() {
        if (posx < 0) {
            posx += 90;
            imgindex -= 1;
        }
        update();
    }

    function right() {
        if (posx > -360) {
            posx -= 90;
            imgindex += 1;
        }
        update();
    }

    //***************************************************************************************
    //***************************************************************************************

    function linkhandler() {
        var linkindex = String(categoryindex) + String(imgindex);
        window.location.href = "index.html" + '#' + linkindex;
    }

    //***************************************************************************************
    //***************************************************************************************

    function categorySelect(radioSelect) {
        categoryindex = radioSelect.value;
        posx = 0;
        imgindex = 1;

        update();
        imgupdate();
    }

    //***************************************************************************************
    // Update functions
    //***************************************************************************************
    function update() {
        document.getElementById("carousel").style.transform = 'translate('+(posx)+'vw)';
        document.getElementById("index").textContent = imgindex + " / 5";
    }

    function imgupdate() {
        var imgpath = "";
        if (categoryindex == 1) {
            imgpath = "mountains/mountain";
        } else if (categoryindex == 2) {
            imgpath = "beaches/beach";
        } else if (categoryindex == 3) {
            imgpath = "structures/structure";
        } else if (categoryindex == 4) {
            imgpath = "interiors/interior";
        } else if (categoryindex == 5) {
            imgpath = "clouds/cloud";
        }
        var srcname = "";
        for (var i = 1; i < 6; i++) {
            srcname = "galleryimages/" + imgpath + i + ".jpg";
            document.getElementById("img" + i).src = srcname;
        }
    }
}