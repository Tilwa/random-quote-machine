function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setColor] = React.useState("#0000FF");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    let colors = [
      "#0000FF",
      "#DC143C",
      "#A52A2A",
      "#006400",
      "#2F4F4F",
      "#4B0082",
      "#191970",
      "#800080",
      "#C71585",
      "#BDB76B",
    ];

    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColorIndex = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[randIndex]);
    setColor(colors[randColorIndex]);
  };
  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card" id="quote-box">
            <div className="card-header" id="heading">
              Random Quote Machine
            </div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-text" style={{ color: color }}>
                    &quot;{randomQuote.text}&quot;
                  </h5>
                  <h6
                    className="card-title"
                    id="author"
                    style={{ color: color }}
                  >
                    ~{randomQuote.author || "Anonymous"}
                  </h6>
                </>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
            <div className="container">
              <div className="column">
                <button
                  onClick={getNewQuote}
                  style={{ backgroundColor: color }}
                  id="button1"
                >
                  New Quote
                </button>
                <button style={{ backgroundColor: color }} id="button2">
                  <a
                    href={
                      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                      encodeURIComponent(
                        '"' + randomQuote.text + '"' + randomQuote.author
                      )
                    }
                    target="_blank"
                  >
                    Go Tweet
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
