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

function StoreInLocal(SelectedDOM, EntireDOM){
    //store it in localstorage
    console.log("SelectText ClassName ", SelectedDOM.commonAncestorContainer.className);
    console.log("SelectText ID ", SelectedDOM.commonAncestorContainer.id);
    console.log("SelectedHTML  ", SelectedDOM.commonAncestorContainer.innerHTML);
    console.log("SelectedText ", SelectedDOM.commonAncestorContainer.innerText);
    console.log("ParentElem ClassName ", SelectedDOM.commonAncestorContainer.parentElement.className);
    console.log("ParentElem ID ", SelectedDOM.commonAncestorContainer.parentElement.id);
    console.log("Entire DOM is ",  EntireDOM);

    let CurrentContent = { 
        SelectTextClassName : SelectedDOM.commonAncestorContainer.className,
        SelectTextID : SelectedDOM.commonAncestorContainer.id,
        SelectedHTML : SelectedDOM.commonAncestorContainer.innerHTML,
        SelectedText : SelectedDOM.commonAncestorContainer.innerText,
        ParentElemClassName : SelectedDOM.commonAncestorContainer.parentElement.className,
        ParentElemID : SelectedDOM.commonAncestorContainer.parentElement.id,
        DOM: EntireDOM,
    };
    var alreadySelectedTxt = JSON.parse( localStorage.getItem("HightlightInfo"));
    alreadySelectedTxt.push(CurrentContent);
    // console.log("Converted JSON ",  JSON.stringify(alreadySelectedTxt));
    localStorage.setItem("HightlightInfo", JSON.stringify(alreadySelectedTxt));
};

function StoreAndColor(selectedText){
    console.log("In StoreAndColor", selectedText);

    if (selectedText.isCollapsed == false){ //if selected text isnt empty,
        if (selectedText.rangeCount && selectedText.getRangeAt) {
            range = selectedText.getRangeAt(0); //reading first one- in firefox there is an option to select multiple times.
            //https://javascript.info/selection-range#:~:text=using%20the%20method%3A-,getRangeAt(i),-%E2%80%93%20get%20i%2Dth
            console.log("range val", range );
        }
        
        if (range) {
            // Set design mode to on
            document.designMode = "on";
            //adding to range
            selectedText.addRange(range);
            // Colorize text
            document.execCommand("ForeColor", false, "white");
            document.execCommand("BackColor", false, "black");
            // Set design mode to off
            document.designMode = "off";
            //storing in local storage
            StoreInLocal(range,selectedText);
            //remove selected default selection
            selectedText.removeAllRanges();
        }
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
   else{
    keysPressed.Coloring = false
   }
},);

// document.addEventListener('keyup', (event) => {
//    console.log("key left ", event.key);
//    if(event.key == 'Alt') {
//         keysPressed.Alt = false;
//         console.log("alt left");
//    }
// });


//try
// document.addEventListener("selectionchange",(event)=>{
//     setTimeout(()=>{
//         alert(document.getSelection());
//     },1000)
// });

// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log("LOADED");
//     //read json from localstorage
//     var selectedText = localStorage.getItem("HightlightInfo");
//     //create ranges.
//     for (eachSel of selectedText){
//         console.log(eachSel);
//     }
// });


window.addEventListener("load", (event) => {
    console.log("loaaaaded");
    var selectedText = JSON.parse(localStorage.getItem("HightlightInfo"));
    console.log(selectedText);
    //create ranges.
    selectedText.forEach((eachTxt) => {
        console.log(eachTxt);
        console.log(typeof(eachTxt));
        console.log(eachTxt.SelectedText);
        var test = eachTxt.SelectedText
        // var range = document.createRange();
        // range.selectNode(test);
        // selection.addRange(range);
        if (test !== undefined){
            let node = document.getElementById(eachTxt.ParentElemID);
            console.log("Found Text ", node);
            // let re = new RegExp(test,"g"); // search for all instances
		    // let newText = node.replace(re, `<mark>${test}</mark>`);
            // console.log("NEW TEXT ", newText);
		    // document.getElementById(eachTxt.ParentElemID).innerHTML = newText;

            // node.setAttribute(
            //     "style",
            //     "background-color: yellow; display: inline;"
            //  );
            //  test.surroundContents(node);

            console.log("Entire DOM ", eachTxt.DOM);
        }
    });

});
