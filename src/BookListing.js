import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        } 

        return authors;
    }

    formatCategories = (categories) => {
        if(categories && categories.length > 1) {
            let categoriesConcat = categories[0];

            for(let i = 1; i < categories.length; i++) {
                categoriesConcat += ' | ' + categories[i];
            }
            return categoriesConcat;
        }

        return categories;
    }

    render() {
        return(
            <div className="book">
                <img src={this.props.imgUrl} alt={this.props.title} />
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

BookListing.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    categories: PropTypes.array,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    volumeUrl: PropTypes.string.isRequired
}

BookListing.defaultProps = {
    authors: ['Unknown'],
    categories: ['Unknown'],
    description: 'Currently unavailable.',
    imgUrl: 'unknown.jpg'
}

export default BookListing;