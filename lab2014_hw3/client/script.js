/**
 * Created by Yaniv on 20/04/14.
 */
'use strict';

var images = [
    'http://placehold.it/400x401',
    'http://placehold.it/400x402',
    'http://placehold.it/400x403',
    'http://placehold.it/400x404',
    'http://placehold.it/400x405',
    'http://placehold.it/400x406',
    'http://placehold.it/400x407',
    'http://placehold.it/400x408',
    'http://placehold.it/400x409'
];

var index = 0;

function build_table(images){
    var tbl = document.getElementById('gallery_table');
    var k = 0;
    for (var i = 0; i < 3; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < ((images.length)/3); j++) {
            var td = tr.insertCell();
            var img = new Image();
            img.src = images[k++];
            img.width = 200;
            img.height = 200;
            img.class = 'gallery_photo';
            img.id = 'photo_number_' + k;
            td.appendChild(img);
        }
    }
}
build_table(images);

var move_right = function() {
    if (index == images.length -1) {
        return;
    }
    var img = document.getElementById('current_image');
    index += 1;
    img.src = images[index];
    if (index == images.length - 1) {
        var next = document.getElementById('next');
        next.removeAttribute('href');
    } else if (index == 1)  {
        var prev = document.getElementById('prev');
        prev.setAttribute('href','javascript:void(0)');
    }
};

var move_left = function() {
    if (index == 0) {
        return;
    }
    var img = document.getElementById('current_image');
    index -= 1;
    img.src = images[index];
    if (index == images.length - 2) {
        var next = document.getElementById('next');
        next.setAttribute('href','javascript:void(0)');
    } else if (index == 0) {
        var prev = document.getElementById('prev');
        prev.removeAttribute('href');

    }
};

var close_window = function() {
    var div = document.getElementById('gallery_window');
    var d = div.parentNode;
    d.removeChild(div);
    index = 0;
};

function create_view(html){};

document.getElementById('open_gallery').addEventListener('click',function(){

    var gallery = document.createElement("div");
    gallery.id = "gallery_window";
    gallery.style.width = "80%";
    gallery.style.height = "80%";
    gallery.style.background = "white";
    gallery.style.color = "black";
    gallery.style.position = 'fixed';
    gallery.style.zIndex = '1000';
    gallery.style.left = '5%';
    gallery.style.bottom = '5%';
    gallery.style.borderStyle = 'solid';
    gallery.style.borderWidth='1px';
    var image_source=images[index];
    var slide_html= '<img src="'+image_source+'" id="current_image">';
    slide_html+=    '<br>';
    slide_html+=    '<a id="prev">previous image </a>';
    slide_html+=    '<a id="close" href="javascript:void(0)"> close window </a>';
    slide_html+=    '<a id="next" href="javascript:void(0)"> next image </a>';

    gallery.innerHTML = slide_html;
    var body = document.body;
    body.appendChild(gallery);

    document.getElementById('close').addEventListener('click',close_window);

    document.getElementById('next').addEventListener('click', move_right);

    document.getElementById('prev').addEventListener('click', move_left);

});

document.body.addEventListener('keydown', function(e){
    switch (e.keyCode) {
        case 37:
            move_left();
            break;
        case 39:
            move_right();
            break;
        case 27:
            close_window();
            break;
    }
});

//build_table(images);