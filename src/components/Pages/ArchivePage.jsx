import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { fetchArchiveNumbers, selectors as archiveSelectors } from '../../slices/archiveSlice.js';
import routes from '../../routes';

const ArchivePage = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(fetchArchiveNumbers(pageNumber));
  });

  const archiveNumbers = useSelector((state) => archiveSelectors.selectAll(state));
  const pages = useSelector((state) => state.archive.pages);
  const currentPage = useSelector((state) => state.archive.currentPage);

  const paginationItems = [];

  for (let number = 1; number <= pages; number += 1) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} href={`${routes.archivePath()}${number}`}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <div>
        {archiveNumbers?.map((number) => (
          <div key={_.uniqueId()}>
            <img src={routes.archiveNumberImgPath(number.img)} alt={number.description} />
            <Link to={`/magazine/${number.id}`}>{number.description}</Link>
          </div>
        ))}
      </div>
      <Pagination>{paginationItems}</Pagination>
    </div>
  );
};

export default ArchivePage;
