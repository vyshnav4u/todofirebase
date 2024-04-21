import React from "react";
import Checkbox from "react-custom-checkbox";
import { FiCheck } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { LiaCircleSolid } from "react-icons/lia";

const List = (props) => {
  const { items, removeItem, editItem, completeTask, updateIsFavorite } = props;
  return (
    <div className="task-lists">
      {items.map((item) => {
        const { id, title, desc, state, isFavorite } = item;
        const isCurrentTaskCompleted = state === "complete";
        return (
          <section
            style={{ borderBottom: isFavorite ? "1px solid #f7c1f2" : null }}
            key={id}
            className="task-item"
          >
            <div className="content-container">
              <p
                className="task-name"
                style={{
                  textDecoration: isCurrentTaskCompleted
                    ? "line-through"
                    : null,
                }}
              >
                {title}
              </p>
              <p
                className="task-item-desc"
                style={{
                  textDecoration: isCurrentTaskCompleted
                    ? "line-through"
                    : null,
                }}
              >
                {desc}
              </p>
            </div>
            <div className="action-btn-container">
              <div className="btn-container">
                <button
                  type="button"
                  className="complete-btn action-btn"
                  onClick={() => completeTask(id)}
                >
                  {isCurrentTaskCompleted ? (
                    <IoIosCheckmarkCircleOutline height={16} width={16} />
                  ) : (
                    <LiaCircleSolid height={16} width={16} />
                  )}
                </button>
                <button
                  type="button"
                  className="favorite-btn action-btn"
                  onClick={() => updateIsFavorite(id)}
                >
                  <CiHeart
                    color={isFavorite ? "red" : null}
                    height={16}
                    width={16}
                  />
                </button>
                <button
                  type="button"
                  className="delete-btn action-btn"
                  onClick={() => removeItem(id)}
                >
                  <GoTrash height={16} width={16} />
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default List;
