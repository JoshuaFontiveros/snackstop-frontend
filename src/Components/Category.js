import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Container, Form, Table } from 'react-bootstrap';
const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const [categoryName, setCategoryName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://localhost:8000/categories').then(res => {
      dispatch({ type: 'LOAD_CATEGORIES', payload: res.data });
      console.log(res.data);
    });
  }, []);

  const onCategoryDelete = id => {
    alert(`Category deleted with ID: ${id}`);
    axios.delete(`http://localhost:8000/categories/${id}`).then(res => {
      console.log(res);
      dispatch({ type: 'DELETE_CATEGORY', payload: id });
    });
  };

  const categorySubmitHandler = e => {
    e.preventDefault();

    let newCategory = {
      name: categoryName,
    };

    if (
      categories.findIndex(
        category => category.name.toLowerCase() === categoryName.toLowerCase()
      ) >= 0
    ) {
      alert('Category already exists');
    } else {
      axios.post('http://localhost:8000/categories', newCategory).then(res => {
        if (!res.data.error) {
          dispatch({ type: 'ADD_CATEGORY', payload: res.data });
        } else {
          alert(res.data.error);
        }
      });
    }
    setCategoryName('');
  };

  return (
    <Container>
      <Button variant='primary' onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={categorySubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type='text'
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => {
            return (
              <tr>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => onCategoryDelete(category._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Category;
