import { createStyles, Overlay, Container, Title, Button, Text } from '@mantine/core';
import Image from 'next/image';

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
            height: 200,
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

export function AvatarHero() {
    const { classes } = useStyles();

    return (
        <div className='w-4/5 mx-auto'>
            <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container}>
                <Text className={classes.title}>アニマルアバターメーカー</Text>
            </Container>
            </div>
            
            <div className="lg:flex">
                <div className="flex-1 justify-center xl:py-10 bg-rose-50">
                    <div className='text-xl sm:text-3xl decoration-double font-bold underline decoration-2 decoration-pink text-yellow-900 my-5 py-5'>ペットとの素敵な思い出を、<br/>可愛いイラストにしませんか？</div>
                    <div className='text-sm sm:text-1xl lg:text-2xl'>
                        <div className='my-3'><br/>アニマルアバターメーカーはペットとの思い出を、AIでイラストにする新しいサービスです。</div>
                        <div className='my-3'>ペットにそっくりな可愛いイラストから、SNSで使えるアイコンまで、個性豊かなうちの子イラストを制作いたします。</div>
                        <div className='my-3'>イラスト以外にも、うちの子グッズも制作できるので、ワンちゃん、ネコちゃんへの記念日のプレゼントにもぜひご活用ください。</div>
                    </div>
                </div>
                <div className="flex-1 bg-rose-50"><img className='mx-auto p-10 rounded-full' src="https://res.cloudinary.com/ddeqwb08j/image/upload/v1676382263/example/76_1.png.png" alt="" /></div>
            </div>
        </div>
    );
}