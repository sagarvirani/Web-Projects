setInterval(rotate360,100);

function rotate360() {
    var range = document.getElementById('range').value;
    var main_img = document.getElementById('main');
    main_img.innerHTML = '<img src="images/'+range+'.jpg">'
}