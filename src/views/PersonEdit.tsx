import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import { NumericInput } from '@/components/NumericInput/NumericInput'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="flex items-center gap-3">
        <img
          src="/img.png"
          alt={person.name}
          className="w-14 h-14 rounded-full border-2 border-violet-500 object-cover"
        />
        <div>
          <label htmlFor="hours-input" className="block text-sm font-bold tracking-wide text-gray-700">
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-2">
            <NumericInput
              id="hours-input"
              value={person.ageInHours}
              onChange={(val) => updatePersonAge(person.id, Number(val) || 0)}
              className="text-lg text-violet-900 font-medium"
              placeholder="0"
            />
            <span className="text-gray-600">hours old</span>
          </div>
        </div>
      </div>
    </div>
  )
}