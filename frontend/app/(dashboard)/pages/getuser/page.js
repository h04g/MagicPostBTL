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

const GetUserComponent = () => {
  const hasMounted = useMounted();
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const token = localStorage.getItem('token');

    const config = {
      url: `${API_URL}/auth/getUsers`, // The URL of the API endpoint you're posting data to
      method: 'GET',          // Specify the HTTP method as POST
      headers: {               // Additional headers for the request (optional)
        'Content-Type': 'application/json', // Common header for JSON data
        'Authorization': `Bearer ${token}`
      }
    };
    axios(config).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data)
        setUsers(res.data.data);
       
      }
    }).catch((err) => {
      console.log(err);
    })
}, []);

const getRoleLabel = (roleValue) => {
    const role = allRoles.find((r) => r.value === roleValue);
    return role ? role.label : 'Unknown Role';
  };

  return (
    <Row className="align-items-center justify-content-center g-0">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        
        {hasMounted && (
          <div>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                    
                  <p>Username: {user.username}</p>
                  <p>Role: {getRoleLabel(user.role)}</p>
                  <p>Branch ID: {user.branch_id}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Col>
    </Row>
  );
}
const getUser = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Tất cả tài khoản" />

      <Row className="mt-6">
        <Col
          xl={12}
          lg={12}
          md={12}
          xs={12}
          className="mb-6 mb-xl-0"
        >
          <Row>

            <GetUserComponent />
            
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default getUser;
