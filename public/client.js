const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let messageArea  = document.querySelector('.message_area')
 do{
name =  prompt("enter your name ")
 }
while(!name)
let at;
let count=0;
do{
    at =  prompt("enter passcode ")
    count=count+1;
    if(count==2){
        alert("user name and passcode did not match ") 
        count=0
        do{
            name =  prompt("enter your name ")
             }
            while(!name)
     }
     }
    while(at!='iloveki')

textarea.addEventListener('keyup',(e) =>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    
    }
})

function sendMessage(msgs){
    let msg = {
        user:name,
        message: msgs
    }
    //Append 

    appendMessage(msg,'outgoing')
    textarea.value=''

    // send 
    socket.emit('message',msg)
}

function appendMessage(mg,type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className,'mg')
    let markup =`<h4> ${mg.user}</h4>
    <p> ${mg.message}</p>
    `

    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
    scrollToBottom()
    

}

// receive message 

socket.on('message',(msg)=> {
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}