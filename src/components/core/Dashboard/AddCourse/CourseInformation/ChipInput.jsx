import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips])

  const addTag = () => {
    const value = tagInput.trim()
    if (value && !chips.includes(value)) {
      setChips([...chips, value])
      setTagInput("")
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const value = event.target.value.trim()
      if (value && !chips.includes(value)) {
        setChips([...chips, value])
        setTagInput("")
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={addTag}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {chips.length > 0 && (
        <div className="flex w-full flex-wrap gap-2">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
              {chip}
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
