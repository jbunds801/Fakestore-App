import { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css"

const HomePage = () => {
    const [image, setImage] = useState([]);

    useEffect(() => {

        async function fetchRandomImage() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                const randomImage = response.data
                    .sort(() => 0.5 - Math.random()).slice(0, 5);

                setImage(randomImage);
            } catch (error) {
                return ('Error fetching images:', error)
            }
        }

        fetchRandomImage();
    }, []);

    return (
        <>
            <div>
                <Container>
                    <Row className="mb-4 text-center ">
                        <div>
                            <h3 className="mb-3">Welcome to FakeStore</h3>
                            <h4>You'll love our fake shopping experience!</h4>
                        </div>
                    </Row>

                    <Row>
                        <Col>
                            <Carousel fade data-bs-theme="dark" controls={false} indicators={false}>
                                {image.map((product) => (
                                    <Carousel.Item key={product.id} interval={2500}
                                        className="carousel-image">
                                        <img className='d-flex mx-auto my-4'
                                            src={product.image}
                                            alt={`slide image of ${product.title}`} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center mt-5">
                        <Link to='/products'>
                            <Button className="buttons" variant="outline-dark">Products</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </>

    );
};

export default HomePage;