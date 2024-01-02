// import node module libraries
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image, Form } from "react-bootstrap";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  } from '@tanstack/react-query'

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "api";
import useMounted from 'hooks/useMounted';


export const getListOrder = async (status=2) =>{
  let token = localStorage.getItem('token');
  return await axios.get(`${API_URL}/shippingOrders?status=${status}`,{
    headers:{
        'Content-Type': 'application/json', // Common header for JSON data
        'Authorization': `Bearer ${token}`
    }
    });
}

const ActiveProjects = () => {
    const [status,setStatus] = useState(2);
    const hasMounted = useMounted();
const queryClient = useQueryClient();
const query = useQuery({ queryKey: ['order', status], queryFn: () => getListOrder(status) });
if (query.isLoading) {
return <div>IS LOADING</div>
}
if (query.error) {
return <div>error</div>
}
  const shippingOrderStatus = [
    {
      value : 2,
      label : "Shiping orders transporting"
    },
    {
      value : 3,
      label : "Shipping orders delivered"
    },
    {
      value : 5,
      label : "Shipping orders refunding"
    },
    {
      value : 6,
      label : "Shipping orders refunded"
    }
  ];


  return (
    <>
    
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white  py-4">
            <h4 className="mb-0">Chi tiết đơn hàng</h4>
            <Form>
            <Form.Select onChange={(e)=>{setStatus(e.target.value)}}> 
      {
        shippingOrderStatus.map((item)=>{
         return <option value={item.value} >{item.label}</option>
        })
      }
    </Form.Select>
    </Form>
          </Card.Header>
          <Table responsive className="text-nowrap mb-0">
            <thead className="table-light">
              <tr>
              

  <th>Đơn hàng</th>
  <th>Ngày gửi</th>
  <th>Tình trạng</th>
  <th>Progress</th>
  <th>create_th_of_cod</th>
  <th>createdAt</th>
  <th>status</th>
  <th>total_fare</th>
  <th>total_revenue</th>
  <th>updatedAt</th>
  <th>vat_fee</th>
  <th>weigh</th>
              </tr>
            </thead>
            <tbody>
              {query.data.data.data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div>
                          {item.id}
                        </div>
                        <div className="ms-3 lh-1">
                          <h5 className=" mb-1">
                            <Link href="#" className="text-inherit">
                              {item.projectName}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </td>
                    {/* <td className="align-middle">{item.date}</td>
                    <td className="align-middle">
                      <span className={`badge bg-${item.priorityBadgeBg}`}>
                        {item.priority}
                      </span>
                    </td>

                    <td className="align-middle text-dark">
                      <div className="float-start me-3">{item.progress}%</div>
                      <div className="mt-2">
                        <ProgressBar
                          now={item.progress}
                          style={{ height: "5px" }}
                        />
                      </div>
                    </td> */}
                     <td>{item.create_th_of_cod}</td>
                    <td>{item.createdAt}</td>
      <td>{item.status}</td>
      <td>{item.total_fare}</td>
      <td>{item.total_revenue}</td>
      <td>{item.updatedAt}</td>
      <td>{item.vat_fee}</td>
      <td>{item.weigh}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="bg-white text-center">
            {/* <Link href="#" className="link-primary">
              Xem tất cả đơn hàng
            </Link> */}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default ActiveProjects;
