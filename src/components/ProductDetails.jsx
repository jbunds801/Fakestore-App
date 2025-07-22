import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
                setError(null);
            } catch (error) {
                setError("Failed to fetch product. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-3">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Row>
                <Col lg={8} >
                    <img src={product.image} alt={product.title}
                        className="w-50 d-flex mx-auto my-3" />
                </Col>
                <Col lg={4} className="px-5 mt-5">
                    <h2>{product.title}</h2>
                    <p className="fs-4 my-5">${product.price}</p>
                    <Button className="buttons" variant="outline-dark">
                        Add to Cart</Button>

                    {/* button to delete product?*/}

                </Col>
            </Row>
            <p className="fs-5 pt-5 mx-5">{product.description}</p>
        </div>
    );
};

export default ProductDetails;