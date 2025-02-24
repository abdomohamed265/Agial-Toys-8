import { CartProvider, useCart } from "react-use-cart";
import { Col, Container, Row } from "reactstrap";
import Navbar from '../homepage/Navbar';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Footer from "../homepage/Footer";

 export function Page1() {
  const { addItem } = useCart();
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [eductions, setEductions] = useState([]);
 
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  
  useEffect(() => {
    axios
      .get(`https://agial-toys-8.onrender.com/eductions`)
      .then(function (response) {
        console.log(response.data.eductions);
        setEductions(response.data.eductions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Container className="text-center mt-3 pt-3">
        <Row>
        <h2 className="text-center mt-5"></h2>
          {eductions.map((abdo) => (
            <Col md="4" key={abdo.id}>
              <img
                src={abdo.image}
                alt=""
                className="img-fluid mt-5"
                style={{ height: "250px" }}
              ></img>
              <h2 className="h4 mt-3">{abdo.name}</h2>
              <h4 className="h5">{abdo.price}$</h4>
              <button className="btn btn-success" style={{backgroundColor:"darkgreen"}} onClick={() => addItem(abdo)}>إضافة إلي السلة</button>
              <>
      {values.map((v, idx) => (
        <Button key={idx} style={{backgroundColor:"darkblue"}} className=" mx-2 btn btn-primary" onClick={() => handleShow(v)}>
          تفاصيل
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton >
        </Modal.Header>
          <Modal.Title className="mt-5 fs-1" style={{marginRight:"30px",marginTop:"50px"}}>
            {abdo.name}
          </Modal.Title>
        <Modal.Body>
        <Container className="d-flex">
          <div>
          <img
        src={abdo.image}
        alt=""
        className="img-fluid mt-5"
        style={{ height: "200px" }} ></img>
        <div className="d-flex">
          
        <button className="btn btn-dark mt-5 mx-2"style={{height:"35px",backgroundColor:"darkgreen"}} onClick={() => addItem(abdo)}>إضافة إلي السلة</button>
        </div>
          </div>
          <div style={{marginRight:"50px"}}>
            <h2 style={{marginTop:"50px",}}> وصف المنتج: </h2>
            <p style={{marginTop:"10px",width:"400px"}}>{abdo.title}</p>
            <h2> السعر:</h2>
            <p>{abdo.price}</p>
          </div>      
        </Container>
        
        </Modal.Body>
      </Modal>
    </>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
function Product1() {
  return (
    <CartProvider>
    <Navbar/>
      <Page1 />
      <Footer/>
    </CartProvider>
  );
}
export default Product1;

