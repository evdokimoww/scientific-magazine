import React from 'react';
import SiteTitle from '../SiteTitle.jsx';

const NoMatch = () => (
  <div className="nomatch-page">
    <SiteTitle pageName="404: Not Found" />
    <h2 className="text-page_title">Ошибка 404: страница не найдена</h2>
  </div>
);
export default NoMatch;
