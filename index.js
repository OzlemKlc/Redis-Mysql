const express = require("express");
const redis = require("redis");

const mysqlConnection = require("./helper/mysql");
require('dotenv').config();

const app =express();
// app.get("/" , (req , res) => {
//     const data = redisClient.get("emin");
//     console.log(data); //emin
//     res.send("Hello world!");
// });

// app.listen(5000 , (req , res) => {
//     console.log("Server is running on Port 5000");
// });

// 
// Redis connection
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
}); 

  app.get('/blogs/:id', async (req, res) => {
    const blogId = req.params.id;
  
    try {
      if (!redisClient.connected) {
        await redisClient.connect();
      }
  
      const data = await redisClient.get(`blog:${blogId}`);
  
      if (data) {
        console.log("Data retrieved from Redis Cache");
        try {
          const parsedData = JSON.parse(data);
          return res.json(parsedData);
        } catch (error) {
          console.error('Data parsing error:', error);
        }  
      } else {
        console.log("Data not found in Redis Cache");           // If data not found in cache, retrieve from MySQL
        const [results] = await mysqlConnection.query('SELECT * FROM blogs WHERE id = ?', [blogId]);
  
        if (results.length === 0) {
          console.log("Data not found in MySQL");
          return res.status(404).json({ error: 'Data not found' });
        }
        
        const blogData = results[0] || {}; 
  
        await redisClient.set(`blog:${blogId}`, JSON.stringify(blogData));           // Update cache and return data
        console.log("Data retrieved from MySQL and written to Redis Cache");
  
        res.json(blogData);
      }
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  const server = app.listen(5000, () => {
    console.log("Server is running on port", server.address().port);
  });

  redisClient.on('Connect', () => {
    console.log('Redis connected');
  });
  
  redisClient.on('Error', (err) => {
    console.error('Redis error:', err);
  });
  
  redisClient.on('End', () => {
    console.log('Redis connection closed');
  });
  
  process.on('SIGINT', async () => {      // Close the server when SIGINT signal is received
      console.log('Closing the application');
    
      if (redisClient.connected) {
        await redisClient.quit();
      }
  
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });  