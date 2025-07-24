import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(`Failed to fetch product: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-3">
            <Row>
                <Col lg={8} >
                    <img src={product.image} alt={product.title}
                        className="w-100 d-flex mx-auto mt-3 mb-5"
                        style={{ maxHeight: '700px', objectFit: 'contain' }} />
                </Col>
                <Col lg={4} className="px-5 mt-5">
                    <h2>{product.title}</h2>
                    <p className="fs-4 my-5">${product.price}</p>
                    <Button className="buttons" variant="outline-dark">
                        Add to Cart</Button>
                    <p className="fs-5 pt-5 mt-5">{product.description}</p>
                </Col>
                <Col lg={8}>
                    <div className="d-flex justify-content-center mt-5 pt-5">
                        <Link to='/deleteproduct'>
                            <Button className="buttons" variant="outline-dark">Delete Product</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;