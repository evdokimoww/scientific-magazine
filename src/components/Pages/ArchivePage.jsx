import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Col, Pagination, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchArchiveNumbers, selectors as archiveSelectors } from '../../slices/archiveSlice.js';
import routes from '../../routes';

const StyledLink = styled(Link)`
  color: rgb(${(props) => props.theme.primaryColor})
`;

const StyledButton = styled.li`
  & > .page-link {
    color: rgb(${(props) => props.theme.primaryColor}) !important;
    border-color: rgb(${(props) => props.theme.primaryColor}) !important;
  }

  & > .page-link:focus {
    box-shadow: none;
  }
  
  &.active > .page-link {
    color: white !important;
    background-color: rgb(${(props) => props.theme.primaryColor}) !important;
  }
  
  &:hover {
    color: rgb(${(props) => props.theme.primaryColor});
    background-color: rgba(${(props) => props.theme.primaryColor}, 0.2);
  }
`;

const ArchivePage = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(fetchArchiveNumbers(pageNumber));
  }, [pageNumber]);

  const archiveNumbers = useSelector((state) => archiveSelectors.selectAll(state));
  const pages = useSelector((state) => state.archive.pages);
  const currentPage = useSelector((state) => state.archive.currentPage);

  const paginationItems = [];

  for (let number = 1; number <= pages; number += 1) {
    paginationItems.push(
      <StyledButton key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
        <Link to={`${routes.archivePaginationPath(number)}`} className="page-link">
          {number}
        </Link>
      </StyledButton>,
    );
  }

  return (
    <div className="archive-page">
      <h2 className="archive-page_title">Архив номеров</h2>
      <hr className="my-4" />
      <Row className="archive-page_magazines mb-4">
        {
          archiveNumbers
          && archiveNumbers.map((number) => (
            <Col
              key={_.uniqueId()}
              className="flex-column mb-4"
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
            >
              <img className="magazine-img d-flex" src={routes.archiveNumberImgPath(number.img)} alt={number.description} />
              <StyledLink className="magazine-link d-flex mt-2" to={`/magazine/archive/number/${number.id}`}>{number.description}</StyledLink>
            </Col>
          ))
        }
      </Row>
      <Pagination>{paginationItems}</Pagination>
    </div>
  );
};

export default ArchivePage;
