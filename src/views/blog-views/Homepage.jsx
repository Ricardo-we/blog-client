import { getAllPosts } from "../libs/PostsRequests";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogNavBar from "./BlogNavBar";
import notFoundedImage from './../../img/not-found-img.png';
import { orderTableByBiggerToLowerIds } from "../libs/OrderPostsTable";
import { Pagination, Carousel } from "react-bootstrap";
import '../../css/Homepage.css'
import carousel_img_1 from '../../img/carousel-home-1.jpg';
import carousel_img_2 from '../../img/carousel-home-2.jpg';
import carousel_img_3 from '../../img/carousel-home-3.jpg';

function Homepage() {
    const [allPosts, setAllPosts] = useState([{id: 0, image:'', heading: ''}])
    const [paginationItems, setPaginationItems] = useState({prev:1, actual: 2, next:3}); 
    const { pageNum } = useParams()
    const navigate = useNavigate();

    const getAllPostsHandler = async () => {
        let response;
        if(!pageNum) response = await getAllPosts('?page=1');
        else response = await getAllPosts(`?page=${pageNum}`);
        const { actual_page, next_page, previous_page, pages_amount } = response;
        
        if(pageNum >= pages_amount) navigate(pages_amount) 
        setPaginationItems({
            actual: actual_page, 
            prev: previous_page ?  parseInt(actual_page) - 1 : null, 
            next: next_page ? parseInt(actual_page) + 1 : null,
        })
        setAllPosts(orderTableByBiggerToLowerIds(response.data));
    } 

    useEffect(() => {
        getAllPostsHandler();
    }, [])

    return ( 
        <>
            <BlogNavBar/>

            {/* <div className="container-xxl"> */}
                <Carousel  style={{width: '100%', height: '400px'}}>
                    <Carousel.Item>
                        <img src={carousel_img_1} className="d-block w-100" style={{objectFit: 'cover', height: '400px'}} alt="" />
                        <Carousel.Caption className="text-white" >
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src={carousel_img_2} className="d-block w-100" style={{objectFit: 'cover', height: '400px'}} alt="" />
                        <Carousel.Caption className="text-white">
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src={carousel_img_3} className="d-block w-100" style={{objectFit: 'cover', height: '400px'}} alt="" />
                        <Carousel.Caption className="text-white">
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            {/* </div> */}

            <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                {allPosts.map(post => (
                    <Link 
                        key={post.id}
                        to={`/post-details/${post.id}`} 
                        className="post-link card" 
                        style={{width: "22rem", height: '19rem', margin: '2rem', textDecoration: 'none'}}
                    >
                        <img 
                            className="card-img-top" 
                            src={post.image?post.image: notFoundedImage}  
                            alt={post.heading}
                            style={{width: '100%', height: '12rem', objectFit: 'cover'}}
                        />
                        <div className="card-body text-black text-left" style={{width: '100%'}}>
                            <h5 style={{display: 'block', width: '100%'}}>{post.heading}</h5>
                            <strong className="post-date">{post.last_update}</strong>
                        </div>
                    </Link>
                )
                )}
            </div>
            <Pagination className="d-flex flex-row align-items-center justify-content-center">
                <Pagination.Prev href={`/${paginationItems.prev? paginationItems.prev : ''}`}></Pagination.Prev>
                <PaginationItem page_num={paginationItems.prev}/>
                <PaginationItem page_num={paginationItems.actual}/>
                <PaginationItem page_num={paginationItems.next}/>
                <Pagination.Next href={`/${paginationItems.next? paginationItems.next: ''}`}></Pagination.Next>
            </Pagination>
        </>
    );
}

const PaginationItem = ({ page_num }) => {
    if(page_num) return (
        <Pagination.Item href={`/${page_num}`}>
            {page_num}
        </Pagination.Item>
    )
    else return null
}

export default Homepage;