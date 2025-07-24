import { useState } from "react";
import { Container, Form, Alert, Button } from "react-bootstrap";
import './AddProduct.css'
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState([]);
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
            setProduct(response.data);
            setSubmitted(true);
            setError(null);
        } catch (error) {
            setError(`Failed to add product: ${error.message} Please try again.`);
            setSubmitted(false);
        }
    };

    return (
        <Container>
            <h2 className="my-5">Add Product</h2>
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

                <div className="mt-5">
                    <Button className='buttons' variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>

            <div className="mt-5">
                {submitted && <Alert variant="info" dismissible>{product.title} Added Successfully!</Alert>}
                {error && <Alert variant="danger" dismissible>{error}</Alert>}
            </div>
        </Container>
    )
}

export default AddProduct;