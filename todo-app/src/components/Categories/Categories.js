import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Categories() {
    const [inputCategory, setInputCategory] = useState("")

    useEffect(()=>{
        getCategoryList()
    })
    // 403 forbidden hatası ???
    const getCategoryList = async () => {
        axios.get('http://localhost:81/category')
        .then(res=>console.log(res))
    }

    return (
        <div className="category-container">
            <input 
                    type="text" 
                    placeholder="kategori giriniz.."
                    value={inputCategory}
                    onChange={(e)=>{setInputCategory(e.target.value)}}
                >
                </input>
                <button>Ekle</button>
            <div className="category-list">
                <ul>
                    <li>eğitim</li>
                    <li>spor</li>
                </ul>
            </div>
        </div>
    )
}

export default Categories;