import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { fetchMagazineNewNumber, selectors as newNumberSelectors } from '../../slices/newNumberSlice';
import routes from '../../routes.js';
import { fetchMagazineNumberById, selectors as magazineSelectors } from '../../slices/magazineSlice';

export const Article = ({ article }) => (
  <div>
    <h5 dangerouslySetInnerHTML={{ __html: `${article.header_rus}` }} />
    <p>{article.body_rus}</p>
    <p>
      Количество скачиваний:
      {' '}
      {article.downloads}
    </p>
    <a href={routes.downloadArticlePath(article.link)}>скачать</a>
  </div>
);

const ScienceSection = ({ section }) => (
  <div>
    <h4>{section.name_rus}</h4>
    {
        section.article.map((article) => <Article key={_.uniqueId()} article={article} />)
      }
  </div>
);

const MagazinePage = () => {
  const dispatch = useDispatch();
  const { numberId } = useParams();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    numberId === 'new-number'
      ? dispatch(fetchMagazineNewNumber())
      : dispatch(fetchMagazineNumberById(numberId));
  });

  const magazineData = numberId === 'new-number'
    ? useSelector((state) => newNumberSelectors.selectAll(state))[0]
    : useSelector((state) => magazineSelectors.selectById(state, numberId));

  return (
    <>
      <h2>{magazineData?.description}</h2>
      {
        magazineData?.sections.map((section) => <ScienceSection key={_.uniqueId()} section={section} />)
      }
    </>
  );
};

export default MagazinePage;
