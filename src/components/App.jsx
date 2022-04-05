import React, { lazy, useContext, Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import { DomainContext } from '../context/DomainContext.jsx';
import getTheme from '../themes.js';
import ScrollToTopWrapper from './ScrollToTop.jsx';

const SimplePage = lazy(() => import('./Pages/SimplePage.jsx'));
const ArchivePage = lazy(() => import('./Pages/ArchivePage.jsx'));
const MagazinePage = lazy(() => import('./Pages/MagazinePage.jsx'));
const AbstractPage = lazy(() => import('./Pages/AbstractPage.jsx'));
const SearchPage = lazy(() => import('./Pages/SearchPage.jsx'));
const CertificatesPage = lazy(() => import('./Pages/CertificatesPage.jsx'));
const NoMatch = lazy(() => import('./Pages/NoMatch.jsx'));

const App = () => {
  const { domain } = useContext(DomainContext);

  return (
    <ThemeProvider theme={getTheme(domain)}>
      <ScrollToTopWrapper>
        <Header />
        <Container>
          <Row className="flex-md-row flex-column">
            <Sidebar />
            <Col md={12} lg={9} className="py-md-4 px-md-5 p-3">
              <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                  <Route path="/" element={<Navigate to="pages/index" />} />
                  <Route path="/pages/:pageLink" element={<SimplePage />} />
                  <Route path="/magazine/archive/:pageNumber" element={<ArchivePage />} />
                  <Route path="/magazine/:numberId" element={<MagazinePage />} />
                  <Route path="/magazine/archive/number/:numberId" element={<MagazinePage />} />
                  <Route path="/magazine/:numberId/abstract" element={<AbstractPage />} />
                  <Route path="/search-results" element={<SearchPage />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="*" element={<NoMatch />} />
                </Routes>
              </Suspense>
            </Col>
          </Row>
        </Container>
        <Footer />
      </ScrollToTopWrapper>
    </ThemeProvider>
  );
};

export default App;
