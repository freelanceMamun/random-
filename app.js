const  quoteText =  document.querySelector(".text");
const quotebtn  = document.querySelector(".button_quote");
const autorName = document.querySelector(".aoutor_text");
const copyText =document.querySelector(".copy");
const spechtBtn = document.querySelector(".speech");
const TwitterText = document.querySelector(".twitter");
let url = "http://api.quotable.io/random",
synth = speechSynthesis;

function randomQuote(){
    quotebtn.classList.add("Loading")
    quotebtn.innerText  = "Loading quote..."
    fetch(url)
           .then((response) =>{ 
               return response.json();
           })
           .then((data)=>{
                    const content = data.content ;
                    quoteText.innerText = content ;
                    autorName.innerText = data.author;
                    quotebtn.classList.remove("Loading");
                    quotebtn.innerText  = "New Quote"
           })     
}

spechtBtn.addEventListener("click",()=>{
     if(!quotebtn.classList.contains("Loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${autorName.innerText}`);
           synth.speak(utterance);
                       setInterval(() => {
                        !synth.speaking ? spechtBtn.classList.remove("active") : spechtBtn.classList.add("active");
                       }, 100);
     }
})

copyText.addEventListener("click",()=>{
    navigator.clipboard.writeText(quoteText.innerText)
});
quotebtn.addEventListener("click",randomQuote)
