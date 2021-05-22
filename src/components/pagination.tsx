import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../assets/css/pagination.css"

const Pagination = () => {
  return (
    <div className="pagination-container">
      <button 
        className="prev-page-btn"
      >
        <FaChevronLeft /> Previous Page
      </button>
      <button
        className='active-page-btn'
      >
        1
      </button>
      <p className="page-count">of 8</p>
      <button
        className="next-page-btn"
      >
        Next Page<FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination;