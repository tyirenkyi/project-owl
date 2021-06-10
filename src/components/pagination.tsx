import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../assets/css/pagination.css"
import { PaginationModel } from "../models/models";

interface PaginationProps{
  data: PaginationModel,
  handlePreviousBtnPress: Function,
  handleNextBtnPress: Function
}

const Pagination = (props: PaginationProps) => {

  return (
    <div className="pagination-container">
      {props.data.pageNumber > 1 && (
        <button 
          className="prev-page-btn"
          onClick={() => props.handlePreviousBtnPress(props.data.previousPage!)}
        >
          <FaChevronLeft /> Previous Page
        </button>
      )}
      <button
        className='active-page-btn'
      >
        {props.data.pageNumber}
      </button>
      <p className="page-count">of {props.data.totalPages}</p>
      {props.data.nextPage && (
        <button
          className="next-page-btn"
          onClick={() => props.handleNextBtnPress(props.data.nextPage!)}
        >
          Next Page<FaChevronRight />
        </button>
      )}
    </div>
  )
}

export default Pagination;