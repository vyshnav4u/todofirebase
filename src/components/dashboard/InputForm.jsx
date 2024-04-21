import React from "react";

const InputForm = (props) => {
  const { desc, title, setDesc, setTitle, handleSubmit } = props;
  return (
    <div className="add-item-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="todo-header">
          <h2>TODO</h2>
          <p className="todo-info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            ducimus repudiandae veniam esse magni quae. Nobis tempora ipsum
            exercitationem sunt, ratione deserunt unde nam! Neque quibusdam
            tenetur ratione earum illum Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Minima ducimus repudiandae veniam esse magni quae.
            Nobis tempora ipsum exercitationem sunt, ratione deserunt unde nam!
            Neque quibusdam tenetur ratione earum illum
          </p>
        </div>
        <div className="form-control">
          <input
            type="text"
            className="title add-todo-txt"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="desc add-todo-txt"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
