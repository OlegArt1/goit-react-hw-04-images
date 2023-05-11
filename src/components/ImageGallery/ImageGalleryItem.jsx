import PropTypes from "prop-types";
import Css from "./ImageGallery.module.css";

export const ImageGalleryItem = ({ data, onClick }) =>
{
    return (
        <li className={Css.gallery__item}>
            {data.map(data =>
            {
                return (
                    <article className={Css.gallery__block}>
                        <img id={data.id} className={Css.gallery__image} src={data.webformatURL} title={data.user} alt={data.user} onClick={onClick}/>
                    </article>
                );
            })}
        </li>
    );
};
ImageGalleryItem.propTypes =
{
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};