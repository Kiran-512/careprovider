import slide1 from './images/carousel1.jpg';
import slide2 from './images/carousel2.jpg';
import slide3 from './images/carousel3.jpg';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
export default function Carouselslide() {
  const state = useSelector((state) => state);
  return (
    <div className='container-fluid mt-5'>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide1} height={700}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2} height={700}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3} height={700}
            alt="Third slide"
          />
        </Carousel.Item>

      </Carousel>
    </div>
  );
}
