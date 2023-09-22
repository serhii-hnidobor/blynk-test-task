import CommentCard from "./components/Comment-card";
import { AddCommentPayload, Comment } from "../../common/types";
import { Dispatch, SetStateAction, useState } from "react";

import "./styles.css";
import getHandleFormDataChange from "../../utils/form-date-change";
import getHandleFormSubmit from "../../utils/form-submit";

interface Props {
  comments: Comment[];
  itemId: string;
  handleAddComment: (newComment: AddCommentPayload) => void;
}

function getHandleResetNewComment(
  setNewComment: Dispatch<SetStateAction<AddCommentPayload>>,
) {
  return () => setNewComment((prev) => ({ ...prev, text: "" }));
}

function Comments({ comments, itemId, handleAddComment }: Props) {
  const [newComment, setNewComment] = useState<AddCommentPayload>({
    color: "#000000",
    text: "",
  });

  const newCommentChange =
    getHandleFormDataChange<AddCommentPayload>(setNewComment);
  const handleNewCommentReset = getHandleResetNewComment(setNewComment);
  const handleSubmit = getHandleFormSubmit(
    newComment,
    handleAddComment,
    handleNewCommentReset,
  );

  return (
    <div className="comments">
      <h2 className="comments__heading">comments #{itemId}</h2>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      <form className="comments__add-form" onSubmit={handleSubmit}>
        <input
          type="color"
          name="color"
          value={newComment.color}
          className="form-control comments-add-form__color-input"
          onChange={newCommentChange}
        />
        <textarea
          className="comments-add-form__textarea"
          name="text"
          value={newComment.text}
          onChange={newCommentChange}
          required
          placeholder="Type your comment here..."
        />
        <button className="btn btn-primary comments-add-form__submit-button">
          add new
        </button>
      </form>
    </div>
  );
}

export default Comments;
