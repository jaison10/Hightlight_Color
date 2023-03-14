// document.addEventListener("mouseup",()=>{
//     var selectedText = document.getSelection(); 
//     if ( selectedText !== ''){
//         console.log("here");
//         alert(selectedText);
//     }
//     else{
        
//     }
// })

// document.addEventListener("keyup",(event)=>{
//     var selectedText = document.getSelection(); 
//     if ( selectedText !== ''){
//         console.log("here");
//         alert(selectedText);
//     }
//     else{
        
//     }
// })

//which key has been pressed:
// if (event.key == 'ArrowUp') { }

let keysPressed = {
    Alt : false,
    Coloring : false
};

function StoreAndColor(selectedText){
    if (selectedText !== ''){
        if (selectedText.rangeCount && selectedText.getRangeAt) {
            range = selectedText.getRangeAt(0);
          }
          // Set design mode to on
          document.designMode = "on";
          if (range) {
            selectedText.removeAllRanges();
            selectedText.addRange(range);
          }
        //color
        // Colorize text
        document.execCommand("ForeColor", false, "red");
        // Set design mode to off
        document.designMode = "off";
    }
}

// document.addEventListener('select', (event)=>{
//     alert("selected", event.key);
// });


document.addEventListener('keydown', (event) => {
//    keysPressed[event.key] = true;
   if(event.key == 'Alt'){
        keysPressed.Alt = true;
        console.log("pressed ", event.key);
   }  
   else if((event.key == 'c' || event.key == 'C') && keysPressed.Alt == true && keysPressed.Coloring == false){
        // alert("coloring it!")
        // setTimeout(() => {
        // console.log("coloriing");
        // }, 5000);
        StoreAndColor(document.getSelection());
        console.log("coloriing");
        keysPressed.Coloring = true
   }
},);

document.addEventListener('keyup', (event) => {
   console.log("key left ", event.key);
   if(event.key == 'Alt') {
        keysPressed.Alt = false;
        console.log("alt left");
   }
});