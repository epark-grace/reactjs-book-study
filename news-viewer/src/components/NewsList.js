import axios from 'axios';
import styled from 'styled-components';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 2rem auto 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=key${query}`);
    }, [category]);

    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    if (!response) {
        return null;
    }

    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }

    const { articles } = response.data;

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    );
};

export default NewsList;