import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"
import { BsChatDots } from "react-icons/bs"
import { sendChatMessage } from "../../services/operations/chatAPI"

function Chatbot() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatPanelRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!token) {
      setOpen(false)
      setMessages([])
      setInput("")
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for "Try now" from Personal chat support section (logged-in user)
  useEffect(() => {
    const handleOpenChatbot = () => {
      if (token) setOpen(true)
    }
    window.addEventListener("openChatbot", handleOpenChatbot)
    return () => window.removeEventListener("openChatbot", handleOpenChatbot)
  }, [token])

  // Close chatbot when user scrolls the page (not when scrolling inside the chat panel)
  useEffect(() => {
    if (!open) return
    const handleScroll = (e) => {
      if (!chatPanelRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [open])

  const handleIconClick = () => {
    if (!token) {
      toast.error("Please login to use the chatbot")
      return
    }
    setOpen((prev) => !prev)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const newUserMessage = { role: "user", content: text }
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const userRole = user?.accountType || null
      const { success, reply, message } = await sendChatMessage(
        updatedMessages,
        userRole
      )
      if (success) {
        setMessages((prev) => [...prev, { role: "model", content: reply }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: message || "Something went wrong." },
        ])
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Failed to get reply."
      setMessages((prev) => [
        ...prev,
        { role: "model", content: errMsg },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={handleIconClick}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow-50/75 shadow-lg backdrop-blur-sm hover:bg-yellow-25/80 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-900"
        aria-label={token ? "Open chatbot" : "Log in to chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <BsChatDots className="h-7 w-7 text-richblack-900" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={chatPanelRef}
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 left-3 right-3 z-[59] flex h-[75vh] min-h-[280px] max-h-[85vh] flex-col overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-xl sm:left-auto sm:right-6 sm:bottom-24 sm:h-[420px] sm:w-[380px] sm:min-h-0 sm:max-h-none"
          >
            <div className="flex items-center justify-between gap-3 border-b border-richblack-700 bg-richblack-900 px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-50">
                  <BsChatDots className="h-4 w-4 text-richblack-900" />
                </div>
                <span className="font-semibold text-richblack-5 truncate">
                  StudyNotion Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-richblack-25 hover:bg-richblack-700 hover:text-white"
                aria-label="Close chat"
              >
                <AiOutlineClose className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 min-h-0">
              {messages.length === 0 && (
                <p className="text-center text-sm text-richblack-400">
                  Ask anything about StudyNotion (courses, signup, dashboard,
                  etc.)
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-yellow-50 text-richblack-900"
                        : "bg-richblack-700 text-richblack-25"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-lg bg-richblack-700 px-3 py-2 text-sm text-richblack-25">
                    ...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0 border-t border-richblack-700 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 rounded-lg border border-richblack-600 bg-richblack-900 px-3 py-2.5 text-sm text-richblack-5 placeholder-richblack-400 outline-none focus:border-yellow-50 sm:py-2"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="flex-shrink-0 rounded-lg bg-yellow-50 px-4 py-2.5 text-sm font-medium text-richblack-900 transition hover:bg-yellow-25 disabled:opacity-50 disabled:cursor-not-allowed sm:py-2"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
