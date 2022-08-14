import styled from '@emotion/styled';
import React, { useState } from 'react';

interface Props {
    setCity: (x: string) => void;
    setChooseCity: (x: boolean) => void;
    chooseCity: boolean;
}

interface ChoosingContainerProps {
    chooseCity: boolean;
}

interface ButtonExitProps {
    materialIcons: string;
    setChooseCity: (x: boolean) => void;
}

const ChoosingCity: React.FC<Props> = ({
    setCity,
    setChooseCity,
    chooseCity,
}) => {
    const [message, setMessage] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setChooseCity(false);
        setCity(message);
        localStorage.setItem('city', message);
    }

    return (
        <ChoosingContainer chooseCity={chooseCity}>
            {chooseCity && (
                <>
                    <ButtonExitComponent
                        materialIcons={'close'}
                        setChooseCity={setChooseCity}
                    />
                    <ChooseCityContainer>
                        <ChooseCityTitle>Choose City:</ChooseCityTitle>
                        <ChooseCityFor onSubmit={handleSubmit}>
                            <ChooseCityInput
                                id="city"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="London"
                                required
                            />
                            <ChooseCityButton type="submit">
                                Find
                            </ChooseCityButton>
                        </ChooseCityFor>
                    </ChooseCityContainer>
                </>
            )}
        </ChoosingContainer>
    );
};

const ChoosingContainer = styled.div<ChoosingContainerProps>`
    width: ${(props) => (props.chooseCity ? '400px' : '0px')};
    background-color: ${(props) => (props.chooseCity ? '#844a87' : 'none')};
    transform: ${(props) => (props.chooseCity ? 'translateX(0)' : 'none')};
    visibility: ${(props) => (props.chooseCity ? 'visible' : 'hidden')};
    height: 400px;
    transition: all 0.2s;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChooseCityButton = styled.button`
    border: none;
    outline: none;
    width: 40%;
    border-radius: 10px;
    margin-top: 20px;
    height: 40px;
`;

const ChooseCityInput = styled.input`
    background-color: #844a87;
    border: none;
    outline: none;
    border-bottom: 2px solid white;
    color: white;
    width: 100%;
    font-size: 1.2rem;
    padding: 10px 5px;
`;

const ChooseCityFor = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonExit = styled.button`
    position: fixed;
    right: 20px;
    top: 20px;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: white;
`;

const ButtonExitComponent: React.FC<ButtonExitProps> = ({
    materialIcons,
    setChooseCity,
}) => (
    <ButtonExit
        className={'material-icons'}
        onClick={() => {
            setChooseCity(false);
        }}
    >
        {materialIcons}
    </ButtonExit>
);

const ChooseCityTitle = styled.div`
    color: white;
    font-size: 1.3rem;
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Hind Siliguri', sans-serif;
`;
const ChooseCityContainer = styled.div``;

export default ChoosingCity;
