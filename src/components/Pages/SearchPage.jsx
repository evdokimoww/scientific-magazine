import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as searchSelectors } from '../../slices/searchSlice.js';
import { Article } from './MagazinePage.jsx';

const SearchPage = () => {
  const articles = useSelector(searchSelectors.selectAll);

  return (
    <div className="search-page">
      <h2 className="search-page_title">Результаты поиска:</h2>
      <hr className="my-4" />
      <div className="search-page_results mt-4">
        {
          articles.length > 0
            ? articles.map((article) => <Article key={article.id} article={article} />)
            : <p>Поиск не дал результатов</p>
        }
      </div>
    </div>
  );
};
export default SearchPage;
