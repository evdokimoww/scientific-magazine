import {
  Button, ButtonGroup, Container, Form, Navbar,
} from 'react-bootstrap';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DomainContext } from '../context/DomainContext.jsx';
import { fetchSearchArticles } from '../slices/searchSlice';
import { LanguageContext } from '../context/LanguageContext.jsx';

const StyledNavbar = styled(Navbar)`
  ${(props) => props.theme.headerBg};
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  color: ${(props) => props.theme.headerTitleColor} !important;
  font-size: 2rem;
  font-weight: 600;
`;

const StyledNavbarBrandSubtitle = styled.span`
  color: ${(props) => props.theme.headerSubtitleColor} !important;
`;

const StyledFormControl = styled(Form.Control)`
  width: 260px;
`;

const StyledSubmitButton = styled(Button)`
  color: ${(props) => props.theme.searchButtonColor};
  border-color: ${(props) => props.theme.searchButtonColor};
  
  &:hover, :active, :focus{
    color: rgb(${(props) => props.theme.searchButtonColorHover});
    background-color: ${(props) => props.theme.searchButtonBgHover};
    border-color: ${(props) => props.theme.searchButtonColor};
    box-shadow: none;
  }
`;

const StyledLanguageButton = styled(StyledSubmitButton)`
  background-color: transparent;

  &.active{
    color: rgb(${(props) => props.theme.searchButtonColorHover});
    background-color: ${(props) => props.theme.searchButtonBgHover};
    border-color: ${(props) => props.theme.searchButtonColor};
    box-shadow: none;
  }
  &.active:focus{
    box-shadow: none;
  }
`;

const Header = () => {
  const { domain } = useContext(DomainContext);
  const { t } = useTranslation('translation', { keyPrefix: `header.${domain}` });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang, setRu, setEn } = useContext(LanguageContext);

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
    <StyledNavbar sticky="top" expand="lg" className="header py-4 border-bottom">
      <Container fluid className="d-flex justify-content-between">
        <div className="d-flex flex-column header_title">
          <StyledNavbarBrand className="title d-flex" href="/">{t('title')}</StyledNavbarBrand>
          <StyledNavbarBrandSubtitle className="subtitle d-flex text-muted small">{t('subtitle')}</StyledNavbarBrandSubtitle>
        </div>
        <div className="d-flex flex-column">
          <ButtonGroup size="sm" className="mb-2 w-25" aria-label="Language Switcher">
            <StyledLanguageButton className={lang === 'rus' ? 'active' : ''} onClick={setRu}>Рус</StyledLanguageButton>
            <StyledLanguageButton className={lang === 'en' ? 'active' : ''} onClick={setEn}>Eng</StyledLanguageButton>
          </ButtonGroup>
          <Form className="search-form d-flex" onSubmit={formik.handleSubmit}>
            <StyledFormControl
              type="search"
              name="search"
              placeholder="Введите запрос..."
              className="search-form_input me-2"
              aria-label="Search"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.search}
            />
            <StyledSubmitButton className="search-form_button" variant="outline" type="submit" disabled={!formik.dirty}>Поиск</StyledSubmitButton>
          </Form>
        </div>
      </Container>
    </StyledNavbar>
  );
};
export default Header;
