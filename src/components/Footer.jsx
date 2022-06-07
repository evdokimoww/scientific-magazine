import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchTotalStatistic } from '../slices/infoSlice';

const StyledFooter = styled(Container)`
  font-size: 0.8rem;
`;

const Footer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalStatistic());
  }, []);

  const { allArticles, allNumbers, averageArticles } = useSelector((state) => state.info);

  return (
    <StyledFooter fluid className="footer border-top bg-light py-2 flex-md-row flex-column">
      <Row>
        <Col sm={12} md={6} className="d-flex flex-column text-md-start text-center my-2 my-md-0">
          <span className="mb-1">
            Количество выпусков:
            {' '}
            <b>{allNumbers}</b>
          </span>
          <span className="mb-1">
            Общее количество статей:
            {' '}
            <b>{allArticles}</b>
          </span>
          <span className="mb-1">
            Среднее количество статей в выпуске:
            {' '}
            <b>{averageArticles}</b>
          </span>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-column justify-content-end my-2 my-md-0">
          <span className="mb-1 text-md-end text-center">Разработано в SUPPORT HUB. Курский государственный университет.</span>
        </Col>
      </Row>
    </StyledFooter>
  );
};

export default Footer;
