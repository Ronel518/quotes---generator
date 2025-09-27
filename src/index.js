function generateQuote(event){
event.preventDefault();
new Typewriter("#quotes", {
  strings: "You must be the change you wish to see in the world",
  autoStart:true,
  cursor :"",
  delay: 100
});
}
let quoteFormElement = document.querySelector("#quotes-generator-form");
quoteFormElement.addEventListener("submit", generateQuote);
