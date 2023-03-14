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

//cart
let SelectedContent = [];

let keysPressed = {
    Alt : false,
    Coloring : false
};

function StoreInLocal(selectedText){
    //store it in localstorage
    console.log("JSON ", JSON.stringify(selectedText));
    let CurrentContent = { SelectedVal : selectedText};
    localStorage.setItem("HightlightInfo", JSON.stringify(CurrentContent));
    //SelectedContent = [...SelectedContent, CurrentContent];
    //localStorage.setItem("HightlightInfo", JSON.stringify(SelectedContent));
};

function StoreAndColor(selectedText){
    console.log("In StoreAndColor", selectedText);

    if (selectedText.isCollapsed == false){ //if selected text isnt empty,
        if (selectedText.rangeCount && selectedText.getRangeAt) {
            range = selectedText.getRangeAt(0); //reading first one- in firefox there is an option to select multiple times.
            //https://javascript.info/selection-range#:~:text=using%20the%20method%3A-,getRangeAt(i),-%E2%80%93%20get%20i%2Dth
            console.log("range val", range );
        }
        // Set design mode to on
        document.designMode = "on";
        if (range) {
            selectedText.removeAllRanges();
            selectedText.addRange(range);
        }
        // Colorize text
        document.execCommand("ForeColor", false, "red");
        // Set design mode to off
        document.designMode = "off";
        StoreInLocal(selectedText);
    }
}


document.addEventListener('keydown', (event) => {
//    keysPressed[event.key] = true;
   if(event.key == 'Alt'){
        keysPressed.Alt = true;
        console.log("pressed ", event.key);
   }  
   else if((event.key == 'c' || event.key == 'C') && keysPressed.Alt == true && keysPressed.Coloring == false){
        let Content =   document.getSelection();
        console.log("in event ", Content);
        console.log( "ID ", document.getSelection().valueOf("id"));
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