let express = require('express');
const User = require('../modals/UserModal');
const bcryptjs = require('bcryptjs');
const { generateAccesToken } = require('../middlewares/auth');
let router = express.Router();


router.post('/create', async (req, res) => {
    const { name, email, password } = req.body

    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    let newUser = req.body;


    try {
        let user = await User.create(newUser)
        // console.log(user)
        const token = generateAccesToken(user._id)
        // console.log(token)
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: (1000 * 60 * 60 * 24 * 365 * 10) // 10 yrs
            // secure: process.env.NODE_ENV === "production",
        }).status(200)
            .send(user)
    } catch (error) {
        console.log(error)
    }

})
router.post('/update', async (req, res) => {



    try {
        const query = { _id: req.userId };
        await User.findOneAndUpdate(query,
            { data: req.body },
            { new: true }, // inorder to update the returning doc

        ).then((user) => {
            res.send(user)
            // console.log(doc) 
        }
        );
    } catch (error) {
        console.log(error)
        // res.send(new Error(msg))
    }



})


router.get('/details', async (req, res) => {
// console.log(req.userId,'userie')

    try {
        const query = { _id: req.userId };
        await User.findOne(query).then((user) => {
            // console.log(user, 'user')
            res.send(user)
        })
    } catch (error) {
        console.log(error)
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        await User.findOne({ email }).then((user) => {
            // console.log(user)

            if (user != null) {
                if (bcryptjs.compareSync(password, user.password)) {
                    const token = generateAccesToken(user._id)

                    user.password = null

                    res.cookie("access_token", token, {
                        httpOnly: true,
                        maxAge: (1000 * 60 * 60 * 24 * 365 * 10) // 10 yrs
                        // secure: process.env.NODE_ENV === "production",
                    }).status(200)
                        .send(user)
                } else {
                    res.status(400).send({ message: 'Invalid credentials.' })
                }
            } else {
                res.status(400).send({ message: 'Invalid credentials.' })
            }


        })
    } catch (error) {
        console.log(error)
    }

})



router.get("/logout", async (req, res) => {
    console.log('here')
    res.clearCookie("access_token")
        .sendStatus(200)

});

module.exports = router