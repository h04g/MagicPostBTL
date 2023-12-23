// import node module libraries
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Modal, Button, Form } from "react-bootstrap";

// import widget as custom components
import { FormSelect } from "widgets";

const BillingAddress = () => {
  const [modalShow, setModalShow] = useState(false);
  const NewBillingAddressModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="mb-1" id="billingAddressModalLabel">
              Thêm địa chỉ mới
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Col xs={12} className="mb-3">
              <Form.Group controlId="addressOne">
                <Form.Label>Chuyển đến</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Điểm giao dịch 1"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Check type="checkbox" id="customCheckAddress">
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>Lưu là địa chỉ mặc định</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col xs={12}>
              <Button type="submit" className="d-grid">
                Lưu địa chỉ
              </Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Fragment>
      <Col xs={12} className="mb-6">
        <Card>
          <Card.Header className="p-4 bg-white">
            <h4 className="mb-0">Chuyển đến</h4>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center">
              <Col lg={6} md={12} xs={12} className="mb-4 mb-lg-0">
                <div className="mb-3 mb-lg-0">
                  <Form.Check id="shippingBillingAddress1">
                    <Form.Check.Input
                      type="radio"
                      name="shippingBillingAddress"
                    />
                    <Form.Check.Label>
                      <span className="d-block mb-3 text-dark fw-bold">
                        Điểm tập kết 1
                      </span>
                      <Link href="#" className="me-2 link-success">
                        Sửa
                      </Link>
                      <Link href="#" className="me-2 link-danger">
                        Xóa
                      </Link>
                      <Link
                        href="#"
                        className="me-2 text-muted text-primary-hover"
                      >
                        Xóa mặc định
                      </Link>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
              </Col>
              <Col
                lg={6}
                md={12}
                xs={12}
                className="d-flex justify-content-lg-end"
              >
                <div className="mb-2">
                  <p className="mb-1">
                    E-mail: <Link href="#">2@gmail.com</Link>
                  </p>
                  <p>Phone: 321-654-0987</p>
                </div>
              </Col>
              <Col xs={12}>
                <hr className="my-6" />
              </Col>
              <Col lg={6} md={12} xs={12} className="mb-4 mb-lg-0">
                <Form.Check id="shippingBillingAddress2">
                  <Form.Check.Input
                    type="radio"
                    name="shippingBillingAddress"
                  />
                  <Form.Check.Label>
                    <span className="d-block mb-3 text-dark fw-bold">
                      Điểm giao dịch 1
                    </span>
                    <Link href="#" className="me-2 link-success">
                      Sửa
                    </Link>
                    <Link href="#" className="me-2 link-danger">
                      Xóa
                    </Link>
                    <Link
                      href="#"
                      className="me-2 text-muted text-primary-hover"
                    >
                      Đặt làm mặc định
                    </Link>
                  </Form.Check.Label>
                </Form.Check>
              </Col>
              <Col
                lg={6}
                md={12}
                xs={12}
                className="d-flex justify-content-lg-end"
              >
                <div className="mb-2">
                  <p className="mb-1">
                    E-mail: <Link href="#">1@gmail.com</Link>
                  </p>
                  <p>Phone: 321-654-0987</p>
                </div>
              </Col>
              <Col xs={12}>
                <hr className="mt-6 mb-4" />
              </Col>
              <Col xs={12}>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Thêm địa chỉ
                </Button>
                <NewBillingAddressModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default BillingAddress;
