import { Button, Container, Form, Navbar, } from 'react-bootstrap';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DomainContext } from '../context/DomainContext.jsx';
import { fetchSearchArticles } from '../slices/searchSlice';

const Header = () => {
  const { domain } = useContext(DomainContext);
  const { t } = useTranslation('translation', { keyPrefix: `header.${domain}` });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('search', values.search);
      dispatch(fetchSearchArticles(formData));
      resetForm();
      navigate('/search-results');
    },
  });

  return (
    <Navbar sticky="top" bg="light" expand="lg" className="py-4 border-bottom">
      <Container fluid className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <Navbar.Brand className="d-flex" href="/">{t('title')}</Navbar.Brand>
          <span className="d-flex text-muted">{t('subtitle')}</span>
        </div>
        <Form className="d-flex" onSubmit={formik.handleSubmit}>
          <Form.Control
            type="search"
            name="search"
            placeholder="Поиск по фамилии автора"
            className="me-2"
            aria-label="Search"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.search}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};
export default Header;
