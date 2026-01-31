import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai"
import { sendChatMessage } from "../../services/operations/chatAPI"

function Chatbot() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      const { success, reply, message } = await sendChatMessage(updatedMessages, userRole)
      if (success) {
        setMessages((prev) => [...prev, { role: "model", content: reply }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: message || "Something went wrong." },
        ])
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to get reply."
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
      {/* Yellow floating button - visible to everyone */}
      <button
        type="button"
        onClick={handleIconClick}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 shadow-lg transition hover:scale-105 hover:bg-yellow-25 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-900"
        aria-label="Open chatbot"
      >
        <AiOutlineMessage className="h-7 w-7 text-richblack-900" />
      </button>

      {/* Chat panel - only shown when open (logged-in user) */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[59] flex h-[420px] w-[380px] flex-col overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-900 px-4 py-3">
            <span className="font-semibold text-richblack-5">StudyNotion Assistant</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-richblack-25 hover:bg-richblack-700 hover:text-white"
              aria-label="Close chat"
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {messages.length === 0 && (
              <p className="text-center text-sm text-richblack-400">
                Ask anything about StudyNotion (courses, signup, dashboard, etc.)
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

          <div className="border-t border-richblack-700 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-richblack-600 bg-richblack-900 px-3 py-2 text-sm text-richblack-5 placeholder-richblack-400 outline-none focus:border-yellow-50"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 transition hover:bg-yellow-25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
