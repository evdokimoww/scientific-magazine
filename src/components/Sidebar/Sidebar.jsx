import { Col, Nav } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DomainContext } from '../../context/DomainContext.jsx';
import { fetchMostViewedArticles, selectors as mostViewedArticlesSelector } from '../../slices/mostViewedArticlesSlice';
import routes from '../../routes';

const CustomLink = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`nav-link${match ? ' active' : ''}`}
      to={to}
    >
      {children}
    </Link>
  );
};

const Sidebar = () => {
  const { domain } = useContext(DomainContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMostViewedArticles());
  });

  const mostViewedArticles = useSelector(mostViewedArticlesSelector.selectAll);

  return (
    <Col xs={5} md={4} lg={3} className="d-flex flex-column border-end">
      <Nav className="flex-column">
        <CustomLink to="/pages/index">Главная</CustomLink>
        <CustomLink to="/pages/author">Сведения для автора</CustomLink>
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

      <div className="p-4 text-center d-flex flex-column justify-content-between">
        <span className="small">ВОЗРАСТНАЯ КЛАССИФИКАЦИЯ</span>
        <h1 className="my-2">16+</h1>
        <span className="small">ИНФОРМАЦИОННОГО ИЗДАНИЯ</span>
      </div>
      <div>
        {
          mostViewedArticles?.map((article) => (
            <div key={article.id}>
              <a
                dangerouslySetInnerHTML={{ __html: `${article.header_rus}` }}
                href={routes.downloadArticlePath(article.id)}
              />
              <p>
                Кол-во просмотров:
                {' '}
                {article.viewed}
              </p>
            </div>
          ))
        }
      </div>
    </Col>
  );
};

export default Sidebar;
