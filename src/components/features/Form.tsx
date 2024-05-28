import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Buttons";
import { z } from "zod";
import { InputTpyes } from "@/types/form-types";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


type DynamicFormProps = {
  inputs: InputTpyes[];
  onSubmit: (data: Record<string, any>) => void;
};

export function DynamicForm({ inputs, onSubmit }: DynamicFormProps) {

  // Type all inputs in an array of objects
  const formSchema = z.object(
    Object.fromEntries(
      inputs.map((input) => [input.name, input.validationSchema])
    )
  );

  //Give all inputs a default value
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(inputs.map((input) => [input.name, ""])),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {inputs.map((input, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input placeholder={input.placeholder} {...field} type={ input.type} />
                </FormControl>
                <FormDescription>{input.description}</FormDescription>
                  <FormMessage/>
              </FormItem>
            )}
          />
        ))}
        <Button variant="primary" type="submit" title="Submit" size="md" className="rounded" isLoading={false} loadingText="Please wait..." />
      </form>
    </Form>
  );
}
