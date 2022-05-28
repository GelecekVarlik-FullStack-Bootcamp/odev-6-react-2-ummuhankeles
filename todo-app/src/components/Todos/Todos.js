import React, { useEffect, useState } from 'react'

function Todos() {
    const [input, setInput] = useState("")
    const [category, setCategory] = useState("all")
    const [status, setStatus] = useState("done")

    useEffect(()=>{
        getTodoList()
    })
    // 403 forbidden hatası ???
    const getTodoList = async () => {
        fetch("http://localhost:81/todo").then(async response => {
            try {
                const data = await response.json()
                console.log('response data?', data)
            } catch(error) {
                console.log('Error happened here!')
                console.error(error)
            }
        })
    }

    return (
        <div className='todos-container'>
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
                    <option value="will do">Tapılacak</option>
                </select>
                <button>Add</button>
            </div>
            <div className="todos-list">
                <ul>
                    <li>ders çalış</li>
                    <li>yemek ye</li>
                </ul>
            </div>
        </div>
    )
}

export default Todos;