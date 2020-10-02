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

const express =  require("express");
const morgan = require ("morgan");
const helmet = require ("helmet");
//import the routers 


const actionRoute = require("./routers/actionRouter");
// const projectRoute = require("./routers/projectRouter");


// const Actiondb = require("./data/helpers/actionModel")
// const Projectdb = require("./data/helpers/projectModel")

const server = express();
const logger = morgan("combined") // combined' chooses a pre-made format for the logs

server.use(express.json());
server.use("/", morgan("---testing for creating API sprint---"));
server.use("/", helmet());

//endpoints
//request begins with /api/action use the router 
server.use("/actions", actionRoute);
//request begins with /api/project use the router 
// server.use("/projects", projectRoute) 




server.get("/", (req, res, next ) =>{
    res.status(200).json({ api: "testing for sprint", query: req.query })
    // res.send(`<p>API Sprint</p>`) 
    next();
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log("\n*** Server Running on http://localhost:9000 ***\n")
})