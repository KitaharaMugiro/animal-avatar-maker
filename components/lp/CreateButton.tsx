import { createStyles, Overlay, Container, Title, Button, Text } from '@mantine/core';
import Image from 'next/image';
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    hero: {
        position: 'relative',
        filter: 'brightness(150%)',
        backgroundImage:
            'url(https://res.cloudinary.com/ddeqwb08j/image/upload/v1678450906/19_1_1_oqi6kp.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    container: {
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: theme.spacing.xl * 6,
        zIndex: 1,
        position: 'relative',

        [theme.fn.smallerThan('sm')]: {
            height: 500,
            paddingBottom: theme.spacing.xl * 3,
        },
    },

    title: {
        color: theme.white,
        fontSize: 60,
        fontWeight: 900,
        lineHeight: 1.1,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
            lineHeight: 1.3,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
            fontSize: theme.fontSizes.sm,
        },
    },

    control: {
        marginTop: theme.spacing.xl * 1.5,
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },
}));

export function CreateButton() {
    return (
        <div className='w-3/5 mx-auto'>
            <div className="flex flex-col items-center">
                <Link href="/top">
                    <button className="w-full my-10 rounded-full bg-red-500 py-6 px-14 md:px-20 xl:py-6 xl:px-32 xl:text-2xl font-bold text-white hover:bg-red-700">
                        無料で作ってみる
                    </button>
                </Link>
            </div>
        </div>
    );
}