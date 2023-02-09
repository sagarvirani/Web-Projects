        var surface;  
        var image;  
        var angle = 0;  
   
        function drawCanvas()  
        {  
            // Get our Canvas element  
            surface = document.getElementById("canvas");  
   
            if (surface.getContext)  
            {  
                // If Canvas is supported, load the image  
                image = new Image();  
                image.onload = loadingComplete;  
                image.src = "https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/fashion/rolex-tudor-cartier-watch-entry-level-picks/4784131-14-chi-HK/14-2022-Cartier-Rolex-Tudor-2_img_370_h.jpg";  
            }  
        }  
   
        function loadingComplete(e)  
        {  
            // When the image has loaded begin the loop  
            setInterval(loop, 25);  
        }  
   
        function loop()  
        {  
            // Each loop we rotate the image  
   
            var surfaceContext = surface.getContext('2d');  
   
            // Clear the canvas to White  
            surfaceContext.fillStyle = "#ffffff";  
            surfaceContext.fillRect(0, 0, surface.width, surface.height);  
   
            // Save the current context  
            surfaceContext.save();  
            // Translate to the center point of our image  
            surfaceContext.translate(image.width * 0.5, image.height * 0.5);  
            // Perform the rotation  
            surfaceContext.rotate(DegToRad(angle));  
            // Translate back to the top left of our image  
            surfaceContext.translate(-image.width * 0.5, -image.height * 0.5);  
            // Finally we draw the image  
            surfaceContext.drawImage(image, 0, 0);  
            // And restore the context ready for the next loop  
            surfaceContext.restore();  
   
            angle++;  
        }  
   
        function DegToRad(d)  
        {  
            // Converts degrees to radians  
            return d * 0.01745;  
        }  

drawCanvas();