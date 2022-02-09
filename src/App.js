import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import NavigationBar from './Components/navbar/NavigationBar';
import User from './Components/User';
import Product from './Components/Product';
import Category from './Components/Category';
import Store from './Components/Store';
import Supplies from './Components/Supplies';
import Sale from './Components/Sale';

const App = props => {
  return (
    <React.Fragment>
      {/* {toUpdateItem && (
        <Product
          _id={toUpdateItem._id}
          toUpdateProductName={toUpdateItem.name}
          toUpdateItemCategory={toUpdateItem.category}
          toUpdateProductBasePrice={toUpdateItem.baseprice}
          toUpdateProductMarkUp={toUpdateItem.markup}
          toUpdateProductQuantity={toUpdateItem.quantity}
          triggerEdit={onItemEdit}
          itemData={toUpdateItem}
          clearSelected={onClearSelected}
          key={toUpdateItem.id}
        />
      )} */}
      <Container fluid='sm'>
        <NavigationBar />
        <Routes>
          <Route path='/users' element={<User />} />
          <Route path='/products' element={<Product />} />
          <Route path='/categories' element={<Category />} />
          <Route path='/stores' element={<Store />} />
          <Route path='/supplies' element={<Supplies />} />
          <Route path='/sales' element={<Sale />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
