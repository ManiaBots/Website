import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import Navigation from "./Navigation"
import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function header() {
    const [title, getTitle] = useState();

    useEffect(() => {
        const title = window.location.pathname.split("/")[1];

        getTitle(title.charAt(0).toUpperCase() + title.slice(1) as any);
    });

    return (
        <>
            <Head>
                <title>{title} • Fyre</title>
            </Head>
            <Navigation />
        </>
    )
}