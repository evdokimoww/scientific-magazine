import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as searchSelectors } from '../../slices/searchSlice.js';
import { Article } from './MagazinePage.jsx';

const SearchPage = () => {
  const articles = useSelector(searchSelectors.selectAll);
  console.log(articles);
  return (
    <>
      <h4>Результаты поиска:</h4>
      {
        articles.length > 0
          ? articles.map((article) => <Article key={article.id} article={article} />)
          : <p>Данные отсутствуют или не загружены. Вернуться на ГЛАВНУЮ</p>
      }
    </>
  );
};
export default SearchPage;
