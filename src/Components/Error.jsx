
function Error({errors , className}) {
  return (
    <div>
          <div>
              {errors && <p className={`font-semibold text-[12px] pl-1 -mt-2 text-red-600 ${className}`}>{errors}</p>}
          </div>
    </div>
  )
}

export default Error