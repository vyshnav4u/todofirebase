import React, { useEffect, useState } from "react";
import List from "./List";
import InputForm from "./InputForm";
import ListHeader from "./ListHeader";
import { IoIosLogOut } from "react-icons/io";

// const getLocalStorage = () => {
//   let list = localStorage.getItem('list')
//   if(list){
//     return JSON.parse(localStorage.getItem('list'))
//   }
//   else {
//     return []
//   }
// }

let uniqueId = 1;

function Main(props) {
  const { signOut } = props;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskList, setTaskList] = useState([
    {
      id: 6,
      title: "task1",
      desc: "complete project within the time frame",
      state: "new",
      isFavorite: false,
    },
    {
      id: 7,
      title: "task2",
      desc: "improve the design of the project to meet the client expectation",
      state: "new",
      isFavorite: false,
    },
  ]);

  const [searchItem, setSearchItem] = useState("");
  const [filterBy, setFilterBy] = useState({
    value: "all",
    label: "All",
  });
  const [validTaskList, setValidTaskList] = useState([]);
  console.log("filterBy", filterBy);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uniqueId++,
      title: title,
      desc,
      state: "new",
      isFavorite: false,
    };
    setTaskList([...taskList, newItem]);
    setTitle("");
    setDesc("");
  };
  console.log("list", taskList);

  const removeItem = (id) => {
    const newTaskList = taskList.filter((item) => item.id !== id);
    setTaskList(newTaskList);
  };

  const completeTask = (id) => {
    const currentIndex = taskList.findIndex((item) => item.id === id);
    const currentTask = taskList[currentIndex];
    currentTask.state = currentTask.state === "new" ? "complete" : "new";
    setTaskList([...taskList]);
  };

  const updateIsFavorite = (id) => {
    const currentIndex = taskList.findIndex((item) => item.id === id);
    taskList[currentIndex].isFavorite = !taskList[currentIndex].isFavorite;
    setTaskList([...taskList]);
  };

  useEffect(() => {
    const validTask = taskList.filter((task) => {
      return task.title.toLowerCase().includes(searchItem.toLowerCase());
    });

    let filteredItem = [];
    switch (filterBy.value) {
      case "new":
        filteredItem = validTask.filter((_task) => _task.state === "new");
        break;
      case "complete":
        filteredItem = validTask.filter((_task) => _task.state === "complete");
        break;
      case "isFavorite":
        filteredItem = validTask.filter((_task) => _task.isFavorite);
        break;
      default:
        filteredItem = validTask;
    }

    setValidTaskList(filteredItem);
  }, [searchItem, taskList, filterBy]);

  return (
    <section className="todo-container">
      <InputForm
        desc={desc}
        title={title}
        setDesc={setDesc}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
      />
      <div className="task-lists-container">
        <div className="logout-wrap">
          <IoIosLogOut fontSize={20} onClick={signOut} />
        </div>
        {taskList.length > 0 && (
          <>
            <ListHeader
              searchItem={searchItem}
              setSearchItem={setSearchItem}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
            <div className="list-container">
              <List
                items={validTaskList}
                removeItem={removeItem}
                completeTask={completeTask}
                updateIsFavorite={updateIsFavorite}
                // editItem = {editItem}
              />
              {/* <button className="clear-btn" onClick={clearList}>clear items</button> */}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Main;
