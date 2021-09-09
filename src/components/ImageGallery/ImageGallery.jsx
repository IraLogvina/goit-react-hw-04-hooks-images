import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      <ImageGalleryItem images={images} onClick={onClick} />
    </ul>
  );
}

export default ImageGallery;
