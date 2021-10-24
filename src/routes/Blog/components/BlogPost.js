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
    const getId = this.props.match.params.id;
    const getData = dataBlog.cardData.find((item) => item.id === getId);
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
            <img src={getData.img} alt={getData.imgAlt} />
            {getData.subTitle && <span className="subtitle-blogpost">{getData.subTitle}</span>}
            {getData.description && <p>{getData.description}</p>}
            {getData.video && (
              <iframe
                width="100%"
                height="400px"
                className="video-blogpost"
                src={getData.iframe}
                title={getData.iframeTitle}
                type="video/mp4"
              ></iframe>
            )}
            {getData.subTitle2 && <span className="subtitle-blogpost">{getData.subTitle2}</span>}
            {getData.description2 && <p>{getData.description2}</p>}
            {getData.img2 && <img src={getData.img2} alt={getData.img2Alt} />}
            {getData.video2 && (
              <video
                controls
                width="480"
                className="video-blogpost"
                src={getData.video2}
                title={getData.iframeTitle2}
                type="video/mp4"
              ></video>
            )}
            {getData.subTitle3 && <span className="subtitle-blogpost">{getData.subTitle3}</span>}
            {getData.description3 && <p>{getData.description3}</p>}
            {getData.img3 && <img src={getData.img3} alt={getData.img3Alt} />}
            {getData.video3 && (
              <iframe
                width="100%"
                height="400px"
                className="video-blogpost"
                src={getData.video3}
                title={getData.iframeTitle3}
                type="video/mp4"
              ></iframe>
            )}
            {getData.subTitle4 && <span className="subtitle-blogpost">{getData.subTitle4}</span>}
            {getData.video4 && (
              <video
                controls
                width="480"
                className="video-blogpost"
                src={getData.video4}
                type="video/mp4"
              ></video>
            )}
            {getData.description4 && <p>{getData.description4}</p>}
            {getData.img4 && <img src={getData.img4} alt={getData.img4Alt} />}
            {getData.subTitle5 && <span className="subtitle-blogpost">{getData.subTitle5}</span>}
            {getData.description5 && <p>{getData.description5}</p>}
            {getData.img5 && <img src={getData.img5} alt={getData.img5Alt} />}
            {getData.video5 && (
              <video
                controls
                width="480"
                className="video-blogpost"
                src={getData.video5}
                type="video/mp4"
              ></video>
            )}
            {getData.subTitle6 && <span className="subtitle-blogpost">{getData.subTitle6}</span>}
            {getData.description6 && <p>{getData.description6}</p>}
            {getData.conclusion && <p className="conclusion">{getData.conclusion}</p>}
          </div>
        </div>
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
