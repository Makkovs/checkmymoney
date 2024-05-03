class APIMessage {
    static messageDeleted(item, id) {
        return { message: `${item} with id ${id} was deleted!` };
    };

    static messageUpdated(item, id) {
        return { message: `${item} with id ${id} was updated!` };
    };
};

module.exports = APIMessage;