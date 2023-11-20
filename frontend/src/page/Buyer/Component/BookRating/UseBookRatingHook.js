import {useEffect, useState} from "react";
import {getProductRating} from "../../../../Service/Product/Rating";

export const UseBookRatingHook = (bookId) => {
    const [ratings, setRatings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const handleChangePage = (e) => {
        console.log(e.selected)
        setCurrentPage(e.selected);
    };

    const fetchBookRating = () => {
        getProductRating(bookId,currentPage+1)
            .then((res) => {
                if (res.data.success) {
                    setRatings(res.data.data.data);
                    setPageCount(res.data.data.last_page);
                    const totalRating = res.data.data.data.reduce((sum, rating) => sum + rating.rating, 0);
                    setAverageRating(totalRating / res.data.data.data.length);
                } else {
                    console.log("Failed to fetch ratings:", res.data.message);
                }
            })
            .catch((err) => {
                console.error("Error fetching ratings:", err);
            });
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit',
            minute: '2-digit', };
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        fetchBookRating()
    }, [bookId, currentPage]);
    return {ratings,currentPage,averageRating,pageCount,handleChangePage,formatDate};
}