
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReceiptFormData } from "@/types/receipt";

const formSchema = z.object({
  operationType: z.string().min(1, "Обязательное поле"),
  sender: z.string().min(1, "Обязательное поле"),
  recipient: z.string().min(1, "Обязательное поле"),
  amount: z.string().min(1, "Обязательное поле"),
});

interface ReceiptFormProps {
  onSubmit: (data: ReceiptFormData) => void;
}

const ReceiptForm = ({ onSubmit }: ReceiptFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operationType: "",
      sender: "",
      recipient: "",
      amount: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData: ReceiptFormData = {
      operationType: values.operationType,
      sender: values.sender,
      recipient: values.recipient,
      amount: values.amount
    };
    
    onSubmit(formData);
    toast({
      title: "Данные отправлены",
      description: "Создаем ваш чек...",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="operationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Тип операции</FormLabel>
              <FormControl>
                <Input placeholder="Перевод, QR и т.д." {...field} className="bg-gray-800 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Отправитель</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Фамилия Имя" 
                  {...field} 
                  className="bg-gray-800 text-white" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Получатель</FormLabel>
              <FormControl>
                <Input placeholder="Номер телефона" {...field} className="bg-gray-800 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Сумма перевода</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  placeholder="Сумма" 
                  {...field} 
                  className="bg-gray-800 text-white" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Отправить</Button>
      </form>
    </Form>
  );
};

export default ReceiptForm;
