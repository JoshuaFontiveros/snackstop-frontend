import React, { useState, useEffect } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import "./Product.css";
const Product = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  // Computation of Subtotals and Grand Totals
  const [total, setTotal] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [totalMarkUp, setTotalMarkUp] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);

  // Product Form
  const [productName, setProductName] = useState("");
  const [productBasePrice, setProductBasePrice] = useState(0);
  const [productCategory, setProductCategory] = useState("Food");
  const [productMarkUp, setProductMarkUp] = useState("0");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDate, setProductDate] = useState("");
  //For Pop-up Product Modal
  const [showProductForm, setShowProductForm] = useState(false);
  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/products').then(res => {
  //     dispatch({ type: 'LOAD_PRODUCTS', payload: res.data });
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/categories').then(res => {
  //     dispatch({ type: 'LOAD_CATEGORIES', payload: res.data });
  //     console.log(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (products._id) {
  //     setProductName(productName);
  //     setProductCategory(productCategory);
  //     setProductBasePrice(productBasePrice);
  //     setProductMarkUp(productMarkUp);
  //     setProductQuantity(productQuantity);
  //     setProductDate(productDate);
  //   }
  // }, [props]);

  const [toUpdateItem, setToUpdateItem] = useState({});
  function onItemEdit(product) {
    setToUpdateItem(product);
    handleShowProductForm();
    setProductName(product.name);
    setProductCategory(product.category);
    setProductBasePrice(product.baseprice);
    setProductMarkUp(product.markup);
    setProductQuantity(product.quantity);
    setProductDate(product.date);
  }

  const onItemDelete = (id) => {
    alert(`Deleted item with ID: ${id}`);
    axios.delete(`http://localhost:8000/products/${id}`).then((res) => {
      console.log(res);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    });
  };

  // useEffect(() => {
  //   if (toUpdateItem._id) {
  //     setProductName(toUpdateItem.name);
  //     setProductCategory(toUpdateItem.category);
  //     setProductBasePrice(toUpdateItem.baseprice);
  //     setProductMarkUp(toUpdateItem.markup);
  //     setProductQuantity(toUpdateItem.quantity);
  //   }
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/products").then((res) => {
      dispatch({ type: "LOAD_PRODUCTS", payload: res.data });
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/categories").then((res) => {
      dispatch({ type: "LOAD_CATEGORIES", payload: res.data });
      console.log(res.data);
    });
  }, []);

  //validation for Form.Control type = 'number'
  const preventNegative = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  //another validation for Form.Conttrol type = 'number
  const preventPastedNumberNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    let subtotal = 0;
    products.map(
      (product) => (subtotal += product.quantity * product.baseprice)
    );
    setTotal(subtotal);

    let subTotalStocks = 0;
    products.map((product) => (subTotalStocks += product.quantity));
    setTotalStocks(subTotalStocks);

    let subTotalMarkUp = 0;
    products.map(
      (product) => (subTotalMarkUp += product.markup * product.quantity)
    );
    setTotalMarkUp(subTotalMarkUp);

    let subTotalSellingPrice = 0;
    products.map(
      (product) =>
        (subTotalSellingPrice +=
          (product.markup + product.baseprice) * product.quantity) *
        product.quantity
    );
    setTotalSellingPrice(subTotalSellingPrice);
  }, [products]);

  // submit Form
  const submitFormHandler = (e) => {
    e.preventDefault();

    let newProduct = {
      name: productName,
      category: productCategory,
      baseprice: productBasePrice,
      markup: productMarkUp,
      quantity: productQuantity,
      date: productDate,
      // _id: products._id ? products._id : null,
      // name: products.name,
      // category: products.category,
      // baseprice: products.basePrice,
      // markup: products.markup,
      // quantity: products.quantity,
      // date: products.Date,
    };

    if (toUpdateItem._id) {
      axios
        .put(`http://localhost:8000/products/${toUpdateItem._id}`, newProduct)
        .then((res) => {
          newProduct._id = res.data._id;
          if (!res.data.error) {
            dispatch({ type: "UPDATE_PRODUCT", payload: newProduct });
          } else {
            alert(res.data.error);
          }
        });
    } else {
      if (
        products.findIndex(
          (product) => product.name.toLowerCase() === productName.toLowerCase()
        ) >= 0
      ) {
        alert("Product already exists");
      } else {
        axios.post("http://localhost:8000/products", newProduct).then((res) => {
          if (!res.data.error) {
            dispatch({ type: "ADD_PRODUCT", payload: res.data });
          } else {
            alert(res.data.error);
          }
        });
      }
    }
    setToUpdateItem({});
    setProductName("");
    setProductBasePrice(0);
    setProductCategory("--Select--");
    setProductMarkUp(0);
    setProductQuantity(0);
  };
  const clearFields = () => {
    setToUpdateItem({});
    setProductName("");
    setProductBasePrice(0);
    setProductCategory("--Select--");
    setProductMarkUp(0);
    setProductQuantity(0);
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShowProductForm}>
        Add Product
      </Button>
      {/* Product Modal */}
      <Modal
        show={showProductForm}
        onHide={handleCloseProductForm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClick={() => clearFields()}>
          <Modal.Title>
            {toUpdateItem._id ? "Update Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitFormHandler}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="productname">Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="baseprice">Base Price</Form.Label>
              <Form.Control
                required
                value={productBasePrice}
                onChange={(e) => setProductBasePrice(e.target.value)}
                // type='number'
                // min='1'
                // max='10000'
                // onKeyPress={preventNegative}
                // onPaste={preventPastedNumberNegative}
                placeholder="Enter Base Price"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="category">Select Category</Form.Label>
              <Form.Select
                onChange={(e) => setProductCategory(e.target.value)}
                value={productCategory}
              >
                {/* <option>Open this select menu</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option> */}
                <option value="/">--Please Select Category--</option>
                {categories.map((category) => {
                  if (category) {
                    return (
                      <option value={category._id}>{category.name}</option>
                    );
                  } else {
                    alert("Please select any category");
                  }
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="markup">Mark Up</Form.Label>
              <Form.Control
                value={productMarkUp}
                onChange={(e) => setProductMarkUp(e.target.value)}
                required
                type="number"
                // min='1'
                // max='10000'
                // onKeyPress={preventNegative}
                // onPaste={preventPastedNumberNegative}
                placeholder="Enter Mark Up"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="quantity">Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                // min='1'
                // max='500'
                // onKeyPress={preventNegative}
                // onPaste={preventPastedNumberNegative}
                placeholder="Enter Quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="date">Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="yyyy-mm-dd"
                value={productDate}
                onChange={(e) => setProductDate(e.target.value)}
                min="1"
                max="500"
                onKeyPress={preventNegative}
                onPaste={preventPastedNumberNegative}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table variant="success" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchase Price</th>
            <th>Markup</th>
            <th>Selling Price</th>
            <th>Qty In Stock</th>
            <th>Subtotal Purchase Price</th>
            <th>Subtotal Markup</th>
            <th>Subtotal Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => {
            if (prod) {
              return (
                <React.Fragment>
                  <tr>
                    <td>{prod.name}</td>
                    <td>&#8369;{prod.baseprice}</td>
                    <td>&#8369;{prod.markup}</td>
                    <td>&#8369;{prod.baseprice + prod.markup}</td>
                    <td>{prod.quantity}</td>
                    <td>&#8369;{prod.baseprice * prod.quantity}</td>
                    <td>&#8369;{prod.markup * prod.quantity}</td>
                    <td>
                      &#8369;{(prod.baseprice + prod.markup) * prod.quantity}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => onItemDelete(prod._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => onItemEdit(prod)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }
            return prod;
          })}
          <tr variant="light">
            <td className="grand-total">Grand Total:</td>
            <td></td>

            <td></td>
            <td></td>
            <td className="total_stock">{totalStocks}</td>
            <td className="total_price">&#8369;{total}</td>
            <td className="total_price">&#8369;{totalMarkUp}</td>
            <td className="total_price" colSpan="3">
              &#8369;{totalSellingPrice}
            </td>
            {/* <td id='total_stock'>
              Total Amount: <br />
              Selling Price
            </td> */}

            {/* <td id='total_price'>
              Total MarkUp: <br />
              &#8369;{totalMarkUp}
            </td> */}
          </tr>
        </tbody>
      </Table>
      <div className="total-container"></div>
    </React.Fragment>
  );
};

export default Product;
