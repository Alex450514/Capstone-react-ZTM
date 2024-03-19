// import { Component } from "react";
import { BackgroundImage, Body, DirectoryItemContainer } from './category-item.styles.jsx';

import { useNavigate } from 'react-router-dom';

const CategoryItem = (props) => {
    
    const {id, title, imageUrl} = props.categoryV

    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop/${title.toLowerCase()}`);
    };

    return (
        <DirectoryItemContainer>
            <BackgroundImage imageurl={imageUrl} />
                <Body onClick={handleClick}>
                    <h2>{title}</h2>
                    <h3>Shop now</h3>
                </Body>
        </DirectoryItemContainer>
    )
}

export default CategoryItem;