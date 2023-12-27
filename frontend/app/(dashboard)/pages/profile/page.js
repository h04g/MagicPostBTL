"use client";
// import node module libraries
import { Col, Row, Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";

// import sub components
import {
  ActivityFeed,
  ProfileHeader,
  ProjectsContributions,
} from "sub-components";

const Profile = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Tổng quan" />

      {/* Profile Header  */}
      <ProfileHeader />

      {/* content */}
      <div className="py-6">
        <Row>
          {/* Projects Contributions */}
          <ProjectsContributions />

          {/* Recent From Blog */}
        </Row>
      </div>
    </Container>
  );
};

export default Profile;
