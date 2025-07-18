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
                    <Row className="mb-5 text-center ">
                        <div>
                            <h1>Store Header</h1>
                        </div>
                    </Row>

                    <Row>
                        <Col>
                            <Carousel fade data-bs-theme="dark" controls={false} indicators={false}>
                                {image.map((product) => (
                                    <Carousel.Item key={product.id} interval={2500}>
                                        <img className='d-flex w-50 mx-auto my-5'
                                            src={product.image}
                                            alt={`slide image of {product.title}`}
                                            style={{ height: '400px', objectFit: 'contain' }}
                                        />
                                        {/* <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                                    <h3>First Slide</h3>
                                    <p>Description for the first slide</p>
                                </Carousel.Caption> */}
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center mt-5">
                        <Link to='/products'>
                            <Button className="buttons" variant="outline-dark bg-violet-200">Products</Button>
                        </Link>

                    </div>
                </Container>
            </div>
        </>

    );
}

export default HomePage;