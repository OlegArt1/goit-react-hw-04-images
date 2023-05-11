import { useState, useEffect } from 'react';
import { fetchApi } from './Api';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ButtonElement } from './Button/Button';
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

const API_KEY = "8761127-15c354fd40a23de8d36bfe25d";
const API_URL = "https://pixabay.com/api";
const number = 12;

export const App = () =>
{
    const [request, setSearch] = useState('');
    const [search, setInputValue] = useState('');
    const [images, setImages] = useState([]);
    const [perPage, setPerPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [srcUrl, setSrcUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
/*
    const [modal, setModal] = useState({
        showModal: false, largeImageURL: '',
    });
*/
    useEffect(() =>
    {
        window.addEventListener('keydown', (e)=>
        {
            if (e.code === 'Escape')
            {
                setShowModal(false);
            }
        });
        if (perPage === 0)
        {
            return;
        }
        else
        {
            fetchDownloadImages(request);
        }
        return () =>
        {
            window.removeEventListener('keydown', (e)=>
            {
                if (e.code === 'Escape')
                {
                    setShowModal(false);
                }
            });
        };
    }, [perPage, request]);
/*
    const onClickClear = () =>
    {
        setInputValue('');
    };
*/
    const handleChange = event =>
    {
        setInputValue(event.target.value);
    }
    const handleSubmit = evt =>
    {
        evt.preventDefault();

        if (request === search)
        {
            return;
        }
        setImages([]);

        setSearch(search);
        
        setPerPage(1);
    }
    const handleClickButtonAmount = () =>
    {
        setPerPage(perPage + 1);
    }
    const handleOpenModal = data =>
    {
        setShowModal(true);

        setSrcUrl(data.target.src);
        
        setAlt(data.target.alt);

     // setModal(prevState => ({ ...prevState, image }));

     // console.log("\nUrl - " + data.target.src + ";" + " Alt - ", data.target.alt);
    }
    const onCloseModal = () =>
    {
        setShowModal(false);

     // setModal(prevState => ({ ...prevState, showModal: !prevState.showModal })); // змінюємо значення showModal на протилежне
    }    
    const fetchDownloadImages = async searchQuery =>
    {
        setIsLoading(true);
        
        setError(null);
      
        try
        {
            const response = await fetchApi(API_URL, API_KEY, searchQuery, perPage);
            
            setImages(prevState => [...prevState, ...response.hits]);
            
            setLastPage(Math.ceil(response.totalHits / number));
            
         // response.totalHits === 0 && setNoResults(true);
        }
        catch (error)
        {
            setError(error);
        }
        finally
        {
            setIsLoading(false);
        }
    }
    return (
        <div className="App">
            <Searchbar onSubmit={handleSubmit} onChange={handleChange}/>
            <div>
                {error && <p className="alertStyle">Something went wrong: {error.message}</p>}
                {images.length !== 0 ?
                <div>
                    <ImageGallery data={images} onClick={handleOpenModal}/>
                    <ButtonElement onClick={handleClickButtonAmount}/>
                </div>
                :
                <h2 style={{ paddingTop: 70, paddingBottom: 70, height: (window.innerHeight / 6), textAlign: 'center', color: 'lightgray' }}>Pictures not found!</h2>}
            </div>
            {isLoading && <Loader />}
            {/*<ButtonElement label="Load more" handleLoadMore={handleLoadMore} />*/}
            {/*{perPage < lastPage && !isLoading ?
                (<ButtonElement onClick={handleLoadMore}/>)
                :
                (<div style={{ height: 40 }}></div>
            )}*/}
            {/*{modal.showModal && <Modal onClose={toggleModal} largeImageURL={modal.largeImageURL} />}*/}
            {showModal === true && <Modal onClick={onCloseModal} src={srcUrl} alt={alt}/>}
        </div>
    );
};