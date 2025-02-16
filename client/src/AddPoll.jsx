import React, { useState } from 'react';
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPoll } from './app/features/pollsSlice';

const AddPoll = () => {

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const dispatch = useDispatch()


    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredOptions = options.map(opt => opt.trim()).filter(opt => opt);
        if (!question.trim() || filteredOptions.length < 2) {
            alert("Please provide a question and at least two options.");
            return;
        }
        console.log("qus : ", question)
        console.log("options : ", options)

        try {

            dispatch(addNewPoll({ question, options }))
            setQuestion("");
            setOptions(["", ""]);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div>
            <Header />
            <main className='container'>
                <h2>Add a new Poll</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="question" className="form-label">Question</label>
                        <input
                            type="text"
                            className="form-control"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    {options.map((option, index) => (
                        <div className="mb-3" key={index}>
                            <label className="form-label">Option {index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary mb-3"
                        onClick={addOption}
                    >
                        Add Option
                    </button>
                    <br />
                    <button type="submit" className="btn btn-primary">Create Poll</button>
                </form>

            </main>
        </div>
    )
}

export default AddPoll
