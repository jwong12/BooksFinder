import React, { Component } from 'react';

class BookListing extends Component {
    formatAuthors = (authors) => {
        if(authors && authors.length > 1) {   
            let authorsConcat = authors[0];

            for(let i = 1; i < authors.length; i++) {
                if(i === authors.length - 1) {
                    authorsConcat += ' and ' + authors[i];
                    return authorsConcat;
                }
                authorsConcat += ', ' + authors[i];
            }

        } else if(authors && authors.length === 1) {
            return authors;
        }
        return 'Unknown';
    }

    formatCategories = (categories) => {
        if(categories && categories.length >= 1) {
            let categoriesConcat = categories[0];

            for(let i = 1; i < categories.length; i++) {
                categoriesConcat += ' | ' + categories[i];
            }
            return categoriesConcat;
        }
        return 'Unknown';
    }

    render() {
        return(
            <div className="book">
                <img src={this.props.imgUrl ? this.props.imgUrl : "unknown.jpg"} alt={this.props.title} />
                <div className="bookDetails">
                    <a href={this.props.volumeUrl} target="_blank" rel="noopener noreferrer">{this.props.title}</a>                    
                    <p className="authors">by {this.formatAuthors(this.props.authors)}</p>
                    <p>Category: {this.formatCategories(this.props.categories)}</p>
                    <p>Description: {this.props.description}</p>
                </div>
            </div>
        );
    }
}

export default BookListing;