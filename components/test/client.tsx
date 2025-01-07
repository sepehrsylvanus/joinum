"use client"
import React, {useEffect} from 'react'
import { Toaster, toast } from 'sonner';


export default function Client() {
    useEffect(()=>{
        toast('hey babey')
    },[])

    return (
        <div>Client
            <Toaster />

        </div>
    )
}
