import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Row>
                <Col md ={8} >
                    <img src={product.image} alt={product.title}
                    className="w-50" />
                </Col>
                <Col md ={4}>
                    <h1>{product.title}</h1>
                    <p>${product.price}</p>
                </Col>
            </Row>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductDetails;