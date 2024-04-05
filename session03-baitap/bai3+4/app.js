const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sử dụng body-parser để phân tích dữ liệu từ req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware checkExist
const checkExist = (req, res, next) => {
    const questionId = req.params.id;
    const newQuestion = req.body;

    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            const questions = JSON.parse(data);
            const existingQuestionById = questions.find(q => q.id === questionId);
            const existingQuestionByContent = questions.find(q => q.content === newQuestion.content);

            if (existingQuestionById) {
                res.status(200).json({ message: 'Question already exists' });
            } else if (existingQuestionByContent) {
                res.status(200).json({ message: 'Question already exists' });
            } else {
                next();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

// Endpoint GET để lấy danh sách câu hỏi
app.get('/api/v1/questions', (req, res) => {
    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            const questions = JSON.parse(data);
            res.status(200).json(questions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Endpoint GET để lấy thông tin câu hỏi theo id
app.get('/api/v1/questions/:id', checkExist, (req, res) => {
    const questionId = req.params.id;

    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            const questions = JSON.parse(data);
            const question = questions.find(q => q.id === questionId);
            
            if (!question) {
                res.status(404).json({ error: 'Question not found' });
                return;
            }

            res.status(200).json(question);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Endpoint POST để thêm mới câu hỏi
app.post('/api/v1/questions', checkExist, (req, res) => {
    const newQuestion = req.body;

    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            const questions = JSON.parse(data);
            questions.push(newQuestion);

            fs.writeFile('questions.json', JSON.stringify(questions), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                res.status(201).json({ message: 'Create successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Endpoint PUT để cập nhật thông tin câu hỏi
app.put('/api/v1/questions/:id', checkExist, (req, res) => {
    const questionId = req.params.id;
    const updatedQuestion = req.body;

    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            const questions = JSON.parse(data);
            const existingQuestionIndex = questions.findIndex(q => q.id === questionId);

            if (existingQuestionIndex === -1) {
                res.status(404).json({ message: 'Question not found' });
                return;
            }

            questions[existingQuestionIndex] = { ...questions[existingQuestionIndex], ...updatedQuestion };

            fs.writeFile('questions.json', JSON.stringify(questions), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                res.status(200).json({ message: 'Update successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Endpoint DELETE để xóa câu hỏi
app.delete('/api/v1/questions/:id', checkExist, (req, res) => {
    const questionId = req.params.id;

    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        try {
            let questions = JSON.parse(data);
            const existingQuestionIndex = questions.findIndex(q => q.id === questionId);

            if (existingQuestionIndex === -1) {
                res.status(404).json({ message: 'Question not found' });
                return;
            }

            questions.splice(existingQuestionIndex, 1);

            fs.writeFile('questions.json', JSON.stringify(questions), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                res.status(200).json({ message: 'Delete successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Khởi chạy máy chủ
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
