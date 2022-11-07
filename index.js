import express from "express"
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

const user = []
const tweets = []

app.post("/sign-up", (req,res) => {
    const {username, avatar} = req.body

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }

    user.push(req.body)
    res.status(201).send("Ok")
})

app.post("/tweets", (req,res) => {
    const {tweet} = req.body
    const username = req.headers.user

    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }

    tweets.push({
        username: username,
        tweet: tweet
    })
    res.status(201).send("Ok")
})

app.get("/tweets", (req,res) => {
    const page = parseInt(req.query.page)

    tweets.reverse()
    if (page) {tweets.slice(10*(page-1),10*(page)+1)}
    else {tweets.slice(11)}
    
    const response = []
    for (const tweet of tweets) {
        let avatar;

        user.forEach((a)=>{
            if (a.username === tweet.username){
                avatar =  a.avatar
            }
        })

        let obj = {
            "username": tweet.username,
            "avatar": avatar,
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