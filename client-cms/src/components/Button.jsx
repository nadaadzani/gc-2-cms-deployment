export default function Button({ name }) {
  return (
    <>
      <button
        type="submit"
        className="w-full h-12 bg-red-500 text-white rounded-md"
      >
        {name}
      </button>
    </>
  );
}
