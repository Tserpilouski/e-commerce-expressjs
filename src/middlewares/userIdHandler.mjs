const resolveIndexByUserId = (req, res, next) => {
    const {
        params: { id },
    } = req;

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    // create a new property to send value to next midleware
    req.findUserIndex = findUserIndex;
    next();
};

export default resolveIndexByUserId;
