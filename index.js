import express from "express"
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

let user;
const tweets = []

app.post("/sign-up", (req,res) => {
    const {username, avatar} = req.body

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }

    user = req.body
    res.status(201).send("Ok")
})

app.post("/tweets", (req,res) => {
    const {username, tweet} = req.body

    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }

    tweets.push(req.body)
    res.status(201).send("Ok")
})

app.get("/tweets", (req,res) => {
    tweets.reverse()
    tweets.slice(11)
    
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

app.get("/tweets/:user", (req,res) => {
    let param = req.params.user
    
    tweets.reverse()
    
    const response = []
    for (const tweet of tweets) {
        if (tweet.username === param) {
            let obj = {
                "username": tweet.username,
                "avatar": user.avatar,
                "tweet": tweet.tweet
            }
            response.push(obj)
        }
    }

    response.slice(11)
    res.send(response)
})

app.listen(5000)