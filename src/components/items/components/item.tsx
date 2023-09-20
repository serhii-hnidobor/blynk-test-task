import classConcat from "../../../utils/class-concat";
import "./styles.css";

interface Props {
  isActive: boolean;
  id: string;
  text: string;
  handleSetActive: (id: string) => void;
  handleDelete: (id: string) => void;
  commentCount: number;
}

function Item({
  isActive,
  id,
  text,
  handleSetActive,
  handleDelete,
  commentCount,
}: Props) {
  return (
    <li
      className={classConcat({
        item: true,
        "list-group-item": true,
        "item--active": isActive,
      })}
      onClick={() => handleSetActive(id)}
    >
      <span className="item__text-content">{text}</span>
      <span className="badge badge-info badge-pil item__badge">
        {commentCount}
      </span>
      <button
        className="btn btn-outline-danger"
        onClick={(event) => {
          event.stopPropagation();
          handleDelete(id);
        }}
      >
        delete
      </button>
    </li>
  );
}

export default Item;
