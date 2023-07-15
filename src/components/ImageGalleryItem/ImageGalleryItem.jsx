import propTypes from 'prop-types'
import { GalleryItem, GalleryItemImage, ModalButton } from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({alt,src,largeImg,setModalImage}) =>{
    
    const clickHandler = (src,alt) =>{
        setModalImage(src,alt)
    };

        return(
            <GalleryItem>
                <ModalButton onClick={()=>clickHandler(largeImg,alt)} type='button'>
                    <GalleryItemImage src={src} alt={alt}/>
                </ModalButton>
            </GalleryItem>

        );
}


ImageGalleryItem.propTypes = {
    alt:propTypes.string.isRequired,
    src:propTypes.string.isRequired,
    largeImg:propTypes.string.isRequired,
    setModalImage:propTypes.func.isRequired,

}