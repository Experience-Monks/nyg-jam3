import React from 'react';
import './Image.css';
import { LazyImage } from 'react-lazy-images';

class Image extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Image">
        <LazyImage
          src={this.props.src ? this.props.src : this.props.xLargeSrc}
          srcSet={`${this.props.xLargeSrc} 1920w, ${this.props.largeSrc} 1200w, ${this.props.mediumSrc} 768w`}
          alt={this.props.alt}
          observerProps={{ threshold: 0.01, rootMargin: '50px 0px' }}
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              src="https://via.placeholder.com/500x500"
              alt={imageProps.alt}
              width={this.props.width}
              height={this.props.height}
            />
          )}
          actual={({ imageProps }) => (
            <img
              srcSet={imageProps.srcSet}
              src={imageProps.src}
              alt={imageProps.alt}
              width={this.props.width}
              height={this.props.height}
            />
          )}
        />
      </div>
    );
  }
}

export default Image;
