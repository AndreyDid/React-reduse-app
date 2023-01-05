import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {getError} from './store/errors'
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus, taskCreate
} from './store/task'

const store = configureStore()

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    const changeTitle = taskId => {
        dispatch(titleChanged(taskId))
    }
    const deleteTitle = taskId => {
        dispatch(taskDeleted(taskId))
    }
    const createTask = () => {
        dispatch(taskCreate())
    }
    if (isLoading === true) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <>
            <h1>App</h1>
            <button onClick={() => createTask()}>
                Create Task
            </button>
            <ul>
                {state.map(el => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>Completed: {`${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Compete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change Title
                        </button>
                        <button onClick={() => deleteTitle(el.id)}>
                            Delete
                        </button>
                        <hr/>
                    </li>
                ))}
            </ul>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)
