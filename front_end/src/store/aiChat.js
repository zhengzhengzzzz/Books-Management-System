import {
    getWebsocketUrl
} from '../components/ai-service/utils/index'
import {
    requestObj
} from "../components/ai-service/config";
export default {
    namespaced: true,
    state: {
        chatList: [{
                role: "user",
                content: requestObj.context
            },
            {
                role: "assistant",
                content: "我是AI助手"
            },
        ],
        answer: "",
        loading: false,
        error: "",
    },
    mutations: {
        setAnswer(state, answer) {
            state.answer = answer;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setError(state, error) {
            state.error = error;
        },
        addToChatList(state, item) {
            state.chatList.push(item);
        },
        clearChatList(state) {
            state.chatList = [];
        },
    },
    actions: {
        async fetchAnswer({
            commit,
            state
        }, question) {
            commit('setAnswer', ""); // 清空 answer
            commit('setLoading', true); // 设置 loading 为 true

            try {
                const myUrl = await getWebsocketUrl();
                const socket = new WebSocket(myUrl);
                socket.addEventListener("open", () => {
                    const params = {
                        header: {
                            app_id: requestObj.APPID,
                            uid: "wzz",
                        },
                        parameter: {
                            chat: {
                                domain: "generalv3",
                                temperature: 0.5,
                                max_tokens: 2048,
                            },
                        },
                        payload: {
                            message: {
                                text: [
                                    ...state.chatList,
                                    {
                                        role: "user",
                                        content: question
                                    },
                                ],
                            },
                        },
                    };
                    socket.send(JSON.stringify(params));
                });

                socket.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    if (!data.payload) {
                        socket.close();
                        return;
                    }
                    commit('setAnswer', state.answer + data.payload.choices.text[0].content);
                    if (data.header.code !== 0) {
                        socket.close();
                    }
                    if (data.header.code === 0) {
                        if (data.payload.choices.text && data.header.status === 2) {
                            setTimeout(() => {
                                socket.close();
                            }, 1000);
                        }
                    }
                });

                socket.addEventListener("close", () => {
                    commit('addToChatList', {
                        role: 'user',
                        content: question
                    });
                    commit('addToChatList', {
                        role: 'assistant',
                        content: state.answer
                    });
                    commit('setLoading', false);
                    commit('setError', "");
                });

                socket.addEventListener("error", () => {
                    commit('setError', "获取回答时发生错误");
                });
            } catch (error) {
                commit('setError', "获取回答时发生错误");
            }
        }
    }
}