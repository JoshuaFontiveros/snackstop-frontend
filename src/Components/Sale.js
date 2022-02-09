import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Sale = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const sales = useSelector(state => state.sales);
  const stores = useSelector(state => state.stores);

  const [saleProducts, setSaleProducts] = useState({});
  const [saleStore, setSaleStore] = useState('');
  const [saletotalPrice, setSaleTotalPrice] = useState(0);
  const [saleDateRecorded, setSaleDateRecorded] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://localhost:8000/sales').then(res => {
      dispatch({ type: 'LOAD_SALES', payload: res.data });
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/stores').then(res => {
      dispatch({ type: 'LOAD_STORES', payload: res.data });
    });
  }, []);

  const saleOnSubmitHandler = e => {
    e.preventDefault();
    let newSales = {
      product: saleProducts,
      store: saleStore,
    };
    if (
      products.findIndex(
        product => product.name.toLowerCase() === saleProducts.toLowerCase()
      ) >= 0
    ) {
      alert('Product already exists');
    } else {
      axios.post('http://localhost:8000/sales', newSales).then(res => {
        if (!res.data.error) {
          dispatch({ type: 'ADD_SALES', payload: res.data });
        } else {
          alert(res.data.error);
        }
      });
    }
  };
  return (
    <Container fluid='sm'>
      <Button variant='primary' onClick={handleShow}>
        +Add Sales
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saleOnSubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label>Products</Form.Label>
              <Form.Control
                type='text'
                placeholder='Products'
                value={saleProducts}
                onChange={e => setSaleProducts(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Select
                type='password'
                placeholder='Store'
                value={saleStore}
                onChange={e => setSaleStore(e.target.value)}
                Store>
                {stores.map(store => {
                  return <option value={store._id}>{store.branch}</option>;
                })}
              </Form.Select>
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
          <Button variant='primary'>Understood</Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Store</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Sale;
