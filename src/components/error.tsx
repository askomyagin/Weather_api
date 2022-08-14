import styled from '@emotion/styled';

interface Props {
    error: string;
    setCity: (x: string) => void;
    setError: (x: string) => void;
}

interface ErrorIconProps {
    materialIcons: string;
}

const Error: React.FC<Props> = ({ error, setCity, setError }) => {
    const buttonPush = () => {
        if (localStorage.getItem('city') === localStorage.getItem('location')) {
            localStorage.removeItem('city');
            localStorage.removeItem('location');
            setCity('Moscow');
        }
        if (localStorage.getItem('city') !== localStorage.getItem('location')) {
            localStorage.removeItem('city');
            setCity(localStorage.getItem('location') || 'Moscow');
        }
        setError('');
    };

    return (
        <ErrorContainer>
            <ErrorContainerBorder>
                <ErrorIconComponent materialIcons={'error_outline'} />
                <ErrorText>{error}</ErrorText>
                <ErrorButton onClick={buttonPush}>Back Main Page</ErrorButton>
            </ErrorContainerBorder>
        </ErrorContainer>
    );
};

const ErrorIconComponent: React.FC<ErrorIconProps> = ({ materialIcons }) => (
    <ErrorIcon className={'material-icons'}>{materialIcons}</ErrorIcon>
);

const ErrorContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorIcon = styled.span`
    color: white;
    margin-bottom: 20px;
    font-size: 4rem;
    margin-top: 10px;
`;

const ErrorButton = styled.button`
    border: none;
    outline: none;
    width: 40%;
    height: 20%;
    color: white;
    background-color: black;
    border-radius: 10px;
    padding: 5px 5px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const ErrorText = styled.p`
    color: white;
    font-size: 1.3rem;
    padding: 0 20px;
    margin-bottom: 20px;
`;

const ErrorContainerBorder = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #844a87;
`;

export default Error;
