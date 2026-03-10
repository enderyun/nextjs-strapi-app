export function FormError({ error }: { error?: string[] }) {

  if (!error) return null 

  return error.map((err, index) => (
    <p key={index} className="text-pink-500 text-sm italic mt-1 py-1">{err}</p>
  ))
}