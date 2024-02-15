import './categories.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => {

    return (
        <div className="all-category-container">
            {categories.map((item) => {
                return (
                // title, id, imageUrl
                <CategoryItem key={item.id} categoryV={item} />
                )
            })}
        </div>
    )
}

export default Directory;