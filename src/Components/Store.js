import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const Store = () => {
  const dispatch = useDispatch();
  const stores = useSelector(state => state.stores);
  const products = useSelector(state => state.products);
  const displaySupplies = useSelector(state => state.supplies);
  const [branchName, setBranchName] = useState('');
  const [supplies, setSupplies] = useState('');
  const [product, setProduct] = useState('');

  //storeForm

  useEffect(() => {
    axios.get('http://localhost:8000/stores').then(res => {
      dispatch({ type: 'LOAD_STORES', payload: res.data });
      console.log(res.data);
    });
  }, [dispatch]);

  useEffect(() => {
    axios.get('http://localhost:8000/products').then(res => {
      dispatch({ type: 'LOAD_PRODUCTS', payload: res.data });
      console.log(res.data);
    });
  }, [dispatch]);

  useEffect(() => {
    axios.get('http://localhost:8000/supplies').then(res => {
      dispatch({ type: 'LOAD_SUPPLIES', payload: res.data });
      console.log(res.data);
    });
  }, [dispatch]);

  return (
    <Container>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Store Branch</th>
            {/* <th>Supplies</th>
            <th>Product</th> */}
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => {
            return (
              <tr>
                <td>{store.branch}</td>
                {/* <td>{store.suppplies._id}</td> */}
                {/* <td>{store.product.name}</td> */}
                <td>{store.address}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Store;
