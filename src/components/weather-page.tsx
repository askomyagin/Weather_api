import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { Weather } from '../service/weater-service';
import Error from './error';
import Spinner from './spinner';
import WeatherInfo from './weater-info';

interface Props {
    getData: (city: string) => Promise<Weather>;
}

const WeatherPage: React.FC<Props> = ({ getData }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [items, setItems] = useState<Weather>();
    const [city, setCity] = useState(
        localStorage.getItem('city') ||
            localStorage.getItem('location') ||
            'Moscow'
    );

    useEffect(() => {
        setLoading(true);
        getData(city)
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                setError(
                    `Error: The city is entered incorrectly or it does not exist in the database. Go back to the main page.`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [getData, city]);

    if (error)
        return (
            <PageContainer>
                <Error error={error} setCity={setCity} setError={setError} />
            </PageContainer>
        );
    if (loading)
        return (
            <PageContainer>
                <Spinner />
            </PageContainer>
        );

    return (
        <PageContainer>
            {items && (
                <WeatherInfo
                    items={items}
                    setCity={setCity}
                    setError={setError}
                />
            )}
        </PageContainer>
    );
};

const PageContainer = styled.div`
    width: 400px;
    height: 400px;
    background-image: url('https://img1.goodfon.ru/original/800x480/5/de/tekstura-fon-liniya-purpur.jpg');
    background-position: 50% 100%;
`;

export default WeatherPage;
