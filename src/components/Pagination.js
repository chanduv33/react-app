import React from 'react'

function Pagination(props) {
    console.log(props)
    const {postsPerPage, totalPosts, paginate, previousPage, nextPage} = props
    const pageNumbers = []

    // function callPaginate(num) {
    //     paginate(num)
    // }
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)

    return (
        <div>
            <ul className='pagination justify-content-center'>
                <li className='page-item'>
                    <a className='page-link'  onClick={() => previousPage()}>Previous</a>
                </li>
                {
                    pageNumbers.map(num => {
                        return <li className='page-item' key={num}>
                            <a  className='page-link'  onClick={() => paginate(num)}>{num}</a>
                        </li>
                    })
                }
                <li className='page-item'>
                    <a className='page-link'  onClick={() => nextPage()}>Next</a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
