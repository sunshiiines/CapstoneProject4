document.addEventListener("alpine:init", () => {
    Alpine.data("community", () => {
        return {
            chatroomName: "",
            chatrooms: [],
            updateChatroom: "",
            userId: "",
            username: "",

            createChatroom() {
                if (!this.chatroomName) {
                    alert("Please enter a chatroom name.");
                    return;
                }

                axios.post('/api/addChatroom', {
                    chatroomName: this.chatroomName,
                    userId: this.userId
                })
                    .then(result => {
                        if (result.data.chatroomName) {
                            this.chatroomName = result.data.chatroomName;
                        } else {
                            this.chatroomName = 'error creating chatroom';
                        }
                    });
            },

            getChatrooms() {
                axios.get('/api/chatrooms')
                    .then((result) => {
                        this.chatrooms = result.data.chatrooms;
                    })
                    .catch((err) => {
                        console.error("Cannot Get api/chatrooms", err);
                    });
            },

            updateChatroom() {
                axios.post("/api/updateChatroom", {
                    name: this.updateChatroom
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            location.reload();
                            setTimeout(() => {
                                this.updateChatroom = '';
                            }, 3000);
                        } else {
                            alert(result.data.error)
                            setTimeout(() => {
                                this.updateChatroom = '';
                            }, 3000);
                        }
                    });
            },

            deleteChatroom() {
                axios.post("/api/deleteChatroom", {
                    id: this.deleteChatroom
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            location.reload();
                            setTimeout(() => {
                                this.deleteChatroom = '';
                            }, 3000);
                        } else {
                            alert(result.data.error);
                            setTimeout(() => {
                                this.deleteChatroom = '';
                            }, 3000);
                        }
                    });
            },

            goToChat(chatroomId, chatroomName) {
                window.location.href = `chat.html?id=${chatroomId}&name=${chatroomName}`;
            },

            init() {
                this.getChatrooms();
            }
        };
    });
});
