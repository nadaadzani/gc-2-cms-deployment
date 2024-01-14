export default function Category(category) {
  console.log(category);

  return (
    <>
      <tr className="">
        <td>{category.category.id}</td>
        <td>{category.category.name}</td>
      </tr>
    </>
  );
}
