// @ts-check

const host = 'https://api-mag.kursksu.ru';
const prefix = 'api/v1';

export default {
  pagesPath: (path) => [host, prefix, `page/?name=${path}`].join('/'),
  totalStatisticPath: () => [host, prefix, 'total_statistic/'].join('/'),
  newNumberPath: () => [host, prefix, 'number/'].join('/'),
  downloadArticlePath: (id) => [host, prefix, 'get_pdf', id].join('/'),
  archivePath: (pageNumber) => [host, prefix, 'archive', pageNumber].join('/'),
  archivePaginationPath: (pageNumber) => ['/magazine/archive', pageNumber].join('/'),
  archiveNumberImgPath: (link) => [host, link].join(''),
  magazineNumberByIdPath: (id) => [host, prefix, `number/?id=${id}`].join('/'),
  mostViewedArticlesPath: () => [host, prefix, 'most_viewed_articles/'].join('/'),
  searchPath: () => [host, prefix, 'search/'].join('/'),
  certificatesPath: () => [host, prefix, 'register/'].join('/'),
  certificateImagePath: (link) => [host, link].join(''),
};
