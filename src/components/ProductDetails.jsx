import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleted, setDeleted] = useState(false);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const deleteProduct = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setDeleted(true);
        } catch (error) {
            setError(`Failed to delete product: ${error.message}`);
        };
    };

    useEffect(() => {
        async function editProduct() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(`Failed to edit product: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        editProduct();
    }, [id]);


    if (deleted) {
        return (
            <>
                <div className="m-5 pt-5 text-center">
                    <h3>Product deleted successfully!</h3>
                    <Link to='/products'>
                        <Button className="buttons m-5" variant="outline-dark">Back to Products</Button>
                    </Link>
                </div>
            </>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div className="p-3">
            <Row>
                <Col lg={8} >
                    <img src={product.image} alt={product.title}
                        className="w-100 d-flex px-1 mx-auto mt-3 mb-5"
                        style={{ maxHeight: '500px', objectFit: 'contain' }} />
                </Col>
                <Col lg={4} className="px-5 mt-5">
                    <h2>{product.title}</h2>
                    <p className="fs-4 my-5">${product.price}</p>
                    <Button className="buttons" variant="outline-dark">
                        Add to Cart</Button>
                    <p className="fs-5 pt-4 mt-5">{product.description}</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col lg={8}>
                    <div className="d-flex justify-content-center mt-5 pt-5">
                        <Button className="buttons" variant="outline-dark" onClick={handleShow}>
                            Delete Product
                        </Button>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Body className="fs-5 text-center">Are you sure you want to delete this product?</Modal.Body>
                            <Modal.Footer>
                                <Button className="buttons" variant="secondary" onClick={handleClose}>Cancel</Button>
                                <Button className="buttons" variant="outline-dark" onClick={deleteProduct}>Delete</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
                <Col lg={2}>
                    <div className="d-flex justify-content-center mt-lg-5 pt-5">
                        <Link to={`/editproduct/${id}`}>
                            <Button className="buttons" variant="outline-dark">Edit Product</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;