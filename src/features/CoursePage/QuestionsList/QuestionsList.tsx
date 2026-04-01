import React, { useState } from "react";
import { Question } from "@/types/Question";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import styles from "./QuestionsList.module.css";

interface QuestionListProps {
	onQuestionClick: (id: number) => void;
	questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({
	onQuestionClick,
	questions,
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className={styles["questions-list"]}>
			{questions.map((question) => (
				<QuestionDetail
					question={question}
					showReplies={false}
					onShowReplies={onQuestionClick}
				/>
			))}
			{
				loading ? <p>Loading...</p> : null
				// <button onClick={loadMoreQuestions}>Load More</button>
			}
		</div>
	);
};

export default QuestionList;

