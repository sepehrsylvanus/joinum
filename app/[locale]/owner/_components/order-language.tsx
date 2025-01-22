import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useOrder } from "@/hooks/use-order";
import { EarthIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const languages = [
  "en",
  "fa",
  "ar",
  "in",
  "ru",
  "de",
  "es",
  "fr",
  "it",
  "pt",
  "tr",
];

export function OrderLanguage() {
  const [order, setOrder] = useOrder();
  const [selectLang, setSelectLang] = useState(false);

  // Access form context
  const { control } = useFormContext();

  // Watch the value of "languages"
  const selectedLanguages = useWatch({
    control,
    name: "languages",
    defaultValue: [],
  });

  return (
    <>
      <section className="grid gap-4">
        <h2 className="heading text-center">
          Optional features and more filters:
        </h2>
        <p className="text-balance text-center text-muted-foreground text-xs">
          *Enabling each of them adds extra 10% to the final price and also your
          order takes more time to fill.
        </p>
        <div className="flex items-center">
          <EarthIcon className="mr-2 size-6" />
          <p className="heading text-center">
            Choose languages to filter Subscribers: (optional)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="lang"
                    checked={selectedLanguages.length === 0}
                    onCheckedChange={() => {
                      field.onChange([]);
                      setSelectLang(false);
                    }}
                  />
                  <label
                    htmlFor="lang"
                    className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Any language (recommended)
                  </label>
                </>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-lang"
              checked={selectedLanguages.length > 0}
              onCheckedChange={() => setSelectLang(true)}
            />
            <label
              htmlFor="other-lang"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select other : {selectedLanguages?.[0] || "None"}
            </label>
          </div>
        </div>
      </section>
      <Drawer open={selectLang} onOpenChange={setSelectLang}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Language</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-wrap items-center gap-2 p-4">
            {languages.map((l) => (
              <Controller
                key={l}
                name="languages"
                control={control}
                render={({ field }) => (
                  <Button
                    className={`size-12 ${
                      field.value.includes(l) ? "bg-blue-500 text-white" : ""
                    }`}
                    variant={"outline"}
                    onClick={() => {
                      field.onChange([l]); // Set only the clicked language in the array
                      setSelectLang(false); // Close the drawer after selection
                    }}
                  >
                    {l.toUpperCase()}
                  </Button>
                )}
              />
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
