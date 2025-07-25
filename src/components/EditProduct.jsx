import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
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
            await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
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

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setFormData(response.data);
            } catch (error) {
                setError(`Failed to fetch product: ${error.message}`);
            }
        }

        fetchProduct();
    }, [id]);


    return (
        <Row className="d-flex justify-content-center mx-4">
            <Col lg={7}>
                <h3 className="my-5">Edit Product</h3>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-4" controlId="addImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="input"
                            name="image"
                            placeholder="upload image"
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
                                <Link to={`/products/${id}`}>
                                    <Button className="buttons" variant="outline-dark">Back to Product</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Form>

                <div className="mt-5">
                    {submitted && <Alert variant="info" dismissible>Updated Successfully!</Alert>}
                    {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                </div>
            </Col>
        </Row>
    );
};

export default EditProduct;