import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
const User = props => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const stores = useSelector(state => state.stores);
  const loading = useSelector(state => state.loading);
  const isLoaded = useSelector(state => state.isLoaded);

  // User Form
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState(0);
  const [userStore, setUserStore] = useState('');
  const [userUserName, setUserUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  //For Pop-up Product Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://localhost:8000/users').then(res => {
      dispatch({ type: 'LOAD_USERS', payload: res.data });
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/stores').then(res => {
      dispatch({ type: 'LOAD_STORES', payload: res.data });
    });
  }, []);

  const onUserDelete = id => {
    alert(`delete ID: ${id}`);
    axios.delete(`http://localhost:8000/users/${id}`).then(res => {
      console.log(res);
      dispatch({ type: 'DELETE_USER', payload: id });
    });
  };

  function ProfilePage() {
    return <Suspense fallback={<h1>Loading Profile...</h1>} />;
  }

  const onSubmitUserForm = e => {
    e.preventDefault();

    let newUser = {
      name: userName,
      contact: userContact,
      store: userStore,
      username: userUserName,
      password: userPassword,
      role: userRole,
    };
    if (
      users.findIndex(
        user => user.name.toLowerCase() === userName.toLowerCase()
      ) >= 0
    ) {
      alert('User already exists');
    } else {
      axios.post('http://localhost:8000/users', newUser).then(res => {
        if (!res.data.error) {
          dispatch({ type: 'ADD_USERS', payload: res.data });
        } else {
          alert(res.data.error);
        }
      });
    }

    setUserName('');
    setUserContact(0);
    setUserStore('Cielito');
    setUserUserName('');
    setUserPassword('');
    setUserRole('');
  };

  const clearFields = () => {
    setUserName('');
    setUserContact(0);
    setUserStore('Cielito');
    setUserUserName('');
    setUserPassword('');
    setUserRole('');
  };

  return (
    <Container>
      <Button variant='primary' onClick={handleShow}>
        + Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={() => clearFields()}>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitUserForm}>
            <Form.Group className='mb-3'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Full Name'
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />

              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type='number'
                placeholder='09....'
                required
                value={userContact}
                onChange={e => setUserContact(e.target.value)}
              />
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Store Address</Form.Label>
              <Form.Select
                type='text'
                placeholder='Assign a store branch to this user'
                required
                value={userStore}
                onChange={e => setUserStore(e.target.value)}>
                {stores.map(store => {
                  return <option value={store._id}>{store.branch}</option>;
                })}
              </Form.Select>
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add Username'
                required
                value={userUserName}
                onChange={e => setUserUserName(e.target.value)}
              />
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Add Password'
                required
                value={userPassword}
                onChange={e => setUserPassword(e.target.value)}
              />
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>User Role</Form.Label>
              <Form.Select
                type='password'
                placeholder='Assign User Role'
                required
                value={userRole}
                onChange={e => setUserRole(e.target.value)}>
                <option value='Salesperson'>Salesperson</option>
                <option value='Delivery'>Delivery</option>
                <option value='Admin'>Admin</option>
                <option value='Superadmin'>Superadmin</option>
              </Form.Select>
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
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
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Store Branch</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            users.map(user => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{user.store.branch}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => onUserDelete(user._id)}>
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

export default User;
