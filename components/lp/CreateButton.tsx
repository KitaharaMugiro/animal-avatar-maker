import { createStyles, Overlay, Container, Title, Button, Text } from '@mantine/core';
import Image from 'next/image';
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

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