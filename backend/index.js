const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://suba:321@cluster0.puihhbw.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function () { console.log("connected to DB") })
    .catch(function () { console.log("not connected to DB") })
const credential = mongoose.model("credential", {}, "bulkmail")


app.post("/sendemail", function (req, res) {

    var msg = req.body.msg
    var emaillist = req.body.emaillist
    console.log(req.body.msg)
    credential.find().then(function (data) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
                // user: "sadasuba@gmail.com",
                // pass: "osar rxwe yojo wdrl",
                //osar rxwe yojo wdrl
            },
        });
        console.log(data[0].toJSON())
        new Promise(async function (resolve, reject) {

            try {
                for (var i = 0; i < emaillist.length; i++) {
                    await transporter.sendMail({

                        from: "sadasuba@gmail.com",
                        to: emaillist[i],
                        subject: "message from bulkmail app",
                        text: msg
                    }
                        //  function (error, info) {
                        //     if (error) {
                        //         console.log(error)
                        //         res.send(false)
                        //     }
                        //     else {
                        //         console.log(info)
                        //         res.send(true)
                        //     }
                        // }
                    )
                    console.log("email sent to :" + emaillist[i])
                }
                resolve("success")
            }
            catch (error) {
                reject("failed")
            }
        }).then(function () { res.send(true) })
            .catch(function () { res.send(false) })
    }).catch(function (error) {
        console.log(error)
    })


})

app.listen(5000, function () {
    console.log("server started")
})
