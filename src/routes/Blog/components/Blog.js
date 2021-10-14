import React from 'react';
import { useState } from 'react';
import './_Blog.scss';
import dataBlog from './dataBlog';
import BlogPostCard from './BlogPostCard';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

function Blog() {
  const [searchPost, setSearchPost] = useState('');

  const scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filterPosts = (value) => {
    setSearchPost(value);
    document.querySelector('.search-bar-blog').value = value;
  };

  return (
    <div>
      <NavBar scrollUp={scrollUp} />
      <div className="blog">
        <h1>PADING TRAVEL BLOG</h1>
        <span>We talk about travel, putting people and the planet at the heart</span>
        <div className="container">
          <div className="search-article">
            <form className="search-form-blog">
              <input
                className="search-bar-blog"
                type="text"
                placeholder="Search for an article"
                onChange={(event) => {
                  filterPosts(event.target.value);
                }}
              />
            </form>
            <i className="fas fa-search fa-xl"></i>
          </div>
          <div className="search-tags">
            <button className="ecology" onClick={() => filterPosts('Ecology')}>#Ecology</button>
            <button className="inspiration" onClick={() => filterPosts('Inspiration')}>#Inspiration</button>
            <button className="traveltips" onClick={() => filterPosts('TravelTips')}>#Traveltips</button>
            <button className="destinations" onClick={() => filterPosts('Destinations')}>#Destinations</button>
            <button className="pading" onClick={() => filterPosts('Pading')}>#Pading</button>
            <button className="culture" onClick={() => filterPosts('Culture')}>#Culture</button>
            <button className="all" onClick={() => filterPosts('')}>All #</button>
          </div>
          {dataBlog.cardData
            .filter((val) => {
              if (searchPost === '') {
                return val;
              } else if (val.title.toLowerCase().includes(searchPost.toLowerCase())) {
                return val;
              } else if (
                val.tags &&
                val.tags.join().toLowerCase().includes(searchPost.toLowerCase())
              )
              return val;
            })
            .map((item, index) => {
              return (
                <BlogPostCard
                  key={index}
                  title={item.title}
                  img={item.img}
                  description={item.description}
                  tags={item.tags}
                  date={item.date}
                  link={`/blogpost/${item.id}`}
                />
              );
            })}
        </div>
      </div>

      <Footer scrollUp={scrollUp} />
    </div>
  );
}

export default Blog;
