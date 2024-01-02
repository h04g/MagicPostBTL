// create order page
"use client";
// import node module libraries
import { Fragment } from "react";
// import widget as custom components
import { PageHeading } from "widgets";
// import sub components
import { Row, Col, Card, Form, Button, Image ,Container,Table } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';
import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL } from "api";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
//   const queryClient = new queryClient();
export async function getTodos (role = 1) {
 return await axios.get(`${API_URL}/branch?role=1`);
}


const listBranch = () => {
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  console.log(query?.data?.data?.data);
  if (query.isLoading) {
    return <div>IS LOADING</div>
  }
  if (query.error) {
    return <div>error</div>
  }

  return (
    <Fragment>
    <Container fluid className="p-6">
        {/* Page Heading */}
        <PageHeading heading="danh sach chi nhanh" />
        
            <Row>
              {/* Current Plan Overview */}
              <Card>
                <Card.Body>
                    {

       ( hasMounted && !query.isLoading  )  && <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>Role</th>
          <th>Address</th>
          <th>avaliable</th>
          <th> action </th>
        </tr>
      </thead>
      <tbody>
       {
         
         query.data.data.data.map((item)=>{
                <tr key = {item.id}>
                    <td>{item.id}</td>
                    <td>{item.role == 1 ? "Transaction Point" : item.role == 2 ? "Transit Point" : item.role == 3 ? "Head Quater" : "" }</td>
                    <td>{item.address}</td>
                    <td>{!item.is_unused ? "YES" : "NO"}</td>
                    <td>
                        <Button variant="primary" onClick={()=>{}} >Sua</Button>
                        <Button variant="danger" onClick={()=>{}} >Xoa</Button>
                    </td>
                </tr>
            })
        
          
        }
      </tbody>
    </Table>}
                </Card.Body>
              </Card>
            </Row>
      </Container>
    </Fragment>
  )
}


const createBranch =  () => {
    const [roleBranch,setRoleBranch] = useState(1);
    const [address,setAddress] = useState("");

    const handleCreateBranch = () => {
        const token = localStorage.getItem('token');
        const data = {
            role: roleBranch,
            address:address
        };
        axios.post(`${API_URL}/branch/create`,data,{
        headers:{
            'Content-Type': 'application/json', // Common header for JSON data
            'Authorization': `Bearer ${token}`
        }
        }
            ).then((res)=>{
                if(res.status == 200) {
                    alert("Create successfully");
                }else {
                    alert('nope')
                }
            })
    }

    return (
        <>
        {/* <QueryClientProvider client={queryClient}> */}
    <Fragment>
      <Container fluid className="p-6">
        {/* Page Heading */}
        <PageHeading heading="Tạo chi nhanh:" />
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
                        <Col md={6} xs={12}>
                            {/* First Name */}
                            <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Vai tro</Form.Label>
                            <Form.Select onChange={(e)=>{setRoleBranch(e.target.value)}} required >
                                <option value = {1} >Transaction Point</option>
                                <option value ={2} >Transit Point</option>
                                <option value ={3} >Head Quater</option>
                            </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12}>
                            {/* Last Name */}
                            <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Địa chỉ" required onChange={(e)=>{setAddress(e.target.value)}} />
                            </Form.Group>
                        </Col>

                    </Row>
                    <div>
                      {/* Button */}
                      <div className="d-grid">
                        <Button variant="primary" onClick={handleCreateBranch} >Tạo don vi moi</Button>
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
    <listBranch />
    </>
    );
}
function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
export default createBranch;