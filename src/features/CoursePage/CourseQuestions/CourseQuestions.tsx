import React, { useState } from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import InputEditor from "@/components/InputEditor/InputEditor";
import { User } from "@/store/slices/auth.slice";
import QuestionDetail from "../QuestionsList/QuestionDetail/QuestionDetail";
import QuestionList from "../QuestionsList/QuestionsList";
import { Question } from "@/types/Question";
import {
	useAddQuestionMutation,
	useGetQuestionsQuery,
	useDeleteQuestionMutation,
	useUpdateQuestionMutation,
} from "@/services/questions.service";
import "./CourseQuestions.css";

interface CourseQuestionsProps {
	courseId: string;
	user: User | null;
}

const CourseQuestions: React.FC<CourseQuestionsProps> = ({
	courseId,
	user,
}) => {
	const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
		null
	);

	const [newQuestionText, setNewQuestionText] = useState<string>("");
	const { data: questionsData, refetch } = useGetQuestionsQuery({ courseId });
	const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
	const [deleteQuestion] = useDeleteQuestionMutation();
	const [updateQuestion] = useUpdateQuestionMutation();

	const handleQuestionClick = (id: number) => {
		setSelectedQuestionId(id);
	};

	const handleSubmitQuestion = async (newQuestionText: string) => {
		if (!user) {
			alert("You must be logged in to ask a question.");
			return;
		}

		try {
			await addQuestion({
				question: { text: newQuestionText },
				userId: user.id,
				courseId: parseInt(courseId),
			}).unwrap();
			setNewQuestionText("");
			refetch(); // Refresh questions list
		} catch (error) {
			console.error("Failed to add question:", error);
		}
	};

	return (
		<div className="course-questions">
			{!selectedQuestionId ? (
				<div className="course-questions__questions-list">
					<ContentHeader title="All questions in this course" />
					<div>
						<InputEditor
							onSubmit={handleSubmitQuestion}
							isLoading={false}
							placeholder="Write your question here..."
						/>
					</div>
					<div className="course-questions__content">
						<QuestionList
							onQuestionClick={handleQuestionClick}
							questions={questionsData?.data || []}
						/>
						{/* <p className="course-subtitle">Other trainees Questions</p>
							<Button variant="transparent" size="full" className="load-more-btn">
								See More Questions
							</Button> */}
					</div>
				</div>
			) : (
				<>
					<div className="back-to-questions-btn-container">
						<button onClick={() => setSelectedQuestionId(null)}>
							Back to All Questions
						</button>
					</div>
					<QuestionDetail
						question={
							questionsData?.data?.find(
								(q: any) => q.id === selectedQuestionId
							) as Question
						}
						userId={user?.id}
						questionId={selectedQuestionId}
						showReplies={true}
					/>
				</>
			)}
		</div>
	);
};

export default CourseQuestions;
