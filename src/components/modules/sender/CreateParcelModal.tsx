/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

// Zod schema
const parcelSchema = z.object({
  type: z.string().min(1, "Parcel type is required"),
  weight: z.number().min(1, "Weight must be greater than 0"),
  receiverEmail: z.string().email("Invalid receiver email"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  fee: z.number().min(0, "Fee must be >= 0"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

export function CreatedParcelModal() {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const { data: userData } = useUserInfoQuery(undefined); // get sender info

  const form = useForm<ParcelFormData>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      type: "",
      weight: 0,
      receiverEmail: "",
      pickupAddress: "",
      deliveryAddress: "",
      fee: 0,
      deliveryDate: "",
    },
  });

  const onSubmit = async (formData: ParcelFormData) => {
    if (!userData?.data?._id) {
      toast.error("Sender info not available");
      return;
    }

    try {
      const payload = {
        ...formData,
        sender: userData.data._id, // attach sender ID
      };

      const res = await createParcel(payload).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Parcel created successfully");
        document.getElementById("close-create-parcel-modal")?.click();
        form.reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Parcel Request</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Parcel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-parcel-form"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Fruits, Electronics..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button id="close-create-parcel-modal" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="create-parcel-form"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}