import React from 'react';
import { useState, useEffect } from 'react';
//import index from '../../service/authService/index';
//import authHeader from '../../service/authService/authHeader';
import authService from '../../service/authService';

//const TODO_URL = '/todo';

function Todos() {
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("done");
    const [todoList, SetTodoList] = useState([]);

    useEffect(() => {
        getTodoList();
    }, [])

    const getTodoList = async () => {
        authService.getTodoList().then(
            (response) => {
                console.log(response.data);
                SetTodoList(response.data);
            }, 
            (error) => {
                console.log(error);
            }
        )
        // try {
        //     const response = await index.get(TODO_URL, {
        //         headers: {authHeader}
        //     });
        //     console.log(response.data);
        //     SetTodoList(response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div className='todos-container'>
            <div className='buttons'>
                <button className='todos-button'>Todos</button>
                <button className='categories-button'></button>
            </div>
            <div className="todo-header">
                <input 
                    type="text" 
                    placeholder="enter todo"
                    value={input}
                    onChange={(e)=>{setInput(e.target.value)}}
                >
                </input>
                <select onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="education">Eğitim</option>
                    <option value="sport">Spor</option>
                </select>
                <select onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value="done">Yapıldı</option>
                    <option value="doing">Yapılıyor</option>
                    <option value="will-do">Yapılacak</option>
                </select>
                <button type="button">Add</button>
            </div>
            <div className="todos-list">
                <ul>
                    {todoList.map((index, i) => 
                        console.log(index.title)
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Todos