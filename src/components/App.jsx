import React, { useContext, useLayoutEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SimplePage from './Pages/SimplePage.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import MagazinePage from './Pages/MagazinePage.jsx';
import ArchivePage from './Pages/ArchivePage.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import CertificatesPage from './Pages/CertificatesPage.jsx';
import { DomainContext } from '../context/DomainContext.jsx';
import getTheme from '../themes.js';
import AbstractPage from './Pages/AbstractPage.jsx';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};


const App = () => {
  const { domain } = useContext(DomainContext);
  return (
    <ThemeProvider theme={getTheme(domain)}>
      <Wrapper>
      <Header />
      <Container>
        <Row>
          <Sidebar />
          <Col xs={7} md={8} lg={9} className="py-4 px-5">
            <Routes>
              <Route path="/" element={<Navigate to="pages/index" />} />
              <Route path="/pages/:pageLink" element={<SimplePage />} />
              <Route path="/magazine/archive/:pageNumber" element={<ArchivePage />} />
              <Route path="/magazine/:numberId" element={<MagazinePage />} />
              <Route path="/magazine/archive/number/:numberId" element={<MagazinePage />} />
              <Route path="/magazine/:numberId/abstract" element={<AbstractPage />} />
              <Route path="/search-results" element={<SearchPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
