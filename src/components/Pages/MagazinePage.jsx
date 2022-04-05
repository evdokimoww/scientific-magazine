import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMagazineNewNumber, selectors as newNumberSelectors } from '../../slices/newNumberSlice';
import { fetchMagazineNumberById, selectors as magazineSelectors } from '../../slices/magazineSlice';
import { LanguageContext } from '../../context/LanguageContext.jsx';
import SiteTitle from '../SiteTitle.jsx';
import Article from '../Article.jsx';

const StyledLink = styled(Link)`
  color: rgb(${(props) => props.theme.primaryColor});
  font-weight: bold;
  
  &:hover, :active {
    color: rgba(${(props) => props.theme.primaryColor}, 0.8);
  }
`;

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
      <SiteTitle pageName={magazineData?.description} />
      <h2 className="magazine-page_title">{magazineData?.description}</h2>
      <hr className="my-4" />
      <div className="magazine-page_sections">
        {
          magazineData
          && (
            <>
              {
                magazineData.sections.map((section) => (
                  <ScienceSection key={_.uniqueId()} section={section} />))
              }
              <div className="magazine-page_abstract">
                <StyledLink to={`/magazine/${magazineData?.id}/abstract`}>ABSTRACT</StyledLink>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default MagazinePage;
