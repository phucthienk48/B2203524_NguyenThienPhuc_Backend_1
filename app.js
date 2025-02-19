const express = require('express');
const cors = require('cors');

const ApiError = require('./app/api-error');

const app = express();

const contactsRouter = require('./app/routes/contact.route');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcom to contact book application. '});
});

app.use('/api/contacts', contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //Code ở đay dẽ được chạy khi không có route được định nghĩa nào
    //khớp với yêu cầu. Gọi next() để chuyển sang middleware xữ lý lỗi
    return next(new ApiError(404, 'Resource not found'));
})

app.use((err, req, res, next) => {
    //Middleware xuwr lys looix taapj trunng
    //Trong các đoạn code xử lý các route, gọi là next()
    //sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;