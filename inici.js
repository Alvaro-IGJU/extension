let tabId;
chrome.tabs.query({ active: true, currentWindow: true } ,
    function (tabs) {
        let currTab = tabs[0];
        if (currTab) { tabId = currTab.id }
    }
);

//FACEBOOK

//Change background
let btn = document.getElementById("btn_change_background");

btn.addEventListener("click", click_change_background);

function click_change_background(evt) {

    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_change_background,
        args:["red"]
    });
}

function exec_change_background(valor){
    document.getElementById("globalContainer").style.backgroundColor=valor;
}


//Change links
function click_change_links(color) {
    
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_change_links,
        args:[color]
    });
}


document.getElementById("btn_change_links").addEventListener("click",()=>{
    let color = document.getElementById("btn_change_links_colors").value;
    console.log(color)
    click_change_links(color);
});

function exec_change_links(valor){
    let links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
            links[i].style.color = valor
        
    }
}

//Delete images
function click_delete_images() {
    
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_delete_images,
        args:[]
    });
}

document.getElementById("btn_delete_imgs").addEventListener("click",()=>{
   
    click_delete_images();
});

function exec_delete_images() {
    let images = document.getElementsByTagName("img");
    let imagesArray = Array.from(images);

    for (let i = 0; i < imagesArray.length; i++) {
        imagesArray[i].remove();
    }
}

//Show/Hide Passwords

function click_changeState_passwords() {
    
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_changeState_passwords,
        args:[]
    });
}

document.getElementById("btn_changeState_passwords").addEventListener("click",()=>{
   
    click_changeState_passwords();
});

function exec_changeState_passwords() {
    let allInputs = document.querySelectorAll('input'); 
    allInputs.forEach(function(input) {

        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');
            input.setAttribute('is_pass', 'false');
        }else if (input.getAttribute('type') === 'text' && input.getAttribute('is_pass') === "false"){
           
                input.setAttribute('type', 'password');
                input.setAttribute('is_pass', 'true');
            
        }
    });
}

//AMAZON
let sticky_menu = document.createElement("div");
sticky_menu.style.width = "200px";
sticky_menu.style.height = "200px";
sticky_menu.style.position = 'fixed';
sticky_menu.style.top = '50%';
sticky_menu.style.right = '10px';
sticky_menu.style.backgroundColor = 'red';
let button_images = document.createElement("button");
button_images.textContent = "Show text images";
button_images.id = "button_images_text";
button_images.addEventListener("click",()=>{
    
    click_imagesText();

});

let button_prices = document.createElement("button");
button_prices.textContent = "Search lowest price";
button_prices.id = "button_lowest prices";
sticky_menu.appendChild(button_images)
sticky_menu.appendChild(button_prices)
console.log(sticky_menu)
function exec_showStickyMenu(sticky_menu){
    console.log(sticky_menu)
    document.body.appendChild(sticky_menu);
}

document.getElementById("btn_sticky_menu").addEventListener("click",()=>{
    
    click_showStickyMenu(sticky_menu);
});

//show menu
function click_showStickyMenu() {
    console.log("AA")
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_showStickyMenu,
        args:[sticky_menu]
    });
}



//show text images
function click_imagesText() {
    
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_imagesText,
        args:[]
    });

}

    document.getElementById("button_images_text")


function exec_imagesText() {
    let images = document.getElementsByTagName("img");

    let imagesArray = Array.from(images);

    for (let i = 0; i < imagesArray.length; i++) {
        imagesArray[i].addEventListener("mouseover", function(){
            console.log(imagesArray[i].getAttribute("alt"));
        });
    }

}