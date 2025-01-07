  const express = require('express');
  const cors = require('cors');
  const app = express();
  const port = process.env.PORT || 3000;
  
  let gameTime = {
      value: 0,
      lastUpdate: Date.now()
  };
  
  app.use(express.json());
  app.use(cors());
  
  app.get('/time', (req, res) => {
      res.json({
          time: gameTime.value,
          lastUpdate: gameTime.lastUpdate
      });
  });
  
  app.post('/time', (req, res) => {
      const newTime = req.body.time;
      
      if (typeof newTime !== 'number') {
          return res.status(400).json({
              error: 'Time must be a number'
          });
      }
  
      gameTime = {
          value: newTime,
          lastUpdate: Date.now()
      };
  
      res.json({
          success: true,
          time: gameTime
      });
  });
  
  app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
  });
  
  app.listen(port, () => {
      console.log(`API server running on port ${port}`);
  });