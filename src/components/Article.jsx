import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { LanguageContext } from '../context/LanguageContext.jsx';
import routes from '../routes';

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

const Article = ({ article }) => {
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

export default Article;
