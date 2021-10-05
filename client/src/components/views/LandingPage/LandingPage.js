import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {
    //아래의 데이터를 담아줄 state를 만들어줍니다.
    //setMovies를 이용해 데이터를 넣어줍니다.
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    //api를 이용해서 데이터를 가져옵니다.
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }, []);

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    };

    const fetchMovies = endpoint => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                //setMovies를 이용하여 Movies state에 가져온 데이터가 들어가게 됩니다.
                console.log(response);
                // setMovies([...response.results]); 덮어 씌우기
                setMovies([...Movies, ...response.results]); //추가하기
                setMainMovieImage(response.results[0]);
                setCurrentPage(response.page);
            });
    };

    return (
        <>
            <div style={{ width: '100%', margin: '0' }}>
                {/* Main Image */}
                {/*MainMovieImage state에 데이터가 들어있다면 실행하라 */}
                {MainMovieImage && (
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    />
                )}

                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2>Movies by latest</h2>
                    <hr />
                    {/* Movie Grid Cards */}
                    <Row gutter={[16, 16]}>
                        {' '}
                        {/* gutter 이미지 사이의 틈새선을 넣어주는 gutter*/}
                        {Movies &&
                            Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={movie.poster_path ? `${IMAGE_BASE_URL}w500/${movie.poster_path}` : null}
                                        movieId={movie.id}
                                        movieName={movie.original_title}
                                    />
                                </React.Fragment>
                            ))}
                    </Row>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreItems}> Load More </button>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
