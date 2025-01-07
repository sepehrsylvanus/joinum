"use client"
import {NavLink} from "@/components/nav-link";
import {BookmarkIcon, CircleDollarSign} from "lucide-react";
import {useBookmark} from "@/contexts/BookmarkContext";
import {Button} from "@/components/ui/button";
import {saveBoomarkListAction, updateWalletAddressAction} from "@/server/actions";
import {toast} from "sonner";
import {useTransition} from "react";

export default function ProjectCard(){
    const { bookmarkedOrders, reset } = useBookmark();
    const [isPending, startTransition] = useTransition();

    function sendBookMarkes(){
        console.log('boomarkOrders',bookmarkedOrders)
        const orders =Array.from(bookmarkedOrders)
        startTransition(async () => {

            const result = await saveBoomarkListAction(orders);
            console.log('result',result)
            if (result) {
                toast.success('boomark saved');
            } else {
                toast.error('fail boomark saved');
            }
        });

    }
    return(<div className="flex items-center justify-between gap-4 rounded-lg bg-muted px-4 py-2">

                <h2 className="grow font-semibold text-sm">Project Name</h2>
                <Button onClick={sendBookMarkes} variant='secondary' className='px-0 m-0 h-fit w-fit'>
                    <BookmarkIcon  className="size-5"/>
                </Button>
                <div className="flex items-center gap-4 rounded-xl bg-muted p-2 text-center">
                    <CircleDollarSign className="size-5"/>
                    <span className="text-sm">$0.004</span>
                </div>
</div>);

}
