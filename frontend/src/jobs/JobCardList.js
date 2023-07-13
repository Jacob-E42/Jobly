import React from "react";
import JobCard from "./JobCard";
import { Container, Row, Col } from "reactstrap";
import "./Jobs.css";

const JobCardList = ({ jobs }) => {
	return (
		<Container className="JobCardList justify-content-center">
			<Row>
				{jobs &&
					jobs.map(job => (
						<Col sm={12}>
							<JobCard
								key={job.id}
								job={job}
							/>
						</Col>
					))}
			</Row>
		</Container>
	);
};

export default JobCardList;
