const range = document.getElementById("range");    
const main_img = document.getElementById("main");

range.addEventListener('input', (event)=> {
    //console.log(event.target.value); 
    main_img.innerHTML = '<img src="images/'+event.target.value+'.jpg">'
});
