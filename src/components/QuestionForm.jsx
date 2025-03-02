import React, { useEffect, useState } from "react";

const QuestionForm = ({onSubmit, studyId, question}) => {

    const [option, setOption] = useState("질문");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // userId 받아서 같이 저장

    useEffect(() => {
        console.log(question);
    
        if (question) { // 수정모드일 경우
            setOption(question.option);
            setTitle(question.title);
            setContent(question.content);
        }
    }, [question]);

    // 데이터 전송
    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmit({title, option, content, studyId});
    };

    const handleSelect = (e) => {
        setOption(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <select name="option" id="option" value={option} onChange={handleSelect}>
                <option value="질문">질문하기</option>
                <option value="자료공유">자료공유</option>
            </select>
            <input type="text" value={title} 
                onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" required />
            <textarea value={content} rows={18}
                onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">{question ? "수정" : "저장"}</button>
        </form>
    );
};

export default QuestionForm;