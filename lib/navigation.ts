import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleNavigation = (router:AppRouterInstance,path='') => {

    router.push(path); // Programmatically navigate to '/user'
};