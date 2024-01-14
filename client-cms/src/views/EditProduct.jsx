import { useState } from "react";
import Form from "../components/Form";

export default function EditProduct() {
  const [type, setType] = useState("edit");

  return (
    <>
      <section className="flex flex-col items-center w-full h-auto mt-32 gap-12">
        <h1 className="text-5xl font-bold">Edit your product</h1>
      </section>

      <Form type={type} />
    </>
  );
}
