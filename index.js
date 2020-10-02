/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express =  require("express")
//import the routers 
const actionRouter = require("./routers/actionRouter")
const projectRouter = require("./routers/projectRouter")
const server = express();
server.use(express.json());

//endpoints
//request begins with /api/action use the router 
server.use("/api/action", actionRouter);
//request begins with /api/project use the router 
server.use("/api/project", projectRouter) 

server.get("/", (req, res) =>{
    res.send(`<h3> API Sprint </h3>`)
    res.status(200).json({ api: "testing for sprint", query: req.query });
});

const port = 5000;
server.listen(port, () => {
    console.log("\n*** Server Running on http://localhost:5000 ***\n")
})