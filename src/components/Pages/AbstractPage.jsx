import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { fetchAbstractById, selectors as abstractSelectors } from '../../slices/abstractSlice';
import SiteTitle from '../SiteTitle.jsx';

const Article = ({ article }) => (
  <div className="article mb-4">
    <h5 className="article_title" dangerouslySetInnerHTML={{ __html: `${article.header_en}` }} />
    <p className="article_body" dangerouslySetInnerHTML={{ __html: `${article.annotation}` }} />
    <p className="article_body">{article.body_en}</p>
    <hr className="my-4" />
  </div>
);

const ScienceSection = ({ section }) => (
  <div className="abstract-page_section">
    <h4 className="section_title mb-4">{section.name_en}</h4>
    <hr className="my-4" />
    <div className="section_articles">
      {
          section.article.map((article) => <Article key={_.uniqueId()} article={article} />)
        }
    </div>
  </div>
);

const AbstractPage = () => {
  const dispatch = useDispatch();
  const { numberId } = useParams();

  useEffect(() => {
    dispatch(fetchAbstractById(numberId));
  });

  const abstractData = useSelector((state) => abstractSelectors.selectById(state, numberId));

  return (
    <div className="abstract-page">
      <SiteTitle pageName="Abstract" />
      {
        abstractData
          && (
          <>
            <h2 className="abstract-page_title">Abstract</h2>
            <hr className="my-4" />
            <div className="abstract-page_sections">
              {
                abstractData.sections.map((section) => (
                  <ScienceSection key={_.uniqueId()} section={section} />))
              }
            </div>
          </>
          )
      }
    </div>
  );
};

export default AbstractPage;
