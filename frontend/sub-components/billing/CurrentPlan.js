// import node module libraries
import Link from "next/link";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Modal,
  Button,
  Form,
  Badge,
} from "react-bootstrap";

const CurrentPlan = () => {
  const [modalShow, setModalShow] = useState(false);

  const ChangePlanModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Your Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <h4 className="mb-1">Change your plan</h4>
          <p>You can choose from one of the available plans bellow.</p>
          <Card className="border shadow-none">
            <Card.Body className="border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Form.Check id="plan1">
                    <Form.Check.Input type="radio" name="plan" />
                    <Form.Check.Label>
                      <span className="d-block text-dark fw-bold">
                        Standard <Badge bg="success"> Active Plan</Badge>
                      </span>
                      <span className="mb-0 small text-muted">Single Site</span>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  <h4 className="fw-bold mb-0 text-dark">$49.00</h4>
                </div>
              </div>
            </Card.Body>
            <Card.Body className="border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Form.Check id="plan2">
                    <Form.Check.Input type="radio" name="plan" />
                    <Form.Check.Label>
                      <span className="d-block text-dark fw-bold">
                        Multiside
                      </span>
                      <span className="mb-0 small text-muted">
                        Unlimited Site
                      </span>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  <h4 className="fw-bold mb-0 text-dark">$149.00</h4>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Form.Check id="plan3">
                    <Form.Check.Input type="radio" name="plan" />
                    <Form.Check.Label>
                      <span className="d-block text-dark fw-bold">
                        Extended
                      </span>
                      <span className="mb-0 small text-muted">
                        For spanaying users
                      </span>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  <h4 className="fw-bold mb-0 text-dark">$449.00</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer className="justify-content-start p-5">
          <Button>Save and Continue</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Col xs={12} className="mb-6">
      <Card>
        {/* card header  */}
        <Card.Header className="p-4 bg-white">
          <h4 className="mb-0">Tổng quan đơn hàng</h4>
        </Card.Header>
        {/* card body  */}
        <Card.Body>
          <Row className="row">
            <Col xl={8} lg={6} md={12} xs={12}>
              <div className="mb-2">
                <p className="text-muted mb-0">Chuyển đến</p>
                <p>
                  Unlimited access to essential tools for design, bootstrap
                  themes, illustrator and icons.
                </p>
                <p>
                  <i className="fe fe-info fs-4 me-2 text-muted icon-xs"></i>
                  Chuyển đi: Số luợng <span className="text-primary">499 </span>
                  <span className="text-dark fw-bold">ngày 01/01/2023</span>
                </p>
              </div>
            </Col>
            <Col xl={4} lg={6} md={12} xs={12}>
              <div>
                <small className="text-muted">Số luợng</small>
                <h1 className="fw-bold text-primary">499</h1>

                <Button
                  variant="dark"
                  className="d-grid mb-2 w-100"
                  onClick={() => setModalShow(true)}
                >
                  Chuyển đi
                </Button>
                <ChangePlanModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <Link href="#" className="btn btn-outline-white d-grid">
                  Thay đổi số luợng
                </Link>
                <Link
                  href="#"
                  className="link-danger btn btn-outline-white d-grid"
                >
                  Hủy
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CurrentPlan;
