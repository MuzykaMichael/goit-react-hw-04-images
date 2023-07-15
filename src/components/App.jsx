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
    if (!query){
      alert("Type Something!!!")
    } else {setIsLoading(true)
      fetchFromApi(query,page)
      .then(({hits,totalHits})=>{
        if (totalHits === 0){
          setIsEmpty(true)
        }
        setImages((imagePrevious)=>[...imagePrevious,...hits])
        setIsVisible(page<(totalHits/12))
        setIsEmpty(false)
      })
      .catch(error=>{
        setError(error.message)
      })}
    
  },[query,page])

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