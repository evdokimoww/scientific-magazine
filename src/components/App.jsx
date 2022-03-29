import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SimplePage from './Pages/SimplePage.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import MagazinePage from './Pages/MagazinePage.jsx';
import ArchivePage from './Pages/ArchivePage.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import CertificatesPage from './Pages/CertificatesPage.jsx';

const App = () => (
  <>
    <Header />
    <Container>
      <Row>
        <Sidebar />
        <Col xs={7} md={8} lg={9} className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="pages/index" />} />
            <Route path="/pages/:pageLink" element={<SimplePage />} />
            <Route path="/magazine/:numberId" element={<MagazinePage />} />
            <Route path="/magazine/archive/:pageNumber" element={<ArchivePage />} />
            <Route path="/search-results" element={<SearchPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
          </Routes>
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);

export default App;
