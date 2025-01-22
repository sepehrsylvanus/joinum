import { Checkbox } from "@/components/ui/checkbox";
import { useSetOrder } from "@/hooks/use-order";

export function OrderYear() {
  const setOrder = useSetOrder();

  return (
    <section className="grid gap-4">
      <h2 className="heading">
        Choose account ages or created year range: (optional)
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="other-lang" />
          <label
            htmlFor="other-lang"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Any year (recommended)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="other-lang" />
          <label
            htmlFor="other-lang"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            2015 - 2018
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="other-lang" />
          <label
            htmlFor="other-lang"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            2019 - 2022
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="other-lang" />
          <label
            htmlFor="other-lang"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            2023 & newer
          </label>
        </div>
      </div>
    </section>
  );
}
