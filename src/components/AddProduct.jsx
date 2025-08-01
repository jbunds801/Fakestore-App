import { useState } from "react";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AddProduct.css'
import axios from "axios";

const AddProduct = () => {
    const [addTitle, setAddTitle] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        image: '',
        title: '',
        price: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://fakestoreapi.com/products', formData);
            setAddTitle(response.data.title);
            setSubmitted(true);
            setError(null);
            setFormData({
                image: '',
                title: '',
                price: '',
                description: '',
            });

        } catch (error) {
            setError(`Failed to add product: ${error.message} Please try again.`);
            setSubmitted(false);
        };
    };


    return (
        <Row className="d-flex justify-content-center mx-4">
            <Col lg={7}>
                <h3 className="my-5">Add Product</h3>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-4" controlId="addImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            placeholder="enter image url"
                            value={formData.image}
                            onChange={handleChange} required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="addTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange} required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="addPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange} required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="addDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>

                <Row>
                    <Col>
                        <div className="mt-5">
                            <Button className='buttons' variant="outline-dark" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="mt-5 d-flex justify-content-end">
                            <Link to={'/products'}>
                                <Button className="buttons text-nowrap" variant="outline-dark">Back to Products</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>

                <div className="mt-5">
                    {submitted && <Alert variant="info" dismissible>{addTitle} Added Successfully!</Alert>}
                    {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                </div>
            </Col>
        </Row>
    );
};

export default AddProduct;