import { ImageList } from './ImageGallery.styled'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types'

export const ImageGallery =({images,setModalImage})=>{

    
            return(
                <>
                    <ImageList>
                        {images.map(({webformatURL,tags,largeImageURL},id)=>(
                            <ImageGalleryItem
                            key={id}
                            largeImg={largeImageURL}
                            src={webformatURL}
                            alt={tags}
                            setModalImage={setModalImage}
                            />
                        ))}
                    </ImageList>
                </>
            );
}

ImageGallery.propTypes = {
    images:propTypes.arrayOf(propTypes.object.isRequired).isRequired,
    setModalImage:propTypes.func.isRequired,
}