// import node module libraries
import React from "react";
import Link from "next/link";
import { Card, Table, Dropdown, Image } from "react-bootstrap";
import { MoreVertical } from "react-feather";

// import required data files
import TeamsData from "data/dashboard/TeamsData";

const Teams = () => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));

  CustomToggle.displayName = "CustomToggle";

  return (
    <Card className="h-100">
      <Card.Header className="bg-white py-4">
        <h4 className="mb-0">Teams </h4>
      </Card.Header>
      <Table responsive className="text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Tên</th>
            <th>Đã giao</th>
            <th>Đang giao</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {TeamsData.map((item, index) => {
            return (
              <tr key={index}>
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <div>
                      <Image
                        src={item.image}
                        alt=""
                        className="avatar-md avatar rounded-circle"
                      />
                    </div>
                    <div className="ms-3 lh-1">
                      <h5 className=" mb-1">{item.name}</h5>
                      <p className="mb-0">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">{item.shipped}</td>
                <td className="align-middle">{item.shipping}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default Teams;
