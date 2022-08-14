import styled from '@emotion/styled';

interface Item {
    material_icon: string;
    value: any;
    title: string;
}

const DescriptionItem = (props: Item) => {
    return (
        <ItemContainer>
            <MaterialIconsComponent material_icon={props.material_icon} />
            <Description>
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

interface MaterialIconsProps {
    material_icon: string;
}

const MaterialIconsComponent: React.FC<MaterialIconsProps> = ({
    material_icon,
}) => (
    <MaterialIcons className={'material-icons'}>{material_icon}</MaterialIcons>
);

const MaterialIcons = styled.span`
    margin: 7%;
`;
const Description = styled.div`
    font-size: 0.9rem;
    font-family: 'Hind Siliguri', sans-serif;
`;

export default DescriptionItem;
