import React, { useState, useEffect } from 'react';
//bootstrap
import Pagination from 'react-bootstrap/Pagination';

function PaginationBar({ switchPage }) {
	const [ currentPage, setCurrentPage ] = useState(1);
	const pageNumber = 10;
	const setFirst = () => setCurrentPage(1);
	const setLast = () => setCurrentPage(pageNumber);
	const setPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
	const setNext = () => currentPage < pageNumber && setCurrentPage(currentPage + 1);

	useEffect(
		() => {
			switchPage(currentPage);
		},
		[ currentPage ]
	);

	return (
		<div className="row justify-content-center">
			<Pagination>
				<Pagination.First onClick={setFirst} />
				<Pagination.Prev onClick={setPrev} />
				{[ ...Array(pageNumber).keys() ].map((key) => {
					return (
						<Pagination.Item
							key={key + 1}
							active={key + 1 === currentPage}
							onClick={() => {
								setCurrentPage(key + 1);
							}}
						>
							{key + 1}
						</Pagination.Item>
					);
				})}
				<Pagination.Next onClick={setNext} />
				<Pagination.Last onClick={setLast} />
			</Pagination>
		</div>
	);
}

export default PaginationBar;
