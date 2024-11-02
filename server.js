// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// 设置 Multer 存储配置，将文件保存到 images 文件夹
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images')); // 设置存储目录为 images 文件夹
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname)); // 使用时间戳和随机数作为文件名
    }
});

const upload = multer({ storage: storage });

// 处理图片上传的 API 路由
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        // 返回图片的 URL（假设服务器地址为 http://localhost:3000）
        const imageUrl = `http://localhost:3000/images/${req.file.filename}`;
        res.json({ url: imageUrl });
    } else {
        res.status(400).json({ error: '图片上传失败' });
    }
});

// 静态文件托管，使 images 文件夹中的文件可以通过 URL 访问
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
    console.log(`服务器已启动，访问地址：http://localhost:${PORT}`);
});
