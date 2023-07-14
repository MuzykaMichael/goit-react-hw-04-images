import { fetchFromApi } from "api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { useEffect, useState } from "react";


export const App = () =>{

  const [query,setQuery] = useState('');
  const [page,setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(false);
  const [isEmpty,setIsEmpty] = useState(false);
  const [images,setImages] = useState([]);
  const [isVisible,setIsVisible] = useState(false);
  const [error,setError] = useState(null);
  const [modalImg,setModalImg] = useState('');


  useEffect(()=>{
    if (query === '') return;
    getImages(query,page)
  },[query,page])

  const getImages = async (query,page) => {
    if (!query){
      return alert("Type Something!!!")
    }
    setIsLoading(true)
    try{
      const {
        hits,
        totalHits,
      } = await fetchFromApi(query,page);
      if (totalHits === 0){
        setIsEmpty(true)
      }
      
      setImages(()=>[...images,...hits])
      setIsVisible(page<(totalHits/12))
      setIsEmpty(false)
    } catch(error){
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  const onHandleSubmit = (value) =>{
    setQuery(value);
    setImages([]);
    setPage(1);
  }

  const onLoadMore = () => {
    setPage((prevState)=>(
      prevState+1
    ))
  }

  const modalImgSet = (src,alt) =>{
    setModalImg({src,alt})
  }

  const modalImgReset = () =>{
    setModalImg('')
  }

    return (
      <>
        <Searchbar onSubmit={onHandleSubmit}/>
        {isEmpty && console.log("No images matching your query!")}
        {error && <p>Something went wrong - {error}</p>}
        {isLoading && <Loader/>}
        <ImageGallery
        images={images}
        setModalImage={modalImgSet}
        ></ImageGallery>
        {isVisible && <Button onClick={onLoadMore}>{isLoading? 'Loading...':'Load More'}</Button>}
        {modalImg && <Modal img={modalImg} onClose={modalImgReset}/>}
      </>
    )
}