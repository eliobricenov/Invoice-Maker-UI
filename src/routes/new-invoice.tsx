import { Button, Input, InputLabel } from "../components";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { tokens } from "../system/tokens";
import { NewInvoiceFormValues } from "../interfaces/new-invoice-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { getAssetSrc } from "../utils/asset-src";
import defaultTokenLogo from "../assets/default-token.svg";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

function calculateTotal(items: NewInvoiceFormValues["listItems"]) {
  return items.reduce((previousValue, currentValue) => {
    const price = currentValue.price ?? 0;
    const quantity = currentValue.quantity ?? 0;
    // input type="number" accepts negative input in firefox
    if (quantity < 0 || price < 0) return previousValue;
    return previousValue + price * quantity;
  }, 0);
}

const emptyEntry = {
  quantity: undefined,
  price: undefined,
  description: undefined,
};

function ItemEntry({ index, onRemove }: { index: number; onRemove: () => void }) {
  const { register } = useFormContext<NewInvoiceFormValues>();
  const fieldName = `listItems.${index}`;
  return (
    <div className="mt-2 flex flex-col gap-1">
      <div className="flex items-center">
        {index > 0 && (
          <button onClick={onRemove}>
            <TrashIcon
              width={24}
              height={24}
              className="rounded-lg rounded-full p-1 text-gray-500 hover:bg-gray-100"
            />
          </button>
        )}
        <span className="font-medium text-gray-500">Item {index + 1}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <InputLabel required>Description</InputLabel>
          <Input
            required
            type="text"
            {...register(`${fieldName}.description` as `listItems.${number}.description`)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex w-1/2 flex-col">
            <InputLabel required>Quantity</InputLabel>
            <Input
              type="number"
              min="1"
              required
              {...register(`${fieldName}.quantity` as `listItems.${number}.quantity`)}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <InputLabel required>Price</InputLabel>
            <Input
              type="number"
              min="1"
              required
              {...register(`${fieldName}.price` as `listItems.${number}.price`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemList() {
  const { control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    name: "listItems",
    control,
  });
  return (
    <div className="flex flex-col">
      <InputLabel>Item List</InputLabel>
      <div className="flex flex-col gap-5 divide-y divide-dashed divide-gray-300">
        {fields.map((item, index) => (
          <div key={item.id}>
            <ItemEntry index={index} onRemove={() => remove(index)} />
            <div className="divide-y divide-blue-200" />
          </div>
        ))}
      </div>
      <div className={clsx("flex gap-2", fields.length > 0 ? "mt-8" : "mt-2")}>
        <Button
          type="button"
          onClick={() => append(emptyEntry)}
          className={clsx(
            "flex w-fit items-center gap-2 border border-gray-200 hover:bg-gray-50"
          )}
        >
          <PlusIcon width={20} height={20} />
          <span>Add new item</span>
        </Button>
        <Button
          type="button"
          onClick={() => replace(emptyEntry)}
          className={
            "flex w-fit items-center gap-2 border border-gray-200 hover:bg-gray-50"
          }
        >
          Clear Items
        </Button>
      </div>
    </div>
  );
}

function TokenSelector() {
  const { control } = useFormContext();
  return (
    <div>
      <InputLabel required>Payment Method</InputLabel>
      <Controller
        name="paymentMethod"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Listbox value={field} onChange={field.onChange}>
            <Listbox.Button
              aria-label="paymentMethod"
              className="flex w-full items-center justify-between rounded rounded-md border border-gray-300 p-2 text-start"
            >
              <div className="flex items-center gap-2 text-start">
                <img
                  className="h-6 w-6"
                  src={
                    getAssetSrc(`${field.value.name.toLowerCase()}.svg`) ??
                    defaultTokenLogo
                  }
                  aria-hidden="true"
                  alt={`${field.value.name} icon`}
                />
                <span>{field.value.name}</span>
              </div>
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Listbox.Button>
            <Listbox.Options className="mt-2 rounded rounded-md border border-gray-300 py-1">
              {tokens.map((token, index) => (
                <Listbox.Option key={token.name} value={token}>
                  {({ active }) => (
                    <div
                      className={clsx(
                        "flex items-center gap-2 py-1 px-2",
                        active && "bg-gray-50"
                      )}
                    >
                      <img
                        className="h-6 w-6"
                        src={
                          getAssetSrc(`${token.name.toLowerCase()}.svg`) ??
                          defaultTokenLogo
                        }
                        alt={`${token.name} icon`}
                      />
                      <span>{token.name}</span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        )}
      ></Controller>
    </div>
  );
}

function InvoiceForm({ onSubmit }: { onSubmit: SubmitHandler<NewInvoiceFormValues> }) {
  const { register, handleSubmit, watch } = useFormContext<NewInvoiceFormValues>();
  const [paymentMethod, listItems] = watch(["paymentMethod", "listItems"]);
  const total = calculateTotal(listItems);
  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="text-2xl font-bold">New Invoice</div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <InputLabel required>Name</InputLabel>
          <Input type="text" aria-label="name" required {...register("name")} />
        </div>
        <TokenSelector />
        <div className="mt-2">
          <ItemList />
        </div>
        <div className="divide-y divide-gray-500">
          <span className="text-xl font-bold">
            TOTAL: {total} {paymentMethod.name}
          </span>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full bg-blue-400 text-white hover:bg-blue-500"
        >
          Preview Invoice
        </Button>
      </form>
    </div>
  );
}

function InvoicePreview({ onGoBack }: { onGoBack: () => void }) {
  const { getValues } = useFormContext<NewInvoiceFormValues>();
  const { name, listItems, paymentMethod } = getValues();
  const total = calculateTotal(listItems);
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold">{name}</h2>
      <div className="divider-gray-500 divide-y">
        <h3 className="mb-2 text-xl">Summary</h3>
        {listItems.map((item) => (
          <div className="flex items-center justify-between py-4">
            <span className="text-gray-500">
              {item.description}{" "}
              {item.quantity && item.quantity > 1 ? `(${item.quantity}x)` : null}
            </span>
            <span className="text-gray-500">
              {item.price} {paymentMethod.name}
            </span>
          </div>
        ))}
      </div>
      <span className="text-xl font-bold">
        TOTAL: {total} {paymentMethod.name}
      </span>
      <div className="flex gap-4">
        <Button
          onClick={onGoBack}
          className="w-1/2 bg-gray-400 text-white hover:bg-gray-500"
        >
          Go Back
        </Button>
        <Button className="w-1/2 bg-blue-400 text-white hover:bg-blue-500">Create</Button>
      </div>
    </div>
  );
}

export default function NewInvoiceRoute() {
  const [previewMode, setPreviewMode] = useState(false);
  const methods = useForm<NewInvoiceFormValues>({
    defaultValues: {
      paymentMethod: tokens[0],
      listItems: [emptyEntry],
    },
  });

  const onCreateSubmit: SubmitHandler<NewInvoiceFormValues> = (values) => {
    //TODO: create invoice
  };

  const onPreviewSubmit: SubmitHandler<NewInvoiceFormValues> = () => {
    setPreviewMode(true);
  };

  return (
    <FormProvider {...methods}>
      {previewMode ? (
        <InvoicePreview onGoBack={() => setPreviewMode(false)} />
      ) : (
        <InvoiceForm onSubmit={onPreviewSubmit} />
      )}
    </FormProvider>
  );
}
