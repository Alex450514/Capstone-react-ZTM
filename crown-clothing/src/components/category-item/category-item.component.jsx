// import { Component } from "react";
import { BackgroundImage, Body, DirectoryItemContainer } from './category-item.styles.jsx';

import { Link } from 'react-router-dom';

const CategoryItem = (props) => {
    
    const {id, title, imageUrl} = props.categoryV

    return (
        <DirectoryItemContainer>
            <BackgroundImage imageurl={imageUrl} />
            <Link key={title} to={`/shop/${title.toLowerCase()}`}>
                <Body>
                    <h2>{title}</h2>
                    <h3>Shop now</h3>
                </Body>
            </Link>
        </DirectoryItemContainer>
    )
}

export default CategoryItem;