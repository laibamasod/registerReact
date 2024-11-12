import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

import './RegisterForm.css';
const RegisterForm = () => {
    const initialState = {
        username: '',
        email: '',
        password: '',
        gender: '',
        comments: '',
    }
    const [formData, setFormData] = useState(initialState)
    const handleChange = (e) => {
        // console.log(e.target)
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        })
        )
    }
    const submitForm = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await addDoc(collection(db, 'users'), {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              gender: formData.gender,
              comments: formData.comments,
            });
            alert('User registered successfully');
            setFormData(initialState)
          } catch (e) {
            console.error('Error adding document: ', e);
          }
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>

                    <legend>Gender:</legend>
                    <label htmlFor="male">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value='Male'
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label htmlFor="female">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value='Female'
                            onChange={handleChange}
                        />
                        Female
                    </label>
                    <label htmlFor="other">
                        <input
                            type="radio"
                            id="other"
                            name="gender"
                            value='Other'
                            onChange={handleChange}
                        />
                        Other
                    </label>
                </div>
                <div>
                    <label htmlFor='comments'>Comments:</label><br />
                    <textarea
                    className="textarea-small" 
                        name='comments'
                        id='comments'
                        onChange={handleChange}
                        value={formData.comments}
                    ></textarea>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
