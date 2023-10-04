const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 9000;
app.use(cors())
app.use(express.json());
require('dotenv').config()


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster27.3snb0mf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
console.log(uri);
async function run() {
  try {

    const tasksCollection = client.db('Redux').collection('tasks')
    const computerCollection = client.db('Redux').collection('computer')
    const userCollection = client.db('find-jobs').collection('user')
    const jobsCollection = client.db('find-jobs').collection('jobs')
    const messageCollection = client.db('find-jobs').collection('message')

    app.post('/message', async (req, res) => {
      const data = req.body
      // Perform any database operations to save the message here
      // Replace this with your actual database code
      // For demonstration purposes, we're pushing the message into an array

      console.log(data);
      const result = await messageCollection.insertOne(data);
      res.send(result)
    })
    app.get('/message', async (req, res) => {
      const id = req.query.id
      console.log(id);
      const query = { $or: [{ candId: id }, { empId: id },] };
      console.log(query, 'whty');
      const result = await messageCollection.find(query).toArray()
      console.log(result);
      res.send({ status: true, data: result })
    })
    app.get('/one-message', async (req, res) => {
      const id = req.query.id
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await messageCollection.findOne(query)
      console.log(result);
      res.send({ status: true, data: result })
    })
    app.patch('/message-emp', async (req, res) => {
      const messId = req.body.messId
      const question = req.body.question;
      console.log('keno hobe na', messId, question);
      const filter = { _id: new ObjectId(messId) };
      const updateDoc = {
        $push: {
          messages: {
            question: question,
            reply: [],
          },
        },
      };

      const result = await messageCollection.updateOne(filter, updateDoc);
      console.log('result', result);
      res.send({ status: true, data: result });
    });
    app.patch('/message-can', async (req, res) => {
      try {
        const id = req.body.id; // The _id of the document
        const ans = req.body.ans; // The data you want to push into the 'reply' array
    
        const filter = {
          _id: new ObjectId(id),
          'messages': { $elemMatch: { 'reply': { $exists: true } } } // Ensure 'messages' contains 'reply' array
        };
    
        const updateDoc = {
          $push: {
            'messages.$.reply': ans // Push 'ans' into the 'reply' array within the matched 'messages' element
          },
        };
    
        const result = await messageCollection.updateOne(filter, updateDoc);
    
        if (result.matchedCount === 0) {
          return res.status(404).send({ status: false, message: 'Message not found.' });
        }
    
        res.send({ status: true, data: result });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ status: false, message: 'Internal server error.' });
      }
    });


    app.post('/computer', async (req, res) => {
      const task = req.body;
      // console.log(task);
      const result = await tasksCollection.insertOne(task);
      res.send(result)
    })
    app.get('/computer', async (req, res) => {
      const query = {};
      const result = await computerCollection.find(query).toArray();
      res.send(result)
    })


    app.patch('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const updatedTaskData = req.body;
      // const query = {_id : new ObjectId(id)}
      // const result = await tasksCollection.updateOne(query,{$set:updatedTaskData})

      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedTaskData }
        );

        if (result.matchedCount === 0) {
          res.status(404).json({ error: 'Task not found' });
        } else {
          res.json({ message: 'Task updated successfully' });
        }
      } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await tasksCollection.deleteOne(query)
      res.send(result)
    })

    app.post('/user', async (req, res) => {
      const data = req.body;
      const result = await userCollection.insertOne(data)
      res.send(result)
    });
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const result = await userCollection.findOne({ email })

      if (result?.email) {
        res.send({ status: true, data: result });
      } else {

        res.send({ status: false })
      }
    });

    // app.get('/user', async (req, res) => {
    //   const query = {}
    //   console.log(query);
    //   const result = await userCollection.find(query).toArray()
    //   res.send(result)
    // });
    app.get('/user', async (req, res) => {
      const id = req.query.id; // Use req.query to access query parameters
      console.log(id);

      try {
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.findOne(query);
        console.log(result);
        if (!result) {
          res.status(404).json({ error: 'User not found' });
          return;
        }

        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    });

    app.post('/job', async (req, res) => {
      const data = req.body;
      const result = await jobsCollection.insertOne(data)
      res.send(result)
    });
    app.get('/jobs', async (req, res) => {
      const query = {};
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
    });
    app.patch('/job-close/:id', async (req, res) => {
      const id = req.params;
      const jobs = req.body
      console.log(id);
      const query = { _id: new ObjectId(id) }
      const updataDoc = { $set: jobs }
      console.log(query, updataDoc);
      const result = await jobsCollection.updateOne(query, updataDoc);
      res.send({ status: true, data: result })
    });
    app.get('/job/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query);
      res.send({ status: true, data: result })
    });
    app.patch('/apply', async (req, res) => {
      const userId = req.body.userId;
      const jobId = req.body.jobId;
      const email = req.body.email;
      const filter = { _id: new ObjectId(jobId) }
      const updateDoc = {
        $push: { applicants: { id: new ObjectId(userId), email } }
      };
      const result = await jobsCollection.updateOne(filter, updateDoc)
      if (result.acknowledged) {
        return res.send({ status: true, data: result })
      }
      res.send({ status: false })
    });
    app.get('/applied-jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = { applicants: { $elemMatch: { email: email } } };
      const cursor = jobsCollection.find(query).project({ applicants: 0 });
      const result = await cursor.toArray();
      res.send({ status: true, data: result })
    });
    app.get('/my-jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = jobsCollection.find(query)
      const result = await cursor.toArray();
      res.send({ status: true, data: result })
    });
    app.patch('/query', async (req, res) => {
      const userId = req.body.userId
      const qusId = req.body.qusId
      const jobId = req.body.jobId
      const email = req.body.email
      const question = req.body.question;
      // console.log(userId, jobId, email);
      const filter = { _id: new ObjectId(jobId) };
      const updateDoc = {
        $push: {
          queries: {
            id: new ObjectId(userId),
            email,
            question: question,
            qusId: qusId,
            reply: [],
          },
        },
      };
      const result = await jobsCollection.updateOne(filter, updateDoc)
      if (result?.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    })

    app.get('/api/messages', async (req, res) => {
      try {
        const messages = await messageCollection.find().sort({ _id: -1 });
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });

    app.post('/api/messages', async (req, res) => {
      const data = req.body

    });


    // app.patch("/reply", async (req, res) => {
    //   const userId = req.body.userId;
    //   const jobId = req.body.jobId; // You might need to provide jobId in your request body
    //   const qusId = req.body.qusId;
    //   const reply = req.body.reply;
    //   console.log(userId, reply);

    //   try {
    //     const filter = {
    //       "queries.id": new ObjectId(jobId), // Use the correct field name for qusId in your document
    //       qusId: qusId, // Use the correct field name for jobId in your document
    //     };
    // console.log(filter);
    //     const updateDoc = {
    //       $push: {
    //         "queries.$[user].reply": reply,
    //       },
    //     };

    //     const result = await jobsCollection.updateOne(
    //       filter,
    //       updateDoc
    //     );

    //     console.log(result);

    //     if (result.acknowledged) {
    //       return res.send({ status: true, data: result });
    //     }

    //     res.send({ status: false });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // });


    // app.patch("/reply", async (req, res) => {
    //   const userId = req.body.userId;
    //   const jobId = req.body.jobId;
    //   const qusId = req.body.qusId;
    //   const reply = req.body.reply;
    //   console.log(userId, reply);

    //   try {
    //     const filter = {
    //       _id: new ObjectId(jobId),
    //     };

    //     const updateDoc = {
    //       $push: {
    //         "queries.$[filterCondition].reply": reply,
    //       },
    //     };

    //     const arrayFilters = [
    //       { "filterCondition.id": new ObjectId(qusId), "filterCondition.user.id": new ObjectId(userId) },
    //     ];

    //     const result = await jobsCollection.updateOne(
    //       filter,
    //       updateDoc,
    //       { arrayFilters }
    //     );

    //     console.log(result);

    //     if (result.acknowledged) {
    //       return res.send({ status: true, data: result });
    //     }

    //     res.send({ status: false });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // });





    // app.patch("/reply", async (req, res) => {
    //   const userId = req.body.userId;
    //   const reply = req.body.reply;

    //   const filter = { "queries.id": new ObjectId(userId) };

    //   const updateDoc = {
    //     $push: {
    //       "queries.$[user].reply": reply,
    //     },
    //   };
    //   const arrayFilters = [{ "user.id": new ObjectId(userId) }]; // Updated arrayFilters

    //   const result = await jobsCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     { arrayFilters } // Pass arrayFilters directly as an option
    //   );

    //   if (result.acknowledged) {
    //     return res.send({ status: true, data: result });
    //   }

    //   res.send({ status: false });
    // });

    // filnal 
    app.patch("/reply", async (req, res) => {
      const userId = req.body.userId;
      const reply = req.body.reply;
      const jobId = req.body.jobId;
      console.log(reply);
      console.log(jobId);

      const filter = { _id: new ObjectId(jobId) };

      const updateDoc = {
        $push: {
          "queries.$[user].reply": reply,
        },
      };
      const arrayFilter = {
        arrayFilters: [{ "user.id": new ObjectId(userId) }],
      };

      const result = await jobsCollection.updateOne(
        filter,
        updateDoc,
        arrayFilter
      );
      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });
  }
  finally {

  }
}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('Hi i am Redux Server Here!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})