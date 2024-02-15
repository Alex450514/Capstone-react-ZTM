// import { Component } from "react";
import './category-item.styles.scss';

const CategoryItem = (props) => {
    
    const {id, title, imageUrl} = props.categoryV

    return (
        <div key={id} className="category-container">
            <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="category-title">
            <h3>Shop now</h3>
            <h3>{title}</h3>
            </div>
        </div>
    )
}

export default CategoryItem;