let tabId;
chrome.tabs.query({ active: true, currentWindow: true } ,
    function (tabs) {
        let currTab = tabs[0];
        if (currTab) { tabId = currTab.id }
    }
);

let btn = document.getElementById("btn_change_background");

btn.addEventListener("click", click_change_background);

function click_change_background(evt) {

    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_change_background,
        args:["green"]
    });
}

function click_change_links(color) {
    
    chrome.scripting.executeScript({
        target:{"tabId":tabId},
        func:exec_change_links,
        args:[color]
    });
}
function exec_change_background(valor){
    document.getElementById("u_0_1_g8").style.backgroundColor=valor;
}


document.getElementById("btn_change_links").addEventListener("click",()=>{
    let color = document.getElementById("btn_change_links_colors").value;
    console.log(color)
    click_change_links(color);
});

function exec_change_links(valor){
    let links = document.getElementsByTagName("a");
    console.log(links)
    for (let i = 0; i < links.length; i++) {
            links[i].style.color = valor
        
    }
}