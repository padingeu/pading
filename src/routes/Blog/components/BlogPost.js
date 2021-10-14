import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import dataBlog from './dataBlog';
import './_BlogPost.scss';

export default class BlogPost extends React.Component {

  scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    console.log(this.props)
    const getId = this.props.match.params.id;
    const getData = dataBlog.cardData.filter((item) => {
      return (item.id = getId);
    })[0];
    return (
      <div>
        <NavBar scrollUp={this.scrollUp} />
        <div className="blog-post">
          <div className="blog-post-content">
            <Link to="/blog">
              <i className="fas fa-arrow-circle-left fa-2x"></i>
            </Link>
            <h1>{getData.title}</h1>
            <span className="blog-post-date">{getData.date}</span>
            <div className="blog-post-tags">
              {getData.tags &&
                getData.tags.map((tag, index) => {
                  return (
                    <span key={index} className={tag}>
                      #{tag}
                    </span>
                  );
                })}
            </div>
            {getData.subTitle && <span className="subtitle-blogpost">{getData.subTitle}</span>}
            {getData.description && <p>{getData.description}</p>}
            <img src={getData.img} alt={getData.imgAlt} />
            {getData.video && <iframe width="560" height="315" className="video-blogpost" src={getData.video} type="video/mp4"></iframe>}
            {getData.subTitle2 && <span className="subtitle-blogpost">{getData.subTitle2}</span>}
            {getData.description2 && <p>{getData.description2}</p>}
            {getData.img2 && <img src={getData.img2} alt={getData.img2Alt} />}
            {getData.video2 && <iframe width="560" height="315" className="video-blogpost" src={getData.video2} type="video/mp4"></iframe>}
            {getData.subTitle3 && <span className="subtitle-blogpost">{getData.subTitle3}</span>}
            {getData.description3 && <p>{getData.description3}</p>}
            {getData.img3 && <img src={getData.img3} alt={getData.img3Alt} />}
            {getData.video3 && <iframe width="560" height="315" className="video-blogpost" src={getData.video3} type="video/mp4"></iframe>}
            {getData.conclusion && <p>{getData.conclusion}</p>}
          </div>
        </div>
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
