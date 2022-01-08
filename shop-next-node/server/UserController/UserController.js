const User = require("../../models/User/User")

const create = async (req, res) => {
    try {
        req.body.role = "visitor"
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
}


const read = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
}

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send({msg: "user could not found"})
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "username", "password", "phoneNumber", "email"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({msg: "invalid Update"})
    }
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send({msg: "user could not found"})
        }
        updates.map(update => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}

const destroy = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send({msg: "user could not found"})
        }
        res.status(204).send({})
    } catch (e) {
        res.status(500).send(e)
    }
}


const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send({
            e,
            msg: "username or password is not correct"
        })
    }
}

const me = async (req, res) => {
    res.send(req.user)
}

module.exports = {create, read, show, update, destroy, login,me}
