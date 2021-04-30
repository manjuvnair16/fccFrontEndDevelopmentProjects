function QuoteGenerator(props) {
  const tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + props.quote + '"' + props.author);
  console.log(tweetUrl);
  return /*#__PURE__*/(
    React.createElement("div", { id: "quote-box" }, /*#__PURE__*/

    React.createElement("div", { id: "text" }, /*#__PURE__*/
    React.createElement("h1", null, /*#__PURE__*/React.createElement("i", { class: "fas fa-quote-left fa-sm" }), "  ", props.quote)), /*#__PURE__*/



    React.createElement("div", { id: "author" }, /*#__PURE__*/
    React.createElement("h2", null, "- ", props.author)), /*#__PURE__*/


    React.createElement("div", { id: "btns" }, /*#__PURE__*/

    React.createElement("span", { id: "tweet" }, /*#__PURE__*/
    React.createElement("div", { id: "tweet-bg" }, /*#__PURE__*/
    React.createElement("a", { href: tweetUrl,
      target: "_top",
      id: "tweet-quote" }, /*#__PURE__*/
    React.createElement("i", { class: "fab fa-twitter fa-3x" })))), /*#__PURE__*/




    React.createElement("span", { id: "btn" }, /*#__PURE__*/
    React.createElement("button", { class: "btn btn-primary btn-lg", id: "new-quote", onClick: props.onClick }, "Next Quote")))));








}


class QuoteApp extends React.Component {
  constructor(props) {
    super(props);
    let currentQuote = getRandomQuote();
    this.state = {
      quote: currentQuote.quote,
      author: currentQuote.author,
      url: currentQuote.url };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let currentQuote = getRandomQuote();
    this.setState({
      quote: currentQuote.quote,
      author: currentQuote.author,
      url: currentQuote.url });

  }

  render() {

    const urlConst = '\"' + this.state.url + '\"';

    const styles = {
      header: {
        backgroundImage: `url(${urlConst})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover' },


      content: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' } };




    return /*#__PURE__*/(
      React.createElement("div", { style: styles.header }, /*#__PURE__*/
      React.createElement("div", { id: "main", style: styles.content }, /*#__PURE__*/
      React.createElement(QuoteGenerator, { quote: this.state.quote,
        author: this.state.author,
        onClick: this.handleClick })), /*#__PURE__*/


      React.createElement("footer", null, "image source: https://www.pexels.com/")));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(QuoteApp, null), document.getElementById('root'));

function getRandomQuote() {
  const quotesArray = [
  {
    quote: "Great minds discuss ideas\; average minds discuss events\; small minds discuss people",
    author: "Eleanor Roosevelt",
    url: "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg" },

  {
    quote: "If you don\'t like something\, change it. If you can\'t change it\, change your attitude.",
    author: "Maya Angelou",
    url: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg" },

  {
    quote: "Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt.",
    author: "William Shakespeare",
    url: "https://images.pexels.com/photos/673018/pexels-photo-673018.jpeg" },

  {
    quote: "Nobody can go back and start a new beginning, but anyone can start today and make a new ending",
    author: "Maria Robinson",
    url: "https://images.pexels.com/photos/5187131/pexels-photo-5187131.jpeg" },

  {
    quote: "A person who never made a mistake never tried anything new",
    author: "Albert Einstein",
    url: "https://images.pexels.com/photos/3394939/pexels-photo-3394939.jpeg" },


  {
    quote: "Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.",
    author: "William A. Ward",
    url: "https://images.pexels.com/photos/5117913/pexels-photo-5117913.jpeg" },

  {
    quote: "Successful and unsuccessful people do not vary greatly in their capabilities. They vary in their desire to reach their potential.",
    author: "John Maxwell",
    url: "https://images.pexels.com/photos/2414442/pexels-photo-2414442.jpeg" },

  {
    quote: "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost",
    url: "https://images.pexels.com/photos/358238/pexels-photo-358238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },

  {
    quote: "Do not let what you cannot do interfere with what you can do",
    author: "John Wooden",
    url: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg" },

  {
    quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    author: "Thomas A. Edison",
    url: "https://images.pexels.com/photos/133372/pexels-photo-133372.jpeg" }];



  let randomIndex = Math.floor(Math.random() * quotesArray.length);
  return quotesArray[randomIndex];

}