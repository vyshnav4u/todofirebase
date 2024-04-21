import React, { useEffect, useState } from 'react';
import List from './List';
import InputForm from './InputForm';
import ListHeader from './ListHeader';
import Logout from './Logout';
import { db, userCollectionref } from '../../firebase';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';

let uniqueId = 1;

function Main(props) {
	const { user } = UserAuth();
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [taskList, setTaskList] = useState([]);
	const [searchItem, setSearchItem] = useState('');
	const [filterBy, setFilterBy] = useState({
		value: 'all',
		label: 'All',
	});
	const [validTaskList, setValidTaskList] = useState([]);
	const [fetchFlag, setFetchFlag] = useState(true);
	useEffect(() => {
		const getUser = async () => {
			const data = await getDocs(userCollectionref);
			const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setTaskList(tasks.filter((task) => task.emailId === user.email));
		};
		getUser();
	}, [fetchFlag]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newItem = {
			title: title,
			desc,
			state: 'new',
			isFavorite: false,
			emailId: user.email,
		};
		await addDoc(userCollectionref, newItem);
		setFetchFlag(!fetchFlag);
		setTitle('');
		setDesc('');
	};

	const removeItem = async (id) => {
		const currentDocument = doc(db, 'users', id);
		await deleteDoc(currentDocument);
		setFetchFlag(!fetchFlag);
	};

	const completeTask = async (id) => {
		const currentIndex = taskList.findIndex((item) => item.id === id);
		const currentTask = taskList[currentIndex];
		const newState = currentTask.state === 'new' ? 'complete' : 'new';
		const currentDocument = doc(db, 'users', id);
		await updateDoc(currentDocument, { state: newState });
		setFetchFlag(!fetchFlag);
	};

	const updateIsFavorite = async (id) => {
		const currentIndex = taskList.findIndex((item) => item.id === id);
		const newIsFav = !taskList[currentIndex].isFavorite;
		const currentDocument = doc(db, 'users', id);
		await updateDoc(currentDocument, { isFavorite: newIsFav });
		setFetchFlag(!fetchFlag);
	};

	useEffect(() => {
		const validTask = taskList.filter((task) => {
			return task.title.toLowerCase().includes(searchItem.toLowerCase());
		});

		let filteredItem = [];
		switch (filterBy.value) {
			case 'new':
				filteredItem = validTask.filter((_task) => _task.state === 'new');
				break;
			case 'complete':
				filteredItem = validTask.filter((_task) => _task.state === 'complete');
				break;
			case 'isFavorite':
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
				<Logout />
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
							/>
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default Main;
