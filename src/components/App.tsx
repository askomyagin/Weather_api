import { Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import WeatherPage from './weather-page';
import WeaterService from '../service/weater-service';

const { getCurrent } = new WeaterService();

const AppContainer = styled.div`
    max-width: 100%;
    background-color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const App = () => {
    return (
        <AppContainer>
            <Routes>
                <Route
                    path="/"
                    element={<WeatherPage getData={getCurrent} />}
                />
            </Routes>
        </AppContainer>
    );
};

export default App;
