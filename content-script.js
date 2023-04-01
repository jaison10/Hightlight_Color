
let keysPressed = {
    Alt : false,
    Coloring : false
};

function StoreInLocal(SelectedDOM, EntireDOM){
    let alrdyPrsntJSONFrmStrg;
    var alrdySelctdTxt = [];
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
        SelectedText : EntireDOM.toString(),
        ParentElemClassName : SelectedDOM.commonAncestorContainer.parentElement.className,
        ParentElemID : SelectedDOM.commonAncestorContainer.parentElement.id,
        DOM: EntireDOM,
    };
    alrdyPrsntJSONFrmStrg = localStorage.getItem("HightlightInfo");
    if(alrdyPrsntJSONFrmStrg !== ""){
        alrdySelctdTxt = JSON.parse(alrdyPrsntJSONFrmStrg);
    }
    alrdySelctdTxt.push(CurrentContent);
    // console.log("Converted JSON ",  JSON.stringify(alreadySelectedTxt));
    localStorage.setItem("HightlightInfo", JSON.stringify(alrdySelctdTxt));
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
        // console.log("Window.Getselection value ", window.getSelection());
        // console.log("in event ", Content.toString());
        // console.log( "ID ", document.getSelection().valueOf("id"));
        StoreAndColor(document.getSelection());
        console.log("coloriing");
        keysPressed.Coloring = true
   }
   else{
    keysPressed.Coloring = false
   }
},);

document.addEventListener('mouseup', (event) => {
    console.log("Mouseup fired.");
    console.log("Found text" , document.getSelection().toString());
});

window.addEventListener("load", (event) => {
    console.log("loaaaaded");
    var FullTxtFrmStrg;
    var rtrndJSONFrmStrg = localStorage.getItem("HightlightInfo"); 
    if (rtrndJSONFrmStrg !== ""){
        FullTxtFrmStrg = JSON.parse(rtrndJSONFrmStrg);
        console.log(FullTxtFrmStrg);
        //create ranges.
        FullTxtFrmStrg.forEach((eachVal) => {
            var eachSelctdTxt = eachVal.SelectedText
            console.log("TEXT :  ", eachSelctdTxt);
            if ((document.documentElement.textContent || document.documentElement.innerText).indexOf(eachSelctdTxt) > -1) {
                console.log(eachSelctdTxt, " - Value Found!");
            }else{console.log(eachSelctdTxt, "-  Value NOT Found!");}
            // if (eachSelctdTxt !== undefined){
            //     let node = document.getElementById(eachVal.ParentElemID);
            //     console.log("Found Text ", node);
            //     console.log("Entire DOM ", eachVal.DOM);
            // }
        });
    }else{
        console.log("No Previously Selected Values Found!");
    }  
});
