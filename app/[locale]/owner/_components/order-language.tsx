import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useOrder } from '@/hooks/use-order';
import { EarthIcon } from 'lucide-react';
import { useState } from 'react';

const languages = [
  'en',
  'fa',
  'ar',
  'in',
  'ru',
  'de',
  'es',
  'fr',
  'it',
  'pt',
  'tr',
];

export function OrderLanguage() {
  const [order, setOrder] = useOrder();
  const [selectLang, setSelectLang] = useState(false);
  const onSelectLang = (lang: string) => {
    setOrder({ ...order, options: { ...order.options, languages: lang } });
    setSelectLang(false);
  };
  return (
    <>
      <section className="grid gap-4">
        <h2 className="heading text-center">
          Optional features and more filters:
        </h2>
        <p className="text-balance text-center text-muted-foreground text-xs">
          *Enabling each of them add extra 10% to final price and also your
          order takes more time to fill
        </p>
        <div className="flex items-center">
          <EarthIcon className="mr-2 size-6" />
          <p className="heading text-center">
            Choose languages to filter Subscribers: (optional)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="lang" checked={!order.options.languages.length} onCheckedChange={e => setOrder({ ...order, options: { ...order.options, languages: '' } })} />
            <label
              htmlFor="lang"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Any language (recommended)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-lang"
              checked={Boolean(order.options.languages.length)}
              onCheckedChange={(e) => setSelectLang(true)}
            />
            <label
              htmlFor="other-lang"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select other : {order.options.languages}
            </label>
          </div>
        </div>
      </section>
      <Drawer open={selectLang} onOpenChange={setSelectLang}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Language</DrawerTitle>
          </DrawerHeader>
          <div className='flex flex-wrap items-center gap-2 p-4'>
            {languages.map((l) => (
              <Button key={l} className='size-12' variant={'outline'} onClick={() => onSelectLang(l)}>
                {l.toUpperCase()}
              </Button>
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
