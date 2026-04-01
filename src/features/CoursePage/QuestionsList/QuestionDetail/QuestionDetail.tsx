import React from "react";
import { Question } from "@/types/Question";
import styles from "./QuestionDetail.module.css";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { BiSolidMessage as ReplyIcon } from "react-icons/bi";
import InputEditor from "@/components/InputEditor/InputEditor";
import {
	useGetRepliesQuery,
	useAddReplyMutation,
	useDeleteReplyMutation,
} from "@/services/questions.service";
import { formatTimeAgo } from "@/utils";

interface QuestionDetailProps {
	question: Question;
	userId?: number;
	questionId?: string | number;
	showReplies?: boolean;
	onShowReplies?: (id: any) => void;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
	question,
	questionId,
	userId,
	onShowReplies,
	showReplies = false,
}) => {
	const { data: repliesData, isLoading: isRepliesLoading } = useGetRepliesQuery(
		{ questionId },
		{ skip: !questionId }
	);
	const [addReply] = useAddReplyMutation();
	const [deleteReply] = useDeleteReplyMutation();

	const handleAddReply = async (reply: string) => {
		try {
			await addReply({
				replyData: { text: reply, userId },
				questionId,
			}).unwrap();
		} catch (error) {
			console.error("Failed to add reply:", error);
		}
	};

	const handleDeleteReply = async (replyId: number) => {
		try {
			await deleteReply(replyId).unwrap();
		} catch (error) {
			console.error("Failed to delete reply:", error);
		}
	};

	return (
		<div className={styles["question-detail"]}>
			{/* Question */}
			<div className={styles["question-detail__question"]}>
				<UserAvatarCard
					user={question.user}
					age={formatTimeAgo(question.createdAt)}
				/>
				<div className={styles["question__text"]}>{question.text}</div>
			</div>
			{/* Replies */}
			{showReplies && !isRepliesLoading ? (
				<div className={styles["question-detail__replies-list"]}>
					{repliesData?.data?.map((reply: any) => {
						return (
							<div className={styles["question__reply"]}>
								<UserAvatarCard
									user={reply.user}
									age={formatTimeAgo(reply?.createdAt)}
								/>
								<div className={styles["question__text"]}>{reply.text}</div>
							</div>
						);
					})}
				</div>
			) : null}
			{/* Reply input*/}
			{showReplies ? (
				<div className={styles["question-detail__reply-input"]}>
					<p>Write your response</p>
					<InputEditor
						placeholder="Write your response"
						onSubmit={handleAddReply}
						onCancel={() => null}
					/>
				</div>
			) : null}
			{/* Footer */}
			{!showReplies ? (
				<div className={styles["question-detail__footer"]}>
					<span> {question?.repliesCount || 0}</span>
					<ReplyIcon
						size={18}
						onClick={() => {
							if (onShowReplies) onShowReplies(question.id);
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default QuestionDetail;

