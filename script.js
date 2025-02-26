const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const moreWisdomButton = document.getElementById('new-quote');
let apiQuotes = [];

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteAuthor.textContent = quote.author;
    quoteText.textContent = quote.text ? quote.text : "unknown";
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
}

async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error) {
        console.error('error fetching quotes', error);
        quoteText.textContent = "Oops! Something went wrong. Please try again later.";
    }
    
}

function tweetQuote (){
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

getQuotes();

moreWisdomButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);