import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    const handleClick = (id) => {
        navigate(`/products/${id}`);
    };

    if (!products) return <div>Loading...</div>

    return (
        <>
            <Container>
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} md={4} className="mb-4">
                            <div className="border rounded p-3 m-1 mx-auto d-flex flex-column"
                                style={{ maxHeight: '500px', minHeight: '500px', maxWidth: '300px' }}
                            >
                                <img src={product.image} alt={product.title}
                                    className="d-flex w-100 mx-auto mb-4"
                                    style={{ width: '200px', maxHeight: '300px', objectFit: 'contain' }}
                                />
                                <div className="mt-auto">
                                    <p>
                                        {product.title.length > 30
                                            ? product.title.slice(0, 30) + '...'
                                            : product.title}
                                    </p>
                                    <p>${product.price}</p>
                                    <Button className="buttons" variant="outline-dark"
                                        onClick={() => handleClick(product.id)}>
                                        View Details</Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default ProductListing;
