import { DynamicForm } from "@/components/features/Form";
import { inputFields } from "@/pages/Login/input-field-data";


  function handleSubmit(data: Record<string, any>) {
    console.log(data);
  }


export default function Login() {
  
  return (
    <section className=" flex flex-col justify-center items-center">
      <div className="flex md:w-1/4 flex-col justify-center items-center p-5 rounded gap-5">
          <div className="w-full text-center">
            <h1 className="text-3xl">FraudBucket</h1>
            <p className="">Please sign in</p>
          </div>
         <div className="w-full">
            <DynamicForm inputs={inputFields} onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
}
