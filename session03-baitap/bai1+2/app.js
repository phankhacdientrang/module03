const express = require('express');
const app = express();
const port = 3000;

// Route cho homepage
app.get('/', (req, res) => {
    res.send('This is homepage');
});

// Route cho trang ask
app.get('/ask', (req, res) => {
    res.send('This is asking page');
});

// Route cho trang question detail
app.get('/question-detail/:id', (req, res) => {
    res.send('This is a question detail page');
});

// Route cho các đường dẫn khác
app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND');
});

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
