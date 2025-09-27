function displayQuotes(response) {
  const quotesContainer = document.querySelector("#quotes");
  quotesContainer.innerHTML = ""; 

  let quotes = [];

  if (Array.isArray(response.data.answer)) {
    quotes = response.data.answer;
  } else if (typeof response.data.answer === "string") {
  quotes = response.data.answer
    .split(/\d+\.\s+/)
    .filter((quote) => quote !== "");

  } else {
    quotes = [response.data.answer];
  }

  quotes.forEach((quoteText) => {
    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote-item"); 

    const quoteSpan = document.createElement("span");
    quoteSpan.textContent = "";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copy-button");

    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(quoteSpan.textContent)
        .then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
        })
        .catch(() => {
          copyBtn.textContent = "Failed to copy";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
        });
    });

   
    quoteDiv.appendChild(quoteSpan);
    quoteDiv.appendChild(copyBtn);

    quotesContainer.appendChild(quoteDiv);

    new Typewriter(quoteSpan, {
      strings: quoteText.trim(),
      autoStart: true,
      cursor: "",
      delay: 30,
      onStringTyped() {
        
        quoteSpan.textContent = quoteText.trim();
        
        copyBtn.style.display = "inline-block";
      },
    });
  });
}

function generateQuote(event) {
  event.preventDefault(); 

  const instructionsInput = document.querySelector("#user-instructions");
  const userText = instructionsInput.value.trim();

  if (userText === "") {
    alert("Please enter a topic for the quote.");
    return;
  }

  instructionsInput.value = "";

  const apiKey = "84a84a55010e06bba8cbc9b41oftda38"; 
  const prompt = `User instructions: Generate short motivational quotes about ${userText}. Max number of quotes 5.`;
  const context =
    "You are an expert in providing short motivational quotes. Follow the user's instructions exactly.";

  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  const quotesContainer = document.querySelector("#quotes");
  quotesContainer.innerHTML = `<div class="loading">Loading quotes for <strong>${userText}</strong>...</div>`;


  axios
    .get(apiUrl)
    .then(displayQuotes)
    .catch((error) => {
      console.error("Error fetching quotes:", error);
      quotesContainer.innerHTML =
        '<div id="quote">❌ Failed to fetch quotes. Please try again later.</div>';
    });
}

const quoteFormElement = document.querySelector("#quotes-generator-form");
quoteFormElement.addEventListener("submit", generateQuote);
