import styled from '@emotion/styled';

interface Item {
    material_icon: string;
    value: any;
    title: string;
}

const DescriptionItem = (props: Item) => {
    return (
        <ItemContainer className="cloud-cover">
            <MaterialIcons className="material-icons">
                {props.material_icon}
            </MaterialIcons>
            <Description className="description">
                <CloudCoverValue>
                    <b>{props.value}</b>
                </CloudCoverValue>
                <CloudCoverTitle>{props.title}</CloudCoverTitle>
            </Description>
        </ItemContainer>
    );
};
const CloudCoverValue = styled.div``;
const CloudCoverTitle = styled.div``;

const ItemContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`;
const MaterialIcons = styled.span`
    margin: 7%;
`;
const Description = styled.div`
    font-size: 0.9rem;
    font-family: 'Hind Siliguri', sans-serif;
`;

export default DescriptionItem;
