'use client'
import {
useQuery,
useMutation,
useQueryClient,
QueryClient,
QueryClientProvider,
} from '@tanstack/react-query'
import { useState, useEffect } from 'react';

// import node module libraries
import { Fragment } from "react";
// import widget as custom components
import { PageHeading } from "widgets";
// import sub components
import { Row, Col, Card, Form, Button, Image ,Container,Table } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';

import axios from 'axios'
import { API_URL } from "api";
//   const queryClient = new queryClient();
export async function getTodos (role = 1) {
return await axios.get(`${API_URL}/branch?role=1`);
}


const listBranch = () => {
    const hasMounted = useMounted();
const queryClient = useQueryClient();
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
        return (
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
        )
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
export default listBranch;