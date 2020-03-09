module.exports = {
    TEST: "_TEST",
    
    EVENT_HAS_READ_MSG: '_EVENT_HAS_READ_MSG', // 已经阅读消息事件
    EVENT_GET_OWNER_INFO:'_EVENT_GET_OWNER_INFO', // 获取个人信息
    EVENT_UPDATE_OWNER_INFO:'_EVENT_UPDATE_OWNER_INFO', // 更新了个人信息
    EVENT_NEW_SINGLE_MSG: '_EVENT_NEW_SINGLE_MSG', // 有个人新消息
    EVENT_NEW_ROOM_MSG: '_EVENT_NEW_ROOM_MSG', // 有房间新消息
    EVENT_TYPING: '_EVENT_TYPING', // 对方正在输入中

    ROOM: 'room', // room 标记（socket）
    SINGLE:'single', // single 标记（socket）
    TYPING:'typing', // typing

    ASIDE_SEARCH_NUM:3, // search 在aside位置
    ASIDE_ROOM_NUM:2, // room 在aside位置
    ASIDE_SINGLE_NUM:1, // single 在aside位置
}