class APIMessage {
    static messageDeleted(item, id) {
        return { message: `${item} with id ${id} was deleted!` };
    }

    static messageRenamed(item, id, name) {
        return { message: `${item} with id ${id} was renamed! New name: ${name}` };
    }

    static messagePutMember(item, id, memberId) {
        return { message: `Member with id ${memberId} was puted to ${item} with id ${id}` };
    }

    static messageRemoveMember(item, id, memberId) {
        return { message: `Member with id ${memberId} was removed from ${item} with id ${id}` };
    }

    static messageIconChanged(item, id, newIconId) {
        return { message: `${item} with id ${id} was changed! New icon: ${newIconId}` }
    }
}

module.exports = APIMessage;