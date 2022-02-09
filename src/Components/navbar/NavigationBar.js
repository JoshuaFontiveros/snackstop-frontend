import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBox,
  faCubes,
  faCartPlus,
  faStore,
  faBoxes,
} from '@fortawesome/free-solid-svg-icons';
import Product from '../Product';
import './Navbar.css';
import axios from 'axios';

const NavigationBar = props => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const products = useSelector(state => state.products);

  // Get the Date with a format yyyy-mm-dd

  //For Pop-up User Modal
  const [showUserForm, setShowUserForm] = useState(false);
  const handleCloseUserForm = () => setShowUserForm(false);
  const handleShowUserForm = () => setShowUserForm(true);

  //For Pop-up Product Modal
  const [showProductForm, setShowProductForm] = useState(false);
  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  // Product Form
  const [productName, setProductName] = useState('');
  const [productBasePrice, setProductBasePrice] = useState(0);
  const [productCategory, setProductCategory] = useState('Food');
  const [productMarkUp, setProductMarkUp] = useState('0');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDate, setProductDate] = useState('');

  //For Pop Up Category Modal
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const handleCloseCategoryForm = () => setShowCategoryForm(false);
  const handleShowCategoryForm = () => setShowCategoryForm(true);

  //For Pop Up Store Modal
  const [showStoreForm, setShowStoreForm] = useState(false);
  const handleCloseStoreForm = () => setShowStoreForm(false);
  const handleShowStoreForm = () => setShowStoreForm(true);

  //For Pop Up Supplies Modal
  const [showSuppliesForm, setShowSuppliesForm] = useState(false);
  const handleCloseSuppliesForm = () => setShowSuppliesForm(false);
  const handleShowSuppliesForm = () => setShowSuppliesForm(true);

  useEffect(() => {
    if (props._id) {
      setProductName(props.toUpdateProductName);
      setProductCategory(props.toUpdateProductCategory);
      setProductBasePrice(props.toUpdateProductBasePrice);
      setProductMarkUp(props.toUpdateProductMarkUp);
      setProductQuantity(props.toUpdateProductQuantitiy);
    }
  }, [props]);

  useEffect(() => {
    axios.get('http://localhost:8000/categories').then(res => {
      dispatch({ type: 'LOAD_CATEGORIES', payload: res.data });
    });
  }, []);

  // submit Form
  const submitFormHandler = e => {
    e.preventDefault();
    let newProduct = {
      _id: products._id ? products._id : null,
      name: productName,
      category: productCategory,
      baseprice: productBasePrice,
      markup: productMarkUp,
      quantity: productQuantity,
      date: productDate,
    };
    if (
      products.findIndex(
        product => product.name.toLowerCase() === productName.toLowerCase()
      ) >= 0
    ) {
      alert('Product already exists');
    } else {
      if (props._id) {
        axios
          .put(`http://localhost:8000/products${props._id}`, newProduct)
          .then(res => {
            console.log(res);
            if (!res.data.error) {
              dispatch({ type: 'UPDATE_ITEM', payload: newProduct });
            } else {
              alert(res.data.error);
            }
          });
      } else {
        axios.post('http://localhost:8000/products', newProduct).then(res => {
          if (!res.data.error) {
            dispatch({ type: 'ADD_PRODUCT', payload: res.data });
          } else {
            alert(res.data.error);
          }
        });
      }
    }

    setProductName('');
    setProductBasePrice(0);
    setProductCategory('--Select--');
    setProductMarkUp(0);
    setProductQuantity(0);
  };

  return (
    <React.Fragment>
      {/* User Modal */}
      <Modal show={showUserForm} onHide={handleCloseUserForm}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUserForm}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseUserForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Category Modal */}
      <Modal show={showCategoryForm} onHide={handleCloseCategoryForm}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseCategoryForm}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseCategoryForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Store Modal */}
      <Modal show={showStoreForm} onHide={handleCloseStoreForm}>
        <Modal.Header closeButton>
          <Modal.Title>Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseStoreForm}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseStoreForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Supplies Modal */}
      <Modal show={showSuppliesForm} onHide={handleCloseSuppliesForm}>
        <Modal.Header closeButton>
          <Modal.Title>Supplies</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseSuppliesForm}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseSuppliesForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg='primary' variant='dark' className='navBar'>
        <Container className='d-flex justify-content-center align-items-center'>
          <Navbar.Brand href='#home'>
            <h1>Sales And Inventory System</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar bg='light' expand='lg'>
        <Container className='d-flex justify-content-center'>
          {/* <Navbar.Brand bg='light'>Welcome back, Cassiah</Navbar.Brand> */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='d-flex justify-content-center align-items-center'>
              <strong>
                <NavDropdown title='Users' id='basic-nav-dropdown'>
                  <NavDropdown.Item onClick={handleShowUserForm}>
                    Add New User
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/users'>
                      <FontAwesomeIcon icon={faUsers} />
                      <strong>View Users</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong>
                <NavDropdown title='Products' id='basic-nav-dropdown'>
                  <NavDropdown.Item onClick={handleShowProductForm}>
                    Add New Product
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/products'>
                      <FontAwesomeIcon icon={faBox} />
                      <strong>View Products</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong>
                <NavDropdown title='Category' id='basic-nav-dropdown'>
                  <NavDropdown.Item onClick={handleShowCategoryForm}>
                    Add New Category
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/categories'>
                      <FontAwesomeIcon icon={faCubes} />
                      <strong>View Categories</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong>
                <NavDropdown title='Sales' id='basic-nav-dropdown'>
                  <NavDropdown.Item>
                    <Link to='/sales'>
                      <FontAwesomeIcon icon={faCartPlus} />
                      <strong>View Sales</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong>
                <NavDropdown title='Stores' id='basic-nav-dropdown'>
                  <NavDropdown.Item onClick={handleShowStoreForm}>
                    Add New Store
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/stores'>
                      <FontAwesomeIcon icon={faStore} />
                      <strong>View Stores</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong>
                <NavDropdown title='Supplies' id='basic-nav-dropdown'>
                  <NavDropdown.Item onClick={handleShowSuppliesForm}>
                    Add New Supply
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/supplies'>
                      <FontAwesomeIcon icon={faBoxes} />
                      <strong>View Supplies</strong>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavigationBar;
