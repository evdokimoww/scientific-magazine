import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchMagazineNewNumber, selectors as newNumberSelectors } from '../../slices/newNumberSlice';
import routes from '../../routes.js';
import { fetchMagazineNumberById, selectors as magazineSelectors } from '../../slices/magazineSlice';
import { LanguageContext } from '../../context/LanguageContext.jsx';
import { fetchAbstractById } from '../../slices/abstractSlice';

const StyledButton = styled(Button)`
  background-color: rgb(${(props) => props.theme.primaryColor}); 
  border-color: rgb(${(props) => props.theme.primaryColor}); 
  &:hover {
    color: rgb(${(props) => props.theme.primaryColor});
    background-color: rgba(${(props) => props.theme.primaryColor}, 0.2);
    border-color: rgb(${(props) => props.theme.primaryColor});
  }
  &:active, :focus {
    color: white;
    background-color: rgb(${(props) => props.theme.primaryColor});
    box-shadow: none;
  }
`;

export const Article = ({ article }) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="article mb-4">
      <h5 className="article_title" dangerouslySetInnerHTML={{ __html: `${article[`header_${lang}`]}` }} />
      <p className="article_body">{article[`body_${lang}`]}</p>
      <ButtonGroup className="article_buttons">
        <StyledButton className="button_download" href={routes.downloadArticlePath(article.link)}>Скачать PDF</StyledButton>
        <Button className="button_info" variant="outline-secondary" disabled={true}>
          Количество скачиваний:
          {' '}
          {article.downloads}
        </Button>
      </ButtonGroup>
    </div>
  );
};

const ScienceSection = ({ section }) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="magazine-page_section">
      <h4 className="section_title bg-light p-3 mb-4">{section[`name_${lang}`]}</h4>
      <div className="section_articles">
        {
          section.article.map((article) => <Article key={_.uniqueId()} article={article} />)
        }
      </div>
    </div>
  );
};

const MagazinePage = () => {
  const dispatch = useDispatch();
  const { numberId } = useParams();

  useEffect(() => {
    if (numberId === 'new-number') {
      dispatch(fetchMagazineNewNumber());
    } else {
      dispatch(fetchMagazineNumberById(numberId));
    }
  });

  const magazineData = numberId === 'new-number'
    ? useSelector((state) => newNumberSelectors.selectAll(state))[0]
    : useSelector((state) => magazineSelectors.selectById(state, numberId));

  return (
    <div className="magazine-page">
      <h2 className="magazine-page_title">{magazineData?.description}</h2>
      <hr className="my-4" />
      <div className="magazine-page_sections">
        {
          magazineData
          && magazineData.sections.map((section) => (
            <ScienceSection key={_.uniqueId()} section={section} />))
        }
      </div>
      <div className="magazine-page_abstract">
        <Link to={`/magazine/${magazineData?.id}/abstract`}>ABSTRACT</Link>
      </div>
    </div>
  );
};

export default MagazinePage;
