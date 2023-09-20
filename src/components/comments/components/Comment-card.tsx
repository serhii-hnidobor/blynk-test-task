import { Comment } from "../../../common/types";

import "./styles.css";

interface Props {
  comment: Comment;
}

function CommentCard({ comment }: Props) {
  const { color, text } = comment;

  return (
    <div className="comment-card">
      <div className="comment-card__color" style={{ backgroundColor: color }} />
      <div className="comment-card__body">
        <span className="comment-card-body__text-content">{text}</span>
      </div>
    </div>
  );
}

export default CommentCard;
