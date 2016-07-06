var image = new Image();

console.log("Hier kommt das Bild");

image.src = 'data:image/png;base64,' + data.bild;
document.body.appendChild(image);
