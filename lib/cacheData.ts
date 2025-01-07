import {cache} from 'react';
import {getUserInfos} from "@/lib/apiRoutes";

export const getCacheUserInfos = cache(async () => {
    return await getUserInfos();
});