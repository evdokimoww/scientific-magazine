import { Col, Nav } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImEye } from 'react-icons/im';
import styled from 'styled-components';
import { DomainContext } from '../../context/DomainContext.jsx';
import { fetchMostViewedArticles, selectors as mostViewedArticlesSelector } from '../../slices/mostViewedArticlesSlice';
import routes from '../../routes';
import { LanguageContext } from '../../context/LanguageContext.jsx';

const StyledLink = styled(Link)`
  color: rgb(${(props) => props.theme.primaryColor});
  padding: 0.8rem 1rem;
  font-weight: bold;
  &.active, &:hover {
    color: rgb(${(props) => props.theme.primaryColor});
    background-color: rgba(${(props) => props.theme.primaryColor}, 0.2);
  }
`;

const MostViewedLink = styled.a`
  color: rgb(${(props) => props.theme.primaryColor});
  display: block;
  padding: 0.8rem;
  text-decoration: none;
  &:hover {
    color: rgb(${(props) => props.theme.primaryColor});
    background-color: rgba(${(props) => props.theme.primaryColor}, 0.2);
  }
`;

const CustomLink = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const path = resolved.pathname.split('/').slice(0, 3).concat('*').join(('/'));
  const match = useMatch({ path, end: true });

  return (
    <StyledLink
      className={`nav-link${match ? ' active' : ''}`}
      to={to}
    >
      {children}
    </StyledLink>
  );
};

const Sidebar = () => {
  const { domain } = useContext(DomainContext);
  const dispatch = useDispatch();
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(fetchMostViewedArticles());
  });

  const mostViewedArticles = useSelector(mostViewedArticlesSelector.selectAll);

  return (
    <Col xs={5} md={4} lg={3} className="d-flex flex-column border-end p-0">
      <Nav className="flex-column my-4">
        <CustomLink to="/pages/index">Главная</CustomLink>
        <CustomLink to="/pages/author">Сведения для автора</CustomLink>
        <CustomLink to="/magazine/new-number">Новый выпуск</CustomLink>
        <CustomLink to="/magazine/archive/1">Архив номеров</CustomLink>
        {domain !== 'EconomPrav' && <CustomLink to="/pages/redaction">Редакция и рецензенты</CustomLink>}
        {domain === 'ScientificNotes' && <CustomLink to="/pages/geo">География авторов</CustomLink>}
        {domain === 'Ipp' && <CustomLink to="/pages/retraction">Ретракция</CustomLink>}
        {domain !== 'ScientificSearch' && <CustomLink to="/certificates">Свидетельства о регистрации</CustomLink>}
        <CustomLink to="/pages/contacts">Контакты</CustomLink>
      </Nav>

      <div className="p-4 text-center d-flex flex-column justify-content-between border-top border-bottom">
        <span className="small">ВОЗРАСТНАЯ КЛАССИФИКАЦИЯ</span>
        <h1 className="my-2">16+</h1>
        <span className="small">ИНФОРМАЦИОННОГО ИЗДАНИЯ</span>
      </div>

      <div className="my-4 d-flex flex-column px-4">
        <h6>Самые просматриваемые статьи:</h6>
        {
          mostViewedArticles?.map((article) => (
            <div className="mt-2" key={article.id}>
              <MostViewedLink
                dangerouslySetInnerHTML={{ __html: `${article[`header_${lang}`]}` }}
                href={routes.downloadArticlePath(article.id)}
              />
              <div className="d-flex align-items-center ms-3">
                <ImEye />
                <span className="small ps-1">{article.viewed}</span>
              </div>
            </div>
          ))
        }
      </div>
    </Col>
  );
};

export default Sidebar;
