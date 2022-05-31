import React, { useState } from 'react'

function Categories() {
    const [inputCategory, setInputCategory] = useState("")
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