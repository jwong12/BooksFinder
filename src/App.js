import React, { Component } from 'react';
import BookListing from './BookListing';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      bookInput: '',
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      bookInput: 'Harry Potter'
    }, () => {
      this.getApiRequest(this.state.bookInput);
    });
  }

  getApiRequest(keyword) {
    const newKeyword = keyword.trim().replace(/ /g, '+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${newKeyword}&maxResults=40`

    axios.get(url)
    .then((response) => {
      this.setState({ books: response.data.items });

      if(response.data.totalItems === 0) {
        this.setState({ error: `No books found for '${keyword}'.` });
      }            
    })
    .catch((error) => {
      console.error('There was an error from the api server.');
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleKeyDown(e) {
    if(e.keyCode === 13) {
      this.handleSearchClick();
    }
  }

  handleSearchClick() {
    this.setState({ error: null });
    this.getApiRequest(this.state.bookInput);
  }

  render() {
    const { books, error } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Books Collection</h1>
          <input 
            name="bookInput"
            value={this.state.bookInput}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter title or author"
          />
          <button onClick={this.handleSearchClick}>Search</button>          
          {!books.length && (
            <div id="loader">
              <Loader
                type="CradleLoader"
                height={100}
                width={100} 
              />
            </div>            
          )}
          {books && (
            <ul>
              {books.map((book) => 
                <li key={book.etag}>
                  <BookListing 
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    categories={book.volumeInfo.categories}
                    description={book.volumeInfo.description}
                    imgUrl={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
                    volumeUrl={book.volumeInfo.canonicalVolumeLink}
                  />
                </li>
              )}
            </ul>
          )}          
          {error && (
            <p>{error}</p>
            )}
        </header>
      </div>
    );
  }  
}

export default App;