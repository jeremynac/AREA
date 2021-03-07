import React, {useState, useEffect} from 'react';




export default function Download(){
    useEffect(()=> {
        const download = () => {
        const link = document.createElement('a');
        link.href = "/apk/app-arm64-v8a-release.apk";
        link.download = "client.apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
        download()
    }, [])
    return (
        <h1> </h1>
    )
}