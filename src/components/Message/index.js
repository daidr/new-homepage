import { reactive } from 'vue'

const messageList = reactive({})

const messageIdList = reactive([])

// 默认值
const DURATION = 3000

// 随机生成不重复的ID
const createId = () => {
  const id = Math.random().toString(36).slice(2, 9)
  if (messageIdList.includes(id)) {
    return createId()
  }
  return id
}

const showMessage = (options) => {
  // 创建一个messageId
  let id = createId()
  // 将 id 存入 messageIdList
  messageIdList.push(id)
  // 将 options 存入 messageList
  messageList[id] = {
    ...options,
    id,
    duration: options.duration || DURATION
  }

  // 计时器，用于删除message
  setTimeout(() => {
    messageIdList.splice(messageIdList.indexOf(id), 1)
    delete messageList[id]
  }, messageList[id].duration)
  return id
}

const removeMessage = (id) => {
  messageIdList.splice(messageIdList.indexOf(id), 1)
  delete messageList[id]
}

const changeMessageText = (id, text) => {
  if (messageList[id]) {
    messageList[id].text = text
    return true
  } else {
    return false
  }
}

const suger = {
  success: (text, duration) => {
    return showMessage({
      text,
      icon: 'success',
      duration
    })
  },
  error: (text, duration) => {
    return showMessage({
      text,
      icon: 'error',
      duration
    })
  },
  info: (text, duration) => {
    return showMessage({
      text,
      icon: 'info',
      duration
    })
  },
  warn: (text, duration) => {
    return showMessage({
      text,
      icon: 'warn',
      duration
    })
  }
}

// export to window.debug if in debug mode
if (process.env.NODE_ENV === 'development') {
  window.debug = {
    ...(window.debug || {}),
    message: {
      showMessage,
      removeMessage,
      changeMessageText,
      messageList,
      messageIdList,
      ...suger
    }
  }
}

export const useMessage = () => {
  return {
    showMessage,
    removeMessage,
    changeMessageText,
    messageList,
    messageIdList,
    ...suger
  }
}
