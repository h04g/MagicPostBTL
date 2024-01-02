// import node module libraries
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image, Form ,Button ,Modal } from "react-bootstrap";
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
import listBranch from "app/(dashboard)/pages/brands/listbranch/page";


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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {setIdExport(id); setShow(true);};
    const [status,setStatus] = useState(2);
    const hasMounted = useMounted();
const queryClient = useQueryClient();
const query = useQuery({ queryKey: ['order', status], queryFn: () => getListOrder(status) });
const [roleBranch,setRoleBranch] = useState(0);
const [branchDetail ,setBranchDetail] = useState([]);
const [branchId,setBranchId] = useState(null);
const [idExport,setIdExport] = useState(null);


const handleUpdateStatus = () =>{ }
const handleExport = (e) => {

  if (idExport == null) {
    return;
  }
  if (branchId == null) {
    alert("please select branch");
    return;
  }
  let token = localStorage.getItem('token');
  if (!token ) {
    return; 
  }
  axios.post(`${API_URL}/shippingOrders/export?id=${idExport}`
  ,{
    "receiving_branch_id" : parseInt(branchId)
  },{
    headers:{
    'Content-Type': 'application/json', // Common header for JSON data
    'Authorization': `Bearer ${token}`
    }
  }).then((res)=>{
    if (res.status == 200) {
      alert('Export successs');
    }

  });
}
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

  const fetchListBranch = (roleBranch) => {
    if (roleBranch > 0 && roleBranch < 4)
    {
      axios.get(`${API_URL}/branch?role=${roleBranch}`).then((res)=>{
        if(res.status == 200) {
          console.log(res.data);
         const data = res.data.data.map((item)=> {
            return {
              value : item.id,
              label : item.address
            }
          });
          setBranchDetail (data);
        }
      })
    }
  }


  return (
    <>
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white  py-4">
            <h4 className="mb-0">Chi tiết đơn hàng</h4>
            <Form>
            <Form.Select onChange={(e)=>{setStatus(e.target.value)}} value={status} > 
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
  <th>tổng giá vé</th>
  <th>Tổng doanh thu</th>
  <th>cập nhật</th>
  <th>phi vat</th>
  <th>trong luong</th>
  <th>action</th>
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
                    <td className="align-middle" >{new Date(item.createdAt).toLocaleString('en-GB') }</td>
                    <td className="align-middle" >                  
                    {item.status == 2 ?  "Shiping orders transporting" : item.status == 3 ? "Shipping orders delivered" : item.status == 5 ? "Shipping orders refunding" : item.status == 6 ? "Shipping orders refunded": "" }
                 </td>
                    <td>{item.total_fare}</td>
                    <td>{item.total_revenue}</td>
                    <td>{item.updatedAt}</td>
                    <td>{item.vat_fee}</td>
                    <td>{item.weigh}</td>
                    <td>
                    <Button variant="primary" size="g" onClick={handleUpdateStatus}>Update Status</Button>
                    <Button variant="success" size="g" onClick={()=>{handleShow(item.id)}}>Export</Button>
                    </td>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Chon loai</Form.Label>
            <Form.Select onChange={(e)=>{
              setRoleBranch(e.target.value);
              fetchListBranch(e.target.value);
            }}>
              <option></option>
              <option value = {1} >Transaction Point</option>
              <option value ={2} >Transit Point</option>
              <option value ={3} >Head Quater</option>
            </Form.Select>
            <Form.Label>Chon dia diem</Form.Label>
            <Form.Select onChange={(e)=>{setBranchId(e.target.value)}}>
              {
              branchDetail.map((item)=>{
                return <option value={item.value} >{item.label}</option>
              })}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleExport}>
            Export
          </Button>
        </Modal.Footer>
      </Modal>
      </Col>
    </Row>
    </>
  );
};

export default ActiveProjects;
