import Form from "./components/Form";
import ListCategory from "./components/ListCategory";

export default function Page() {
  return (
    <main className="p-6 flex gap-5">
      <Form />
      <ListCategory />
    </main>
  );
}
