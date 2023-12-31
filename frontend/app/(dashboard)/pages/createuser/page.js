"use client";
// import node module libraries
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

const CreateUserComponent = () => {
  const hasMounted = useMounted();

  /**
   * const ROLE_ADMIN = 5;
const ROLE_TRANSACTION_POINT_MANAGER = 1;
const ROLE_TRANSACTION_POINT_STAFF = 2;
const ROLE_TRANSIT_POINT_MANAGER = 3;
const ROLE_TRANSIT_POINT_STAFF = 4;
implement it later
   */
  const allRoles = [
    {
      label: 'Admin',
      value: 5
    },
    {
      label: 'Transaction Point Manager',
      value: 1
    },
    {
      label: 'Transaction Point Staff',
      value: 2
    },
    {
      label: 'Transit Point Manager',
      value: 3
    },
    {
      label: 'Transit Point Staff',
      value: 4
    }
  ];

  const [branch , setBranch] = useState([]);
  const [role, setRole] = useState(0);
  const [branch_id,setBranch_id] = useState(0);

  useEffect(()=> {
    // update list branch with role change
    if (role > 0 && role < 5) { 
    axios.get(`${API_URL}/branch?role=${role}`).then((res) => {
      if (res.status === 200) {
        setBranch(res.data.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  },[role]);

  const handleCreateUser = () => {
    const username = document.querySelector('input[name="username"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const branch = parseInt(document.querySelector('select[name="branch"]').value);
    const data = {
      username,
      name,
      role,
      branch_id: branch
    }
    const token = localStorage.getItem('token');

    const config = {
      url: `${API_URL}/auth/createUser`, // The URL of the API endpoint you're posting data to
      method: 'POST',          // Specify the HTTP method as POST
      data,
      headers: {               // Additional headers for the request (optional)
        'Content-Type': 'application/json', // Common header for JSON data
        'Authorization': `Bearer ${token}`
      }
    };
    axios(config).then((res) => {
      if (res.status === 200) {
        alert('Create user successfully!');
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
            <div className="mb-4">
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username or email</Form.Label>
                <Form.Control type="text" name="username" placeholder="User Name" required={true} />
              </Form.Group>

              {/* ROLE */}
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Select Role</Form.Label>
                <Form.Select aria-label="Default select example" name="role" required={true} onChange={(e)=>{
                  setRole(e.target.value)
                }}>
                <option></option>
                {allRoles.map((role, index) => (
                  <option key={index} value={role.value}>{role.label}</option>
                ))}
                  </Form.Select>
              </Form.Group>

              {/*Branch*/}
              <Form.Group className="mb-3" controlId="branch">
                <Form.Label>Select Branch</Form.Label>
                <Form.Select aria-label="Default select example" name="branch" required={true} onChange={(e)=>{
                  setBranch_id(e.target.value);
                }} >
                <option></option>
                {branch.map((branch, index) => (
                  <option key={index} value={branch.id}>{branch.address}</option>
                ))}
                  </Form.Select>
                  </Form.Group>
               
               <Form.Group className = "mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter name here" required={true} />
               </Form.Group>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" onClick={handleCreateUser}>Create Account</Button>
                </div>
              </div>
            </Form>
            }
      </Col>
    </Row>
  );
}
const createUser = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="tao tai khoan" />

      <Row className="mt-6">
        <Col
          xl={12}
          lg={12}
          md={12}
          xs={12}
          className="mb-6 mb-xl-0"
        >
          <Row>

            {/* Billing Address */}
            <CreateUserComponent />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default createUser;
