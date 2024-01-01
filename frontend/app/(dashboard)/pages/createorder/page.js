// create order page
"use client";
// import node module libraries
import { Fragment } from "react";
// import widget as custom components
import { PageHeading } from "widgets";
// import sub components
import { Row, Col, Card, Form, Button, Image ,Container } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';
import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL } from "api";

/**
 * create one form for this body : 
 * {
    "sender_name": "sender_name", 
    "sender_address": "sender_address", 
    "sender_phone_number": "0123456789", 
    "receiver_name": "receiver_name",
    "receiver_address" : "receiver_address", 
    "receiver_phone_number": "0123456799", 
    "receiver_postal_id": 8, 
    "product_type": 1, 
    "exceptional_service": "exceptional_service", 
    "iwgcnba": 1, 
    "weigh": 30, 
    "convert_weigh": 0, 
    "node": "node", 
    "main_charge": 1, 
    "surcharge": 2, 
    "expenses_gygt": 3, 
    "other_revenue": 5, 
    "cod": 11, 
    "receiver_other_revenue": 12
}
 *  */ 


const Order = () => {
  const hasMounted = useMounted();
  const token = localStorage.getItem('token');
  //get form data
  const [product_type,setProduct_type] = useState(1);
  const [iwgcnba,setIWGNBA] = useState(1);

  const createOrder = () => {
    const sender_name = document.querySelector('input[name="sender_name"]')?.value;
    const sender_address = document.querySelector('input[name="sender_address"')?.value;
    const sender_phone_number = document.querySelector('input[name="sender_phone_number"')?.value;
    const receiver_name = document.querySelector('input[name="receiver_name"')?.value;
    const receiver_address = document.querySelector('input[name="receiver_address"')?.value;
    const receiver_phone_number = document.querySelector('input[name="receiver_phone_number"')?.value;
    const receiver_postal_id = parseInt(document.querySelector('input[name="receiver_postal_id"')?.value);
    const exceptional_service = document.querySelector('input[name="exceptional_service"')?.value;
    const weigh = parseInt(document.querySelector('input[name="weigh"')?.value);
    const convert_weigh = parseInt(document.querySelector('input[name="convert_weigh"')?.value);
    const node = document.querySelector('input[name="node"')?.value;
    const main_charge = parseInt(document.querySelector('input[name="main_charge"')?.value);
    const surcharge = parseInt(document.querySelector('input[name="surcharge"')?.value);
    const expenses_gygt = parseInt(document.querySelector('input[name="expenses_gygt"')?.value);
    const other_revenue = parseInt(document.querySelector('input[name="other_revenue"')?.value);
    const cod = parseInt(document.querySelector('input[name="cod"')?.value);
    const receiver_other_revenue = parseInt(document.querySelector('input[name="receiver_other_revenue"')?.value);  
    const data = {
      sender_name,
      sender_address,
      sender_phone_number,
      receiver_name,
      receiver_address,
      receiver_phone_number,
      receiver_postal_id,
      product_type,
      exceptional_service,
      iwgcnba,
      weigh,
      convert_weigh,
      node,
      main_charge,
      surcharge,
      expenses_gygt,
      other_revenue,
      cod,
      receiver_other_revenue
    }
    // create order here
    console.log(data);
   
    axios.post(`${API_URL}/shippingOrders/create`,
    data
    ,{ headers: {               // Additional headers for the request (optional)
      'Content-Type': 'application/json', // Common header for JSON data
      'Authorization': `Bearer ${token}`
    }}
    ).then((res) => {
      if (res.status === 200) {
        alert('Tạo đơn hàng thành công');
      }
      console.log('status');
      console.error(res.status);
      if (res.status == 502 ) {
        alert ("het phien");
        window.location.href = '/authentication/sign-in';
      } 
    }
    ).catch((err) => {
      console.log(err);
    });
  }
  return (
    <Fragment>
      <Container fluid className="p-6">
        {/* Page Heading */}
        <PageHeading heading="Tạo đơn hàng" />
        <Row className="mt-6">
          <Col
            xl={{ span: 8, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
            md={12}
            xs={12}
          >
            <Row>
              {/* Current Plan Overview */}
              <Card>
                <Card.Body>
                  <Form >
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="sender_name">
                          <Form.Label>Tên người gửi</Form.Label>
                          <Form.Control type="text" name="sender_name" placeholder="Tên người gửi" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="sender_address">
                          <Form.Label>Địa chỉ người gửi</Form.Label>
                          <Form.Control type="text" name="sender_address" placeholder="Địa chỉ người gửi" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="sender_phone_number">
                          <Form.Label>Số điện thoại người gửi</Form.Label>
                          <Form.Control type="text" name="sender_phone_number" placeholder="Số điện thoại người gửi" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="receiver_name">
                          <Form.Label>Tên người nhận</Form.Label>
                          <Form.Control type="text" name="receiver_name" placeholder="Tên người nhận" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="receiver_address">
                          <Form.Label>Địa chỉ người nhận</Form.Label>
                          <Form.Control type="text" name="receiver_address" placeholder="Địa chỉ người nhận" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="receiver_phone_number">
                          <Form.Label>Số điện thoại người nhận</Form.Label>
                          <Form.Control type="text" name="receiver_phone_number" placeholder="Số điện thoại người nhận" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="receiver_postal_id">
                          <Form.Label>Mã bưu cục</Form.Label>
                          <Form.Control type="text" name="receiver_postal_id" placeholder="Mã bưu cục" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="product_type">
                          <Form.Label>Loại hàng</Form.Label>
                          <Form.Select name = "product_type" onChange = {
                            (e) => {
                              setProduct_type(e.target.value)
                            }
                          }>
                            <option value = {1}> Document </option>
                            <option value = {2} > Commodity </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="exceptional_service">
                          <Form.Label>Dịch vụ đặc biệt</Form.Label>
                          <Form.Control type="text" name="exceptional_service" placeholder="Dịch vụ đặc biệt" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="iwgcnba">
                          <Form.Label>IWGCNBA</Form.Label>
                         <Form.Select name="iwgcnba" onChange = {(e)=>{setIWGNBA(e.target.value)}}>
                          
<option key = {1} value = {1}> Chuyển hoàn ngay</option>
<option key = {2} value={2} >Gọi cho chười gửi</option>
<option key = {3} value={3} >Hủy</option>
<option key = {4} value={4} >Chuyển hoàn trước ngày</option>
<option key = {5} value={5} >Chuyển hoàn khi hết thời gian lưu trữ</option>



                         </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="weigh">
                          <Form.Label>Trọng lượng</Form.Label>
                          <Form.Control type="text" name="weigh" placeholder="Trọng lượng" required={true} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="convert_weigh">
                          <Form.Label>Trọng lượng quy đổi</Form.Label>
                          <Form.Control type="text" name="convert_weigh" placeholder="Trọng lượng quy đổi" required={true} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="node">
                          <Form.Label>Node</Form.Label>
                          <Form.Control type="text" name="node" placeholder="Node" required={true} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="main_charge">
                          <Form.Label>Phí chính</Form.Label>
                          <Form.Control type="text" name="main_charge" placeholder="Phí chính" required={true} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="surcharge">
                          <Form.Label>Phụ phí</Form.Label>
                          <Form.Control type="text" name="surcharge" placeholder="Phụ phí" required={true} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="expenses_gygt">
                          <Form.Label>Chi phí GYGT</Form.Label>
                          <Form.Control type="text" name="expenses_gygt" placeholder="Chi phí GYGT" required={true} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="other_revenue">
                          <Form.Label>Doanh thu khác</Form.Label>
                          <Form.Control type="text" name="other_revenue" placeholder="Doanh thu khác" required={true} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cod">
                          <Form.Label>COD</Form.Label>
                          <Form.Control type="text" name="cod" placeholder="COD" required={true} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="receiver_other_revenue">
                          <Form.Label>Doanh thu khác người nhận</Form.Label>
                          <Form.Control type="text" name="receiver_other_revenue" placeholder="Doanh thu khác người nhận" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div>
                      {/* Button */}
                      <div className="d-grid">
                        <Button variant="primary" onClick={createOrder} type="submit" >Tạo đơn hàng</Button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Order;
