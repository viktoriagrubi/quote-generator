import "./index.css";
import { useState, useEffect } from "react";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/quotes?limit=20")
      .then((res) => res.json())
      .then((json) => setQuotes(json.quotes));
  }, []);

  function getQuoteById(id) {
    fetch(`https://dummyjson.com/quotes/${id}`)
      .then((res) => res.json())
      .then((json) => setQuote(json));
  }

  return (
    <main>
      <h1>Quote List</h1>
      {quote ? (
        <section>
          <h3>
            <span>“</span>
            {quote.quote}
          </h3>
          <i>- {quote.author}</i>
        </section>
      ) : (
        <section>
          <ul>
            {quotes.map((q) => (
              <li key={q.id} onClick={() => getQuoteById(q.id)}>
                {q.quote} - <i>{q.author}</i>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
