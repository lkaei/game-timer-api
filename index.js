const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

let gameTime = {
    time: 0,
    utels: 0,
    cherry: 0,
    timestamp: 0,
    lastUpdate: Date.now()
};

app.use(express.json());
app.use(cors());

app.get('/time', (req, res) => {
    res.json({
        ...gameTime,
        lastUpdate: Date.now()
    });
});

app.post('/time', (req, res) => {
    const { time, utels, cherry, timestamp } = req.body;
    
    if (typeof time !== 'number' || 
        typeof utels !== 'number' || 
        typeof cherry !== 'number' || 
        typeof timestamp !== 'number') {
        return res.status(400).json({
            error: 'Invalid data format. All fields must be numbers.',
            received: req.body
        });
    }

    gameTime = {
        time,
        utels,
        cherry,
        timestamp,
        lastUpdate: Date.now()
    };

    res.json({
        success: true,
        data: gameTime
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`API server running on port ${port}`);
});
