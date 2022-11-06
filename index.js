import express from "express"
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

let user;
const tweets = []

app.post("/sign-up", (req,res) => {
    user = req.body
    res.send("Ok")
    console.log(user)
})

app.post("/tweets", (req,res) => {
    tweets.push(req.body)
    res.send("Ok")
})

app.get("/tweets", (req,res) => {
    tweets.reverse()
    tweets.slice(10)
    
    console.log(tweets)

    const response = []
    for (const tweet of tweets) {
        let obj = {
            "username": tweet.username,
            "avatar": user.avatar,
            "tweet": tweet.tweet
        }
        response.push(obj)
    }

    res.send(response)
})

app.listen(5000)