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
  font-size: 1.8em;
  font-weight: 600;
  white-space: break-spaces;

  @media only screen and (max-width: 425px) {
    font-size: 1.2em;
  }
`;

const StyledNavbarBrandSubtitle = styled.span`
  color: ${(props) => props.theme.headerSubtitleColor} !important;
  @media only screen and (max-width: 425px) {
    font-size: 0.7em;
  }
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
    <StyledNavbar expand="lg" className="header py-3 py-md-4 border-bottom sticky-md-top">
      <Container fluid className="d-flex flex-row justify-content-between">
        <div className="header_left d-flex flex-column w-75">
          <StyledNavbarBrand className="h1 header_title d-flex" href="/">{t('title')}</StyledNavbarBrand>
          <StyledNavbarBrandSubtitle className="header_subtitle d-flex text-muted small">{t('subtitle')}</StyledNavbarBrandSubtitle>
        </div>
        <Navbar.Toggle aria-controls="nav" className="bg-white" />
        <Navbar.Collapse id="nav" className="mt-4">
          <div className="header_right d-flex flex-column w-100">
            {
              domain !== 'Ipp' && domain !== 'ScientificNotes'
                && (
                <ButtonGroup size="sm" className="header_language-switcher mb-2 w-25" aria-label="Language Switcher">
                  <StyledLanguageButton className={lang === 'rus' ? 'active' : ''} onClick={setRu}>Рус</StyledLanguageButton>
                  <StyledLanguageButton className={lang === 'en' ? 'active' : ''} onClick={setEn}>Eng</StyledLanguageButton>
                </ButtonGroup>
                )
            }
            <Form className="header_search-form d-flex" onSubmit={formik.handleSubmit}>
              <Form.Control
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
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};
export default Header;
